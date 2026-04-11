import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// 人物名 → 人物页 slug 映射
const PEOPLE_MAP: Record<string, string> = {
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
  '皮特·利格尔': '皮特·利格尔',
  'Pete Liegl': '皮特·利格尔',
  '弗兰克·普塔克': '弗兰克·普塔克',
  'Frank Puttkammer': '弗兰克·普塔克',
  '菲尔·利切': '菲尔·利切',
  'Phil Liechti': '菲尔·利切',
  '杰克·伯恩': '杰克·伯恩',
  'Jack Byrne': '杰克·伯恩',
  'Chuck Huggins': 'Chuck_Huggins',
  '格雷迪·罗西尔': '格雷迪·罗西尔',
  'Grady Rosier': '格雷迪·罗西尔',
  '凯文·克莱顿': '凯文·克莱顿',
  'Kevin Clayton': '凯文·克莱顿',
  'Tom Murphy': 'Tom_Murphy',
  '埃坦·韦特海默': '埃坦·韦特海默',
  'Eitan Werb': '埃坦·韦特海默',
  '雅各布·哈帕兹': '雅各布·哈帕兹',
  'Jacob Harpaz': '雅各布·哈帕兹',
  '吉恩·阿贝格': '吉恩·阿贝格',
  'Gene Abegg': '吉恩·阿贝格',
  '本·格雷厄姆': '本·格雷厄姆',
  'Ben Graham': '本·格雷厄姆',
  '格雷厄姆': '本·格雷厄姆',
  '菲利普·费雪': '菲利普·费雪',
  'Phil Fisher': '菲利普·费雪',
  '费雪': '菲利普·费雪',
  '凯瑟琳·格雷厄姆': '凯瑟琳·格雷厄姆',
  'Kay Graham': '凯瑟琳·格雷厄姆',
  '保罗·纽曼': '保罗·纽曼',
  'Paul Newman': '保罗·纽曼',
  'John-Lo': 'John-Lo',
}

// 公司名别名映射
const COMPANY_MAP: Record<string, string> = {
  'ABC': '首都城市ABC',
  'American Express': '美国运通',
  'Amex': '美国运通',
  'Apple': '苹果公司',
  'BNSF': 'BNSF铁路',
  'BNSF铁路': 'BNSF铁路',
  'BRK': '伯克希尔哈撒韦',
  'BYD': '比亚迪',
  'Bank of America': '美国银行',
  'Berkshire': '伯克希尔哈撒韦',
  'Blue Chip Stamps': '蓝筹印花',
  'Buffalo News': '水牛城新闻',
  'Capital Cities': '首都城市ABC',
  'Capital Cities/ABC': '首都城市ABC',
  'Chevron': '雪佛龙',
  'Clayton': '克莱顿家园',
  'Clayton Homes': '克莱顿家园',
  'Coca-Cola': '可口可乐',
  'Coke': '可口可乐',
  'Fannie Mae': '房地美',
  'Fechheimer': 'Fechheimer_Bros',
  'Fechheimer Bros': 'Fechheimer_Bros',
  'Fetzer': 'Scott_Fetzer',
  'FlightSafety': '飞安国际',
  'Freddie Mac': '房地美',
  'GEICO': 'GEICO',
  'GEICO保险': 'GEICO',
  'Gillette': '吉列',
  'H.J. Heinz': '亨氏',
  'Heinz': '亨氏',
  'IBM': 'IBM',
  'IMC': 'ISCAR-IMC',
  'ISCAR': 'ISCAR-IMC',
  'ISCAR-IMC': 'ISCAR-IMC',
  'Johnson & Johnson': '强生',
  'Marmon': 'Marmon集团',
  'Marmon集团': 'Marmon集团',
  'McLane': 'McLanes麦克莱恩',
  'MetLife': '大都会',
  'MidAmerican': '中美能源',
  'MidAmerican Energy': '中美能源',
  'Moody': '穆迪',
  "Moody's": '穆迪',
  'NFM': '内布拉斯加家具城',
  'NICO': '国家赔偿公司',
  'National Indemnity': '国家赔偿公司',
  'Nebraska Furniture Mart': '内布拉斯加家具城',
  'OXY': '西方石油',
  'Occidental': '西方石油',
  'P&G': '宝洁',
  'Procter & Gamble': '宝洁',
  'Salomon': '所罗门兄弟',
  'Salomon Brothers': '所罗门兄弟',
  'Scott & Fetzer': 'Scott_Fetzer',
  "See's": '喜诗糖果',
  "See's Candies": '喜诗糖果',
  'Washington Post': '华盛顿邮报',
  'Wells Fargo': '富国银行',
  '中美能源': '中美能源',
  '亨氏': '亨氏',
  '伯克希尔': '伯克希尔哈撒韦',
  '伯克希尔哈撒韦': '伯克希尔哈撒韦',
  '伯克希尔能源': '中美能源',
  '克莱顿': '克莱顿家园',
  '克莱顿家园': '克莱顿家园',
  '内布拉斯加家具城': '内布拉斯加家具城',
  '北方铁路': 'BNSF铁路',
  '华盛顿邮报': '华盛顿邮报',
  '卡夫亨氏': '亨氏',
  '可乐': '可口可乐',
  '可口可乐': '可口可乐',
  '吉列': '吉列',
  '哈撒韦': '伯克希尔哈撒韦',
  '喜诗': '喜诗糖果',
  '喜诗糖果': '喜诗糖果',
  '国家赔偿': '国家赔偿公司',
  '国家赔偿公司': '国家赔偿公司',
  '国际商业机器': 'IBM',
  '大都会': '大都会',
  '宝洁': '宝洁',
  '家具城': '内布拉斯加家具城',
  '富国银行': '富国银行',
  '强生': '强生',
  '房利美': '房地美',
  '房地美': '房地美',
  '所罗门': '所罗门兄弟',
  '所罗门兄弟': '所罗门兄弟',
  '政府雇员保险': 'GEICO',
  '比亚迪': '比亚迪',
  '水牛城': '水牛城新闻',
  '水牛城新闻': '水牛城新闻',
  '盖可': 'GEICO',
  '盖可保险': 'GEICO',
  '穆迪': '穆迪',
  '美国运通': '美国运通',
  '美国银行': '美国银行',
  '美银': '美国银行',
  '苹果': '苹果公司',
  '苹果公司': '苹果公司',
  '蓝筹': '蓝筹印花',
  '蓝筹印花': '蓝筹印花',
  '西方石油': '西方石油',
  '运通': '美国运通',
  '雪佛龙': '雪佛龙',
  '飞安': '飞安国际',
  '飞安国际': '飞安国际',
  '首都城市': '首都城市ABC',
  '麦克莱恩': 'McLanes麦克莱恩',
}

// 启用 wiki-links 支持的函数
function enableWikiLinks(md: any) {
  const defaultRender = md.renderer.rules.link_open || function(tokens: any[], idx: number, options: any, env: any, self: any) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = function(tokens: any[], idx: number, options: any, env: any, self: any) {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    
    if (hrefIndex !== -1) {
      const href = token.attrs[hrefIndex][1]
      const wikiMatch = href.match(/^\[\[(.+?)\]\]$/)
      if (wikiMatch) {
        const rawContent = wikiMatch[1]
        const pipeIndex = rawContent.indexOf('|')
        const pageName = pipeIndex >= 0 ? rawContent.slice(0, pipeIndex) : rawContent
        
        if (pageName.startsWith('/')) {
          token.attrs[hrefIndex][1] = pageName
        } else if (PEOPLE_MAP[pageName]) {
          token.attrs[hrefIndex][1] = `/04_people/${PEOPLE_MAP[pageName]}`
        } else if (COMPANY_MAP[pageName]) {
          token.attrs[hrefIndex][1] = `/03_companies/${COMPANY_MAP[pageName]}`
        } else {
          token.attrs[hrefIndex][1] = `/search?q=${encodeURIComponent(pageName)}`
        }
      }
    }
    
    return defaultRender(tokens, idx, options, env, self)
  }
}

// wiki-links 内联解析
function wikiLinkRule(md: any) {
  md.inline.ruler.before('link', 'wiki_link', function(state: any, silent: boolean) {
    const start = state.pos
    if (state.src.charCodeAt(start) !== 0x5B || state.src.charCodeAt(start + 1) !== 0x5B) return false
    
    const endPos = state.src.indexOf(']]', start + 2)
    if (endPos === -1) return false
    
    const rawContent = state.src.slice(start + 2, endPos)
    const pipeIndex = rawContent.indexOf('|')
    const pageName = pipeIndex >= 0 ? rawContent.slice(0, pipeIndex) : rawContent
    const displayText = pipeIndex >= 0 ? rawContent.slice(pipeIndex + 1) : rawContent
    
    if (!silent) {
      let href: string
      if (pageName.startsWith('/')) {
        href = pageName
      } else if (PEOPLE_MAP[pageName]) {
        href = `/04_people/${PEOPLE_MAP[pageName]}`
      } else if (COMPANY_MAP[pageName]) {
        href = `/03_companies/${COMPANY_MAP[pageName]}`
      } else {
        href = `/search?q=${encodeURIComponent(pageName)}`
      }
      
      const token = state.push('link_open', 'a', 1)
      token.attrs = [['href', href]]
      token.markup = '[['
      
      const textToken = state.push('text', '', 0)
      textToken.content = displayText
      
      state.push('link_close', 'a', -1)
    }
    
    state.pos = endPos + 2
    return true
  })
}

// 生成年份子菜单
function generateYearItems(year: string) {
  const items: any[] = []
  const yearNum = parseInt(year)
  
  items.push({ text: '📄 全年股东信', link: `/01_letters/${year}年/翻译` })
  
  if (year === '1961' || year === '1962') {
    items.push({ text: '📅 年中信', link: `/01_letters/${year}年/年中信` })
  }
  
  if (yearNum >= 1989) {
    items.push({ text: '📝 核心总结', link: `/01_letters/${year}年/核心总结` })
  }
  
  if (yearNum >= 1977 && year !== '2009') {
    items.push({ text: '🧠 思维导图', link: `/01_letters/${year}年/思维导图` })
  }
  
  return items
}

// 全部年份配置
const ALL_YEARS = [
  '1956','1957','1958','1959','1960','1961','1962','1963','1964','1965',
  '1966','1967','1968','1969','1970','1971','1972','1973','1974','1975',
  '1976','1977','1978','1979','1980','1981','1982','1983','1984','1985',
  '1986','1987','1988','1989','1990','1991','1992','1993','1994','1995',
  '1996','1997','1998','1999','2000','2001','2002','2003','2004','2005',
  '2006','2007','2008','2009','2010','2011','2012','2013','2014','2015',
  '2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'
]

const ERA_CONFIGS = [
  { label: '第一纪元：合伙人信', years: ['1956','1957','1958','1959','1960','1961','1962','1963','1964','1965','1966','1967','1968','1969'] },
  { label: '第二纪元：早期探索', years: ['1970','1971','1972','1973','1974','1975','1976'] },
  { label: '第三纪元：保险驱动', years: ['1977','1978','1979','1980','1981','1982','1983','1984','1985','1986','1987','1988'] },
  { label: '第四纪元：帝国扩张', years: ['1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999'] },
  { label: '第五纪元：周期穿越', years: ['2000','2001','2002','2003','2004','2005','2006','2007','2008'] },
  { label: '第六纪元：超级控股', years: ['2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'] },
  { label: '第七纪元：传承告别', years: ['2020','2021','2022','2023','2024','2025'] },
]

const ERA_SIDEBAR = ERA_CONFIGS.map(era => ({
  text: era.label,
  collapsed: true,
  items: era.years.map(year => ({
    text: `${year}年`,
    collapsed: true,
    items: generateYearItems(year)
  }))
}))

// ✅ 关键：用 withMermaid 包裹整个 defineConfig
export default withMermaid(defineConfig({
  title: '巴菲特致股东信知识库',
  description: '中文世界最系统的巴菲特股东信知识库（1956-2025）',
  
  ignoreDeadLinks: true,
  
  mermaid: {},
  
  markdown: {
    // ✅ 在 markdown.config 里直接调用两个 wiki-links 插件
    config: (md) => {
      enableWikiLinks(md)   // 渲染层：[[...]] → <a href>
      wikiLinkRule(md)        // 解析层：识别 [[...]] 语法
    }
  },
  
  themeConfig: {
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    
    nav: [
      { text: '首页', link: '/' },
      { text: '全年股东信', link: '/01_letters/' },
      { text: '主题索引', link: '/02_concepts/' },
      { text: '公司档案', link: '/03_companies/' },
      { text: '人物传记', link: '/04_people/' },
      { text: '金句库', link: '/05_quotes/' },
      { text: '数据可视化', link: '/06_visualization/' },
      { text: '扩展阅读', link: '/07_resources/' },
      { text: '创作工具', link: '/08_tools/' }
    ],
    
    sidebar: [
      {
        text: '🏠 首页',
        link: '/'
      },
      
      {
        text: '📚 全年股东信',
        link: '/01_letters/',
        collapsed: false,
        items: ERA_SIDEBAR
      },
      
      {
        text: '🎯 主题索引',
        link: '/02_concepts/',
        collapsed: true,
        items: [
          {
            text: '💡 投资哲学（5）',
            collapsed: true,
            items: [
              { text: '内在价值', link: '/02_concepts/intrinsic-value' },
              { text: '护城河', link: '/02_concepts/moat' },
              { text: '安全边际', link: '/02_concepts/safety-margin' },
              { text: '复利', link: '/02_concepts/compounding' },
              { text: 'GAAP vs 真实盈利', link: '/02_concepts/accounting-earnings' }
            ]
          },
          {
            text: '⚙️ 商业逻辑（4）',
            collapsed: true,
            items: [
              { text: '保险浮存金', link: '/02_concepts/insurance-float' },
              { text: '承保纪律', link: '/02_concepts/underwriting-discipline' },
              { text: '资本配置', link: '/02_concepts/capital-allocation' },
              { text: '股票回购', link: '/02_concepts/share-buybacks' }
            ]
          },
          {
            text: '🧠 思维方法（4）',
            collapsed: true,
            items: [
              { text: '能力圈', link: '/02_concepts/circle-of-competence' },
              { text: '逆向思维', link: '/02_concepts/contrarian' },
              { text: '多元化与集中', link: '/02_concepts/diversification' },
              { text: '风险', link: '/02_concepts/risk' }
            ]
          },
          {
            text: '🏛️ 治理智慧（4）',
            collapsed: true,
            items: [
              { text: '管理层选择', link: '/02_concepts/management' },
              { text: '高管薪酬', link: '/02_concepts/executive-compensation' },
              { text: '董事会与公司治理', link: '/02_concepts/corporate-governance' },
              { text: '声誉', link: '/02_concepts/reputation' }
            ]
          },
          {
            text: '📜 历史镜鉴（3）',
            collapsed: true,
            items: [
              { text: '航空公司教训', link: '/02_concepts/airline-lessons' },
              { text: '日本五大投资', link: '/02_concepts/japan-investments' },
              { text: '长期主义', link: '/02_concepts/long-term' }
            ]
          }
        ]
      },
      
      {
        text: '🏢 公司档案',
        link: '/03_companies/',
        collapsed: true,
        items: [
          {
            text: '📁 伯克希尔子公司',
            collapsed: true,
            items: [
              { text: 'GEICO', link: '/03_companies/GEICO' },
              { text: '喜诗糖果', link: '/03_companies/喜诗糖果' },
              { text: '内布拉斯加家具城', link: '/03_companies/内布拉斯加家具城' },
              { text: 'BNSF铁路', link: '/03_companies/BNSF铁路' },
              { text: '伯克希尔哈撒韦', link: '/03_companies/伯克希尔哈撒韦' },
              { text: '国家赔偿公司', link: '/03_companies/国家赔偿公司' },
              { text: '中美能源', link: '/03_companies/中美能源' },
              { text: '克莱顿家园', link: '/03_companies/克莱顿家园' }
            ]
          },
          {
            text: '📁 已清仓持仓',
            collapsed: true,
            items: [
              { text: '华盛顿邮报', link: '/03_companies/华盛顿邮报' },
              { text: '首都城市ABC', link: '/03_companies/首都城市ABC' },
              { text: '水牛城新闻', link: '/03_companies/水牛城新闻' },
              { text: '蓝筹印花', link: '/03_companies/蓝筹印花' },
              { text: 'Scott & Fetzer', link: '/03_companies/Scott_Fetzer' },
              { text: '所罗门兄弟', link: '/03_companies/所罗门兄弟' },
              { text: 'Fechheimer Bros.', link: '/03_companies/Fechheimer_Bros' },
              { text: 'ISCAR-IMC', link: '/03_companies/ISCAR-IMC' },
              { text: 'Marmon集团', link: '/03_companies/Marmon集团' },
              { text: 'McLanes麦克莱恩', link: '/03_companies/McLanes麦克莱恩' }
            ]
          }
        ]
      },
      
      {
        text: '👤 人物传记',
        link: '/04_people/',
        collapsed: true,
        items: [
          {
            text: '📁 伯克希尔核心管理层',
            collapsed: true,
            items: [
              { text: '沃伦·巴菲特', link: '/04_people/沃伦·巴菲特' },
              { text: '查理·芒格', link: '/04_people/查理·芒格' },
              { text: '阿吉特·贾恩', link: '/04_people/阿吉特·贾恩' },
              { text: '格雷迪·罗西尔', link: '/04_people/格雷迪·罗西尔' }
            ]
          },
          {
            text: '📁 子公司CEO',
            collapsed: true,
            items: [
              { text: '菲尔·利切', link: '/04_people/菲尔·利切' },
              { text: '皮特·利格尔', link: '/04_people/皮特·利格尔' },
              { text: '凯文·克莱顿', link: '/04_people/凯文·克莱顿' },
              { text: '雅各布·哈帕兹', link: '/04_people/雅各布·哈帕兹' },
              { text: '埃坦·韦特海默', link: '/04_people/埃坦·韦特海默' }
            ]
          },
          {
            text: '📁 投资大师',
            collapsed: true,
            items: [
              { text: '本·格雷厄姆', link: '/04_people/本·格雷厄姆' },
              { text: '斯坦·利普西', link: '/04_people/斯坦·利普西' },
              { text: '卢·辛普森', link: '/04_people/卢·辛普森' }
            ]
          },
          {
            text: '📁 被投公司CEO',
            collapsed: true,
            items: [
              { text: '杰克·伯恩', link: '/04_people/杰克·伯恩' },
              { text: '本·罗斯纳', link: '/04_people/本·罗斯纳' },
              { text: '吉恩·阿贝格', link: '/04_people/吉恩·阿贝格' },
              { text: '弗兰克·普塔克', link: '/04_people/弗兰克·普塔克' }
            ]
          }
        ]
      },
      
      {
        text: '💬 金句库',
        link: '/05_quotes/',
        collapsed: true,
        items: []
      },
      
      {
        text: '📊 数据可视化',
        link: '/06_visualization/',
        collapsed: true,
        items: []
      },
      
      {
        text: '📖 扩展阅读',
        link: '/07_resources/',
        collapsed: true,
        items: []
      },
      
      {
        text: '🛠️ 创作工具',
        link: '/08_tools/',
        collapsed: true,
        items: []
      }
    ],
    
    search: {
      provider: 'local'
    },
    
    footer: {
      message: '巴菲特致股东信知识库（1956-2025）- 免费分享',
      copyright: 'Copyright © 2026'
    }
  }
}))
