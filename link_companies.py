#!/usr/bin/env python3
"""
公司双向链接构建脚本：
1. 扫描全部信件，识别公司名 → 建立 company→years 映射
2. 将信件中公司名替换为 [[公司名]] wiki-link
3. 为公司页添加"相关信件"章节
4. 更新 config.mts 的 wiki-link 插件（支持公司名映射）
"""

import os
import re
from pathlib import Path

BASE = Path("/Users/carl/Documents/buffett-knowledge-base/docs")
COMPANY_DIR = BASE / "03_companies"
LETTERS_DIR = BASE / "01_letters"
CONFIG_FILE = BASE / ".vitepress" / "config.mts"

# ============================================================
# 公司名别名 → 公司页 slug 映射
# 规则：下划线文件名保留下划线，中文文件名保留中文
# 文件路径映射
# ============================================================

# 公司档案文件 → URL slug（就是去掉 .md 后的文件名）
COMPANY_FILES = {}
for f in COMPANY_DIR.glob("*.md"):
    if f.name == "index.md":
        continue
    COMPANY_FILES[f.stem] = f  # stem = 不带 .md 的文件名

# 特殊：子公司子目录也有 GEICO
geico_sub = COMPANY_DIR / "伯克希尔子公司" / "GEICO.md"
if geico_sub.exists():
    COMPANY_FILES["伯克希尔子公司/GEICO"] = geico_sub

# 公司名别名 → slug 映射（多种写法 → 同一个公司页）
COMPANY_MAP = {
    # ---- 伯克希尔本体 ----
    "伯克希尔":        "伯克希尔哈撒韦",
    "伯克希尔哈撒韦":  "伯克希尔哈撒韦",
    "Berkshire":      "伯克希尔哈撒韦",
    "BRK":            "伯克希尔哈撒韦",
    "哈撒韦":         "伯克希尔哈撒韦",

    # ---- GEICO ----
    "GEICO":          "GEICO",
    "盖可":           "GEICO",
    "盖可保险":       "GEICO",
    "政府雇员保险":   "GEICO",
    "GEICO保险":      "GEICO",

    # ---- 喜诗糖果 ----
    "喜诗糖果":       "喜诗糖果",
    "See's":          "喜诗糖果",
    "See's Candies":  "喜诗糖果",
    "喜诗":           "喜诗糖果",

    # ---- 内布拉斯加家具城 ----
    "内布拉斯加家具城": "内布拉斯加家具城",
    "NFM":            "内布拉斯加家具城",
    "Nebraska Furniture Mart": "内布拉斯加家具城",
    "家具城":         "内布拉斯加家具城",

    # ---- 水牛城新闻 ----
    "水牛城新闻":     "水牛城新闻",
    "Buffalo News":   "水牛城新闻",
    "布法罗新闻":     "水牛城新闻",
    "水牛城":         "水牛城新闻",

    # ---- 华盛顿邮报 ----
    "华盛顿邮报":     "华盛顿邮报",
    "Washington Post": "华盛顿邮报",
    "《华盛顿邮报》":  "华盛顿邮报",
    "华盛顿邮报公司":  "华盛顿邮报",

    # ---- BNSF铁路 ----
    "BNSF":           "BNSF铁路",
    "BNSF铁路":       "BNSF铁路",
    "Burlington Northern": "BNSF铁路",
    "北方铁路":       "BNSF铁路",
    "BNSF":           "BNSF铁路",

    # ---- 国家赔偿公司 ----
    "国家赔偿公司":   "国家赔偿公司",
    "National Indemnity": "国家赔偿公司",
    "国家赔偿":       "国家赔偿公司",
    "NICO":           "国家赔偿公司",

    # ---- 苹果公司 ----
    "苹果":           "苹果公司",
    "苹果公司":       "苹果公司",
    "Apple":          "苹果公司",

    # ---- 美国银行 ----
    "美国银行":       "美国银行",
    "Bank of America": "美国银行",
    "美银":            "美国银行",

    # ---- 可口可乐 ----
    "可口可乐":       "可口可乐",
    "Coca-Cola":       "可口可乐",
    "可乐":            "可口可乐",
    "Coke":           "可口可乐",

    # ---- 吉列 ----
    "吉列":           "吉列",
    "Gillette":       "吉列",
    "吉列公司":       "吉列",

    # ---- 美国运通 ----
    "美国运通":       "美国运通",
    "American Express": "美国运通",
    "运通":            "美国运通",
    "Amex":           "美国运通",

    # ---- 富国银行 ----
    "富国银行":       "富国银行",
    "Wells Fargo":    "富国银行",

    # ---- 宝洁 ----
    "宝洁":           "宝洁",
    "P&G":            "宝洁",
    "Procter & Gamble": "宝洁",
    "Procter Gamble": "宝洁",

    # ---- 强生 ----
    "强生":           "强生",
    "Johnson & Johnson": "强生",
    "Johnson Johnson": "强生",

    # ---- 比亚迪 ----
    "比亚迪":         "比亚迪",
    "BYD":            "比亚迪",

    # ---- 雪佛龙 ----
    "雪佛龙":         "雪佛龙",
    "Chevron":        "雪佛龙",

    # ---- 西方石油 ----
    "西方石油":       "西方石油",
    "Occidental":     "西方石油",
    "OXY":            "西方石油",

    # ---- 穆迪 ----
    "穆迪":           "穆迪",
    "Moody's":        "穆迪",
    "Moody":          "穆迪",

    # ---- 大都会 ----
    "大都会":         "大都会",
    "Metropolitan":   "大都会",
    "MetLife":        "大都会",

    # ---- 联邦住宅贷款抵押公司 ----
    "Freddie Mac":    "房地美",
    "房地美":         "房地美",
    "房利美":         "房地美",
    "Fannie Mae":     "房地美",

    # ---- 所罗门兄弟 ----
    "所罗门":         "所罗门兄弟",
    "所罗门兄弟":     "所罗门兄弟",
    "Salomon":        "所罗门兄弟",
    "Salomon Brothers": "所罗门兄弟",

    # ---- 首都城市ABC ----
    "首都城市":       "首都城市ABC",
    "Capital Cities": "首都城市ABC",
    "Capital Cities/ABC": "首都城市ABC",
    "ABC":            "首都城市ABC",
    "ABC广播":        "首都城市ABC",

    # ---- 飞安国际 ----
    "飞安国际":       "飞安国际",
    "FlightSafety":   "飞安国际",
    "飞安":           "飞安国际",

    # ---- 克莱顿家园 ----
    "克莱顿":         "克莱顿家园",
    "克莱顿家园":     "克莱顿家园",
    "Clayton":        "克莱顿家园",
    "Clayton Homes":  "克莱顿家园",

    # ---- 中美能源 ----
    "中美能源":       "中美能源",
    "MidAmerican":    "中美能源",
    "MidAmerican Energy": "中美能源",
    "伯克希尔能源":   "中美能源",

    # ---- Marmon集团 ----
    "Marmon":        "Marmon集团",
    "Marmon集团":     "Marmon集团",

    # ---- ISCAR ----
    "ISCAR":          "ISCAR-IMC",
    "IMC":            "ISCAR-IMC",
    "ISCAR-IMC":      "ISCAR-IMC",

    # ---- 麦克莱恩 ----
    "麦克莱恩":       "McLanes麦克莱恩",
    "McLane":         "McLanes麦克莱恩",
    "McLanes":        "McLanes麦克莱恩",

    # ---- Scott Fetzer ----
    "Scott Fetzer":   "Scott_Fetzer",
    "Scott & Fetzer": "Scott_Fetzer",
    "Fetzer":         "Scott_Fetzer",

    # ---- 蓝筹印花 ----
    "蓝筹印花":       "蓝筹印花",
    "Blue Chip Stamps": "蓝筹印花",
    "蓝筹":            "蓝筹印花",

    # ---- Fechheimer ----
    "Fechheimer":     "Fechheimer_Bros",
    "Fechheimer Bros": "Fechheimer_Bros",

    # ---- IBM ----
    "IBM":            "IBM",
    "国际商业机器":    "IBM",

    # ---- 亨氏 ----
    "亨氏":           "亨氏",
    "Heinz":          "亨氏",
    "H.J. Heinz":    "亨氏",
    "卡夫亨氏":       "亨氏",
}

# 排除列表：非公司名的误匹配
EXCLUDE_PATTERNS = {
    "可口",   # 不是"可口可乐"时单独无意义
    "乐",     # 太短太泛
    "吉列州", # 不是吉列
}

# ============================================================
# Step 1: Scan all letters → company → years
# ============================================================

company_years = {}  # slug → set of year strings

letter_files = sorted(LETTERS_DIR.glob("*/翻译.md"))
for lf in letter_files:
    year = lf.parent.name
    content = lf.read_text(encoding="utf-8")
    
    # 收集本信中找到的公司 slug（去重）
    found_slugs_this_letter = set()
    
    for alias, slug in COMPANY_MAP.items():
        if len(alias) < 2:
            continue
        # 排除过于宽泛的别名
        if alias in EXCLUDE_PATTERNS:
            continue
        # 词边界匹配
        try:
            pattern = re.compile(rf'\b{re.escape(alias)}\b', re.IGNORECASE)
        except re.error:
            continue
        if pattern.search(content):
            found_slugs_this_letter.add(slug)
    
    for slug in found_slugs_this_letter:
        if slug not in company_years:
            company_years[slug] = set()
        company_years[slug].add(year)

print("=== 公司 → 年份 映射 ===")
for slug, years in sorted(company_years.items(), key=lambda x: int(x[0][0]) if x[0][0].isdigit() else 999):
    print(f"  {slug}: {', '.join(sorted(years, key=lambda y: int(y.replace('年',''))))}")

print(f"\n共找到 {len(company_years)} 家公司，出现在信件中")

# ============================================================
# Step 2: Inject [[公司名]] links into letters
# ============================================================

def inject_company_links(lf: Path) -> int:
    """Replace company names with [[wiki-links]] in a letter.
    Returns count of replacements."""
    content = lf.read_text(encoding="utf-8")
    original = content
    
    # 按别名长度降序排列（先匹配长名如"可口可乐"再匹配"可乐"）
    sorted_aliases = sorted(COMPANY_MAP.keys(), key=len, reverse=True)
    
    replacements = 0
    for alias in sorted_aliases:
        if len(alias) < 2:
            continue
        if alias in EXCLUDE_PATTERNS:
            continue
        slug = COMPANY_MAP[alias]
        link = f"[[{slug}]]"
        try:
            pattern = re.compile(rf'(?<!\[\[){re.escape(alias)}(?!\]\])', re.IGNORECASE)
            new_content, n = pattern.subn(link, content)
            if n > 0:
                content = new_content
                replacements += n
        except re.error:
            continue
    
    if content != original:
        lf.write_text(content, encoding="utf-8")
    return replacements


total = 0
for lf in letter_files:
    n = inject_company_links(lf)
    if n > 0:
        print(f"  {lf.parent.name}: {n}处")
        total += n

print(f"\n信件链接注入完成，共 {total} 处")

# ============================================================
# Step 3: Add "相关信件" to company pages
# ============================================================

def add_related_to_company(company_file: Path, slug: str) -> bool:
    """Add a '相关信件' section to a company page."""
    if slug not in company_years:
        return False
    years = sorted(company_years[slug], key=lambda y: int(y.replace("年", "")))
    if not years:
        return False
    
    content = company_file.read_text(encoding="utf-8")
    original = content
    
    if "## 相关信件" in content:
        return False
    
    links = []
    for yr in years:
        links.append(f"- [{yr}](../01_letters/{yr}/翻译)")
    
    section = f"""## 相关信件

{chr(10).join(links)}

"""
    
    if content.rstrip().endswith("---"):
        content = content.rstrip()[:-3].rstrip() + "\n\n" + section + "---\n"
    else:
        content = content.rstrip() + "\n\n" + section
    
    if content != original:
        company_file.write_text(content, encoding="utf-8")
        return True
    return False


modified = []
# 扫描根目录
for f in COMPANY_DIR.glob("*.md"):
    if f.name == "index.md":
        continue
    slug = f.stem
    if add_related_to_company(f, slug):
        modified.append(slug)

# 扫描子目录
subdir = COMPANY_DIR / "伯克希尔子公司"
if subdir.exists():
    for f in subdir.glob("*.md"):
        slug = "伯克希尔子公司/" + f.stem
        if add_related_to_company(f, slug):
            modified.append(slug)

print(f"\n公司页更新完成，共 {len(modified)} 页：")
for slug in modified:
    years = sorted(company_years.get(slug, set()), key=lambda y: int(y.replace("年", "")))
    print(f"  {slug}: {', '.join(years)}")

# ============================================================
# Step 4: Update config.mts COMPANY_MAP section
# ============================================================

# Build config section text
config_lines = [
    "// 公司名别名 → 公司页 slug 映射（wiki-link 直接跳转）",
    "const COMPANY_MAP: Record<string, string> = {",
]
for alias, slug in sorted(COMPANY_MAP.items(), key=lambda x: x[0]):
    config_lines.append(f"  '{alias}': '{slug}',")
config_lines.append("}")
config_lines.append("")

new_config_block = "\n".join(config_lines)

config_content = CONFIG_FILE.read_text(encoding="utf-8")

# Find and replace the COMPANY_MAP section in config.mts
# It starts with "// 公司名别名" and ends with the closing "}"
start_marker = "// 公司名别名 → 公司页 slug 映射（wiki-link 直接跳转）"
end_marker = "}\n\n// 自定义 wiki-links 插件"

start_idx = config_content.find(start_marker)
if start_idx == -1:
    start_idx = config_content.find("// COMPANY_MAP:")
end_idx = config_content.find(end_marker, start_idx if start_idx != -1 else 0)

if start_idx != -1 and end_idx != -1:
    config_content = config_content[:start_idx] + new_config_block + config_content[end_idx:]
    CONFIG_FILE.write_text(config_content, encoding="utf-8")
    print(f"\nconfig.mts 已更新")
else:
    # Insert before wiki-links plugin
    plugin_start = "// 自定义 wiki-links 插件"
    idx = config_content.find(plugin_start)
    if idx != -1:
        config_content = config_content[:idx] + new_config_block + config_content[idx:]
        CONFIG_FILE.write_text(config_content, encoding="utf-8")
        print(f"\nconfig.mts COMPANY_MAP 已插入（找不到旧区块）")
    else:
        print(f"\n⚠️ config.mts 未找到 COMPANY_MAP 插入点，请手动检查")

print("\n✅ 全部完成！")
