#!/usr/bin/env python3
"""
Build bidirectional links between letters (人物) and 人物传记 pages.
- Update wiki-link plugin to handle [[人名]] → /04_people/xxx
- Scan all 翻译.md files to build person→years mapping
- Inject [[人名]] links into letters
- Add "相关信件" section to person pages
"""

import os
import re
from pathlib import Path

BASE = Path("/Users/carl/Documents/buffett-knowledge-base/docs")
PEOPLE_DIR = BASE / "04_people"
LETTERS_DIR = BASE / "01_letters"
CONFIG_FILE = BASE / ".vitepress" / "config.mts"

# ============================================================
# Step 1: Build person name → (slug, years) mapping
# ============================================================

# All known people with their file slugs
# Format: canonical_display_name -> slug (for /04_people/{slug}.md)
PEOPLE_MAP = {
    # 伯克希尔核心管理层
    "沃伦·巴菲特":     "沃伦·巴菲特",
    "巴菲特":          "沃伦·巴菲特",
    "Warren Buffett":  "沃伦·巴菲特",
    "Charlie Munger":   "查理·芒格",
    "Munger":          "查理·芒格",
    "芒格":            "查理·芒格",
    "阿吉特·贾恩":     "阿吉特·贾恩",
    "Ajit Jain":       "阿吉特·贾恩",
    "Ajit":            "阿吉特·贾恩",
    "贾恩":            "阿吉特·贾恩",
    "B夫人":           "B夫人",
    "Mrs. B":          "B夫人",
    "Rose Blumkin":    "B夫人",
    "Blumkin":         "B夫人",
    "布鲁姆金":         "B夫人",
    "B夫人的儿子":      "B夫人",
    "Louie Blumkin":   "B夫人",
    "卢·辛普森":        "卢·辛普森",
    "Lou Simpson":      "卢·辛普森",
    "Simpson":         "卢·辛普森",
    "辛普森":           "卢·辛普森",
    "斯坦·利普西":      "斯坦·利普西",
    "Stan Lipsey":     "斯坦·利普西",
    "利普西":           "斯坦·利普西",
    "皮特·利格尔":      "皮特·利格尔",
    "Pete Liegl":      "皮特·利格尔",
    "利格尔":            "皮特·利格尔",
    "弗兰克·普塔克":    "弗兰克·普塔克",
    "Frank Puttkammer":"弗兰克·普塔克",
    "普塔克":            "弗兰克·普塔克",
    "菲尔·利切":        "菲尔·利切",
    "Phil Liechti":    "菲尔·利切",
    "Jack Byrne":      "杰克·伯恩",
    "杰克·伯恩":        "杰克·伯恩",
    "伯恩":              "杰克·伯恩",
    "Byrne":             "杰克·伯恩",
    "Chuck Huggins":   "Chuck_Huggins",
    "Huggins":          "Chuck_Huggins",
    "格雷迪·罗西尔":     "格雷迪·罗西尔",
    "Grady Rosier":    "格雷迪·罗西尔",
    "Rosier":           "格雷迪·罗西尔",
    "凯文·克莱顿":       "凯文·克莱顿",
    "Kevin Clayton":   "凯文·克莱顿",
    "Clayton":           "凯文·克莱顿",
    "Tom Murphy":      "Tom_Murphy",
    "墨菲":              "Tom_Murphy",
    "Murphy":             "Tom_Murphy",
    "埃坦·韦特海默":     "埃坦·韦特海默",
    "Eitan Werb":      "埃坦·韦特海默",
    "韦特海默":           "埃坦·韦特海默",
    "Jacob Harpaz":    "雅各布·哈帕兹",
    "雅各布·哈帕兹":     "雅各布·哈帕兹",
    "哈帕兹":             "雅各布·哈帕兹",
    "吉恩·阿贝格":       "吉恩·阿贝格",
    "Gene Abegg":      "吉恩·阿贝格",
    "阿贝格":              "吉恩·阿贝格",
    # 投资大师
    "本·格雷厄姆":       "本·格雷厄姆",
    "Ben Graham":      "本·格雷厄姆",
    "Graham":           "本·格雷厄姆",
    "格雷厄姆":           "本·格雷厄姆",
    "费雪":              "菲利普·费雪",
    "Phil Fisher":      "菲利普·费雪",
    "Fisher":            "菲利普·费雪",
    "菲利普·费雪":        "菲利普·费雪",
    # 被投公司CEO
    "凯瑟琳·格雷厄姆":   "凯瑟琳·格雷厄姆",
    "Kay Graham":       "凯瑟琳·格雷厄姆",
    "Graham":            "凯瑟琳·格雷厄姆",
    "保罗·纽曼":          "保罗·纽曼",
    "Paul Newman":      "保罗·纽曼",
    "纽曼":               "保罗·纽曼",
    "Don Murph":        "唐·墨菲",
    "Don Murphey":      "唐·墨菲",
    "唐·墨菲":            "唐·墨菲",
    "Harry Bottle":     "哈里·博托",
    "Harry Bottle":     "哈里·博托",
    "博托":               "哈里·博托",
    "Larry Tisch":      "拉里·蒂什",
    "Saul Silver":      "索尔·西尔弗",
    "John-Lo":          "John-Lo",
}

# Reverse map: slug -> list of aliases (for searching)
SLUG_TO_ALIASES = {}
for aliases, slug in PEOPLE_MAP.items():
    if slug not in SLUG_TO_ALIASES:
        SLUG_TO_ALIASES[slug] = []
    SLUG_TO_ALIASES[slug].append(aliases)


def slug_for(name: str) -> str:
    """Return the people page slug for a given name."""
    # Try exact match first
    if name in PEOPLE_MAP:
        return PEOPLE_MAP[name]
    # Try case-insensitive
    for k, v in PEOPLE_MAP.items():
        if k.lower() == name.lower():
            return v
    return None


def people_link(name: str) -> str:
    """Return a [[wiki-link]] for a person name."""
    slug = slug_for(name)
    if slug:
        return f"[[{slug}]]"
    return None


# ============================================================
# Step 2: Scan all letters and build person → years mapping
# ============================================================

person_years = {}  # slug -> set of year strings like "1983年"

letter_files = sorted(LETTERS_DIR.glob("*/翻译.md"))
for lf in letter_files:
    year = lf.parent.name  # e.g. "1983年"
    content = lf.read_text(encoding="utf-8")
    
    for alias, slug in PEOPLE_MAP.items():
        if len(alias) < 2:
            continue
        # Use word boundary matching
        pattern = re.compile(rf'\b{re.escape(alias)}\b', re.IGNORECASE)
        if pattern.search(content):
            if slug not in person_years:
                person_years[slug] = set()
            person_years[slug].add(year)

print("=== Person → Years Mapping ===")
for slug, years in sorted(person_years.items()):
    print(f"  {slug}: {', '.join(sorted(years))}")


# ============================================================
# Step 3: Inject links into letters
# ============================================================

def inject_links_into_letter(lf: Path) -> int:
    """Replace person names in a letter with [[wiki-links]].
    Returns count of replacements made."""
    year = lf.parent.name
    content = lf.read_text(encoding="utf-8")
    original = content
    
    # Sort aliases by length descending to replace longer matches first
    # (avoids replacing "Munger" before "Charlie Munger")
    sorted_aliases = sorted(PEOPLE_MAP.keys(), key=len, reverse=True)
    
    replacements = 0
    for alias in sorted_aliases:
        if len(alias) < 2:
            continue
        slug = PEOPLE_MAP[alias]
        link = f"[[{slug}]]"
        # Replace only if not already a link
        # Look for the alias NOT already inside [[...]]
        pattern = re.compile(rf'(?<!\[\[){re.escape(alias)}(?!\]\])', re.IGNORECASE)
        new_content, n = pattern.subn(link, content)
        if n > 0:
            content = new_content
            replacements += n
    
    if content != original:
        lf.write_text(content, encoding="utf-8")
    return replacements


total_replaced = 0
for lf in letter_files:
    n = inject_links_into_letter(lf)
    if n > 0:
        year = lf.parent.name
        print(f"  {year}: {n}处链接注入")
        total_replaced += n

print(f"\n信件链接注入完成，共 {total_replaced} 处")


# ============================================================
# Step 4: Add "相关信件" section to person pages
# ============================================================

def add_related_letters_to_person(person_file: Path, slug: str) -> bool:
    """Add a '相关信件' section to a person page.
    Returns True if modified."""
    if slug not in person_years:
        return False
    
    years = sorted(person_years[slug], key=lambda y: int(y.replace("年", "")))
    if not years:
        return False
    
    content = person_file.read_text(encoding="utf-8")
    original = content
    
    # Build the new section
    links = []
    for yr in years:
        links.append(f"- [{yr}](../01_letters/{yr}/翻译)")
    
    section = f"""## 相关信件

{chr(10).join(links)}

"""
    
    # Check if section already exists
    if "## 相关信件" in content:
        return False
    
    # Add before the last "---" footer if it exists, otherwise at end
    if content.rstrip().endswith("---"):
        content = content.rstrip()[:-3].rstrip() + "\n\n" + section + "---\n"
    else:
        content = content.rstrip() + "\n\n" + section
    
    if content != original:
        person_file.write_text(content, encoding="utf-8")
        return True
    return False


modified_people = []
for person_file in PEOPLE_DIR.glob("*.md"):
    slug = person_file.stem  # e.g. "查理·芒格"
    if add_related_letters_to_person(person_file, slug):
        modified_people.append(slug)

# Also check subdirectories
for subdir in (PEOPLE_DIR / "子公司CEO").glob("*.md"):
    slug = subdir.stem
    if add_related_letters_to_person(subdir, slug):
        modified_people.append(slug)

print(f"\n人物页更新完成，共 {len(modified_people)} 页：")
for p in modified_people:
    years = sorted(person_years.get(p, set()), key=lambda y: int(y.replace("年", "")))
    print(f"  {p}: {', '.join(years)}")

print("\n✅ 全部完成！")
