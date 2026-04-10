#!/usr/bin/env python3
"""主题索引双向链接：正文实体链接 + 核心出处年份链接"""

import re
import os
from pathlib import Path

# === 映射表 ===

PEOPLE_MAP = {
    '沃伦·巴菲特': '沃伦·巴菲特',
    '巴菲特': '沃伦·巴菲特',
    '查理·芒格': '查理·芒格',
    '芒格': '查理·芒格',
    '阿吉特·贾恩': '阿吉特·贾恩',
    'Ajit Jain': '阿吉特·贾恩',
    'B夫人': 'B夫人',
    'Mrs. B': 'B夫人',
    'Rose Blumkin': 'B夫人',
    '卢·辛普森': '卢·辛普森',
    'Lou Simpson': '卢·辛普森',
    '斯坦·利普西': '斯坦·利普西',
    'Stan Lipsey': '斯坦·利普西',
    '凯瑟琳·格雷厄姆': '凯瑟琳·格雷厄姆',
    'Kay Graham': '凯瑟琳·格雷厄姆',
    '本·格雷厄姆': '本·格雷厄姆',
    'Ben Graham': '本·格雷厄姆',
    '格雷厄姆': '本·格雷厄姆',
    '菲利普·费雪': '菲利普·费雪',
    'Phil Fisher': '菲利普·费雪',
    '费雪': '菲利普·费雪',
    '杰克·伯恩': '杰克·伯恩',
    'Jack Byrne': '杰克·伯恩',
    '菲尔·利切': '菲尔·利切',
    'Phil Liechti': '菲尔·利切',
    'Tom Murphy': 'Tom_Murphy',
    'Murphy': 'Tom_Murphy',
}

COMPANY_MAP = {
    '伯克希尔': '伯克希尔哈撒韦',
    '伯克希尔哈撒韦': '伯克希尔哈撒韦',
    'Berkshire': '伯克希尔哈撒韦',
    'BRK': '伯克希尔哈撒韦',
    'GEICO': 'GEICO',
    '盖可': 'GEICO',
    '盖可保险': 'GEICO',
    '可口可乐': '可口可乐',
    'Coca-Cola': '可口可乐',
    'Coke': '可口可乐',
    '可乐': '可口可乐',
    '华盛顿邮报': '华盛顿邮报',
    'Washington Post': '华盛顿邮报',
    '喜诗糖果': '喜诗糖果',
    "See's": '喜诗糖果',
    "See's Candies": '喜诗糖果',
    '内布拉斯加家具城': '内布拉斯加家具城',
    'NFM': '内布拉斯加家具城',
    'Nebraska Furniture Mart': '内布拉斯加家具城',
    '水牛城新闻': '水牛城新闻',
    'Buffalo News': '水牛城新闻',
    '吉列': '吉列',
    'Gillette': '吉列',
    '美国运通': '美国运通',
    'American Express': '美国运通',
    'Amex': '美国运通',
    '富国银行': '富国银行',
    'Wells Fargo': '富国银行',
    'BNSF': 'BNSF铁路',
    'BNSF铁路': 'BNSF铁路',
    'Burlington Northern': 'BNSF铁路',
    '中美能源': '中美能源',
    'MidAmerican': '中美能源',
    'MidAmerican Energy': '中美能源',
    '国家赔偿': '国家赔偿公司',
    '国家赔偿公司': '国家赔偿公司',
    'NICO': '国家赔偿公司',
    'National Indemnity': '国家赔偿公司',
    '苹果': '苹果公司',
    'Apple': '苹果公司',
    'IBM': 'IBM',
    '亨氏': '亨氏',
    'Heinz': '亨氏',
    'H.J. Heinz': '亨氏',
    '卡夫亨氏': '亨氏',
    '穆迪': '穆迪',
    "Moody's": '穆迪',
    'Moody': '穆迪',
    '房地美': '房地美',
    'Freddie Mac': '房地美',
    '大都会': '大都会',
    'MetLife': '大都会',
    'Capital Cities': '首都城市ABC',
    'ABC': '首都城市ABC',
    '首都城市': '首都城市ABC',
    '所罗门兄弟': '所罗门兄弟',
    'Salomon': '所罗门兄弟',
    'Salomon Brothers': '所罗门兄弟',
    '蓝筹印花': '蓝筹印花',
    'Blue Chip Stamps': '蓝筹印花',
    'Scott Fetzer': 'Scott_Fetzer',
    'Scott & Fetzer': 'Scott_Fetzer',
    'Fetzer': 'Scott_Fetzer',
    '飞安国际': '飞安国际',
    'FlightSafety': '飞安国际',
    'Marmon': 'Marmon集团',
    'Marmon集团': 'Marmon集团',
    'McLane': 'McLanes麦克莱恩',
    'McLanes': 'McLanes麦克莱恩',
    '西方石油': '西方石油',
    'OXY': '西方石油',
    'Occidental': '西方石油',
    '雪佛龙': '雪佛龙',
    'Chevron': '雪佛龙',
    '美国银行': '美国银行',
    'Bank of America': '美国银行',
    '比亚迪': '比亚迪',
    'BYD': '比亚迪',
    '宝洁': '宝洁',
    'P&G': '宝洁',
    'Procter & Gamble': '宝洁',
    '强生': '强生',
    'Johnson & Johnson': '强生',
}

# 按长度排序（长的先替换，避免"可口可乐"被"可乐"误匹配）
ALL_ENTITIES = sorted(
    list(PEOPLE_MAP.keys()) + list(COMPANY_MAP.keys()),
    key=len,
    reverse=True
)

def split_frontmatter(content):
    """正确分离 frontmatter 和正文"""
    # frontmatter 格式：---\n...内容...\n---\n正文
    if not content.startswith('---'):
        return '', content
    
    # 找第二个 --- 的位置（结束 frontmatter）
    # 注意：frontmatter 结束标记是单独一行的 ---
    lines = content.split('\n')
    first_dash = 0
    second_dash = None
    
    for i, line in enumerate(lines):
        if i > 0 and line.strip() == '---':
            second_dash = i
            break
    
    if second_dash is None:
        return '', content
    
    frontmatter = '\n'.join(lines[:second_dash+1]) + '\n'
    body = '\n'.join(lines[second_dash+1:])
    
    return frontmatter, body

def link_entities_in_text(text):
    """在正文中替换实体名为 wiki-link（支持中文）"""
    count = 0
    for name in ALL_ENTITIES:
        # 避免已链接的实体重复处理
        if f'[[{name}]]' in text:
            continue
        # 对中英文分别处理
        # 英文用 \b 边界，中文不需要边界（中文无空格分隔）
        if re.search(r'[a-zA-Z]', name):
            # 英文名
            pattern = re.compile(rf'(?<!\[\[)\b{re.escape(name)}\b(?!\]\])')
        else:
            # 中文名（不用 \b）
            pattern = re.compile(rf'(?<!\[\[){re.escape(name)}(?!\]\])')
        
        if pattern.search(text):
            text = pattern.sub(f'[[{name}]]', text)
            count += 1
    return text, count

def link_years_in_table(text):
    """核心出处表格中的年份链接到信件"""
    # 匹配 | **1993年** | 或 | 1993年 | 格式
    pattern = re.compile(r'\|\s*\*{0,2}(\d{4})年\*{0,2}\s*\|')
    
    def replace_year(match):
        year = match.group(1)
        # 链接到对应年份的核心总结（完整路径）
        return f'| **[[/01_letters/{year}年/核心总结|{year}年]]** |'
    
    text = pattern.sub(replace_year, text)
    return text

def process_concept_file(filepath):
    """处理单个主题文件"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 正确分离 frontmatter
    frontmatter, body = split_frontmatter(content)
    
    # 处理正文实体
    body, entity_count = link_entities_in_text(body)
    
    # 处理核心出处表格年份
    body = link_years_in_table(body)
    
    # 写回
    new_content = frontmatter + body
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return entity_count

def main():
    concepts_dir = Path('/Users/carl/Documents/buffett-knowledge-base/docs/02_concepts')
    
    total_entities = 0
    files_processed = 0
    
    for md_file in concepts_dir.glob('*.md'):
        if md_file.name == 'index.md':
            continue
        
        count = process_concept_file(md_file)
        total_entities += count
        files_processed += 1
        print(f'{md_file.name}: {count} 实体链接')
    
    print(f'\n总计：{files_processed} 个主题，{total_entities} 处实体链接')

if __name__ == '__main__':
    main()