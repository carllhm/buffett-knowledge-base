import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

// 人物名 → 人物页 slug 映射
const CONCEPT_MAP: Record<string, string> = {
  '内在价值': 'intrinsic-value',
  '护城河': 'moat',
  '安全边际': 'safety-margin',
  '复利': 'compounding',
  '长期主义': 'long-term',
  '能力圈': 'circle-of-competence',
  '逆向思维': 'contrarian',
  '声誉': 'reputation',
  '声誉经济': 'reputation',
  '风险': 'risk',
  '风险控制': 'risk',
  '资本配置': 'capital-allocation',
  '保险浮存金': 'insurance-float',
  '管理层': 'management',
  '管理层选择': 'management',
  '股票回购': 'share-buybacks',
  '董事会治理': 'corporate-governance',
  '高管薪酬': 'executive-compensation',
  'GAAP与真实盈利': 'accounting-earnings',
  'GAAP vs 真实盈利': 'accounting-earnings',
  '多元化与集中': 'diversification',
  '多元化vs集中': 'diversification',
  '航空公司教训': 'airline-lessons',
  '日本五大投资': 'japan-investments',
  '日本五大综合企业': 'japan-investments',
  '承保纪律': 'underwriting-discipline',
  // 2026-04-15 新增主题
  '递延税复利': 'deferred-tax',
  '透视盈利': 'look-through-earnings',
  '所罗门危机': 'salomon-crisis',
  '错误坦诚': 'mistakes',
  '合伙基金方法': 'partnership-method',
  '三大投资类别': 'partnership-method',
  '投资方法': 'partnership-method',
}

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
  // 2026-04-12 新增人物
  '格雷格·阿贝尔': '格雷格·阿贝尔',
  'Greg Abel': '格雷格·阿贝尔',
  '阿贝尔': '格雷格·阿贝尔',
  '托德·康姆斯': '托德·康姆斯',
  'Todd Combs': '托德·康姆斯',
  '特德·韦斯勒': '特德·韦斯勒',
  'Ted Weschler': '特德·韦斯勒',
  '韦斯勒': '特德·韦斯勒',
  '托尼·尼斯利': '托尼·尼斯利',
  'Tony Nicely': '托尼·尼斯利',
  '尼斯利': '托尼·尼斯利',
  '大卫·索科尔': '大卫·索科尔',
  'David Sokol': '大卫·索科尔',
  '索科尔': '大卫·索科尔',
  '沃尔特·斯科特': '沃尔特·斯科特',
  'Walter Scott': '沃尔特·斯科特',
  '罗恩·奥尔森': '罗恩·奥尔森',
  'Ron Olson': '罗恩·奥尔森',
  '洛伊默·戴维森': '洛伊默·戴维森',
  'Lorimer Davidson': '洛伊默·戴维森',
  '凯·格雷厄姆': '凯·格雷厄姆',
  '罗恩·弗格森': '罗恩·弗格森',
  'Ron Ferguson': '罗恩·弗格森',
  'ron_ferguson': 'ron_ferguson',
  // 2026-04-16 补全全部77位人物映射
  '比尔·斯奈德': '比尔·斯奈德',
  '杰克·林格沃尔特': '杰克·林格沃尔特',
  '比尔·凯泽': '比尔·凯泽',
  '迈克·戈德堡': '迈克·戈德堡',
  '迪诺斯·约达努': '迪诺斯·约达努',
  '路易·布鲁姆金': '路易·布鲁姆金',
  '罗恩·欧文': '罗恩·欧文',
  '里奇·桑图利': '里奇·桑图利',
  '默里·莱特': '默里·莱特',
  '迪克·西蒙斯': '迪克·西蒙斯',
  '本·罗斯纳': '本·罗斯纳',
  '弗兰克·鲁尼': '弗兰克·鲁尼',
  '吉姆·伊斯勒': '吉姆·伊斯勒',
  '比尔·蔡尔德': '比尔·蔡尔德',
  '谢尔顿·蔡尔德': '谢尔顿·蔡尔德',
  '哈罗德·阿尔方德': '哈罗德·阿尔方德',
  '彼得·伦德': '彼得·伦德',
  '梅尔文·沃尔夫': '梅尔文·沃尔夫',
  '雪莉·图米姆': '雪莉·图米姆',
  '赫尔德曼家族': '赫尔德曼家族',
  '巴里·塔特尔曼': '巴里·塔特尔曼',
  '艾略特·塔特尔曼': '艾略特·塔特尔曼',
  '小巴内特·赫尔兹伯格': '小巴内特·赫尔兹伯格',
  '杰夫·科门特': '杰夫·科门特',
  '苏珊·雅克': '苏珊·雅克',
  '艾克·弗里德曼': '艾克·弗里德曼',
  '艾伦·弗里德曼': '艾伦·弗里德曼',
  '约翰·穆蒂': '约翰·穆蒂',
  '迈克·沙利文': '迈克·沙利文',
  '阿尔·乌尔奇': '阿尔·乌尔奇',
  '拉尔夫·谢伊': '拉尔夫·谢伊',
  '丹·伯克': '丹·伯克',
  '罗伯托·戈伊苏埃塔': '罗伯托·戈伊苏埃塔',
  '唐·库赫': '唐·库赫',
  '保罗·黑曾': '保罗·黑曾',
  '卡尔·赖查特': '卡尔·赖查特',
  '大卫·马克斯韦尔': '大卫·马克斯韦尔',
  '比尔·安德斯': '比尔·安德斯',
  '科尔曼·莫格勒': '科尔曼·莫格勒',
  '弗兰克·奥尔森': '弗兰克·奥尔森',
  '塞思·斯科菲尔德': '塞思·斯科菲尔德',
  '约翰·古尔特弗里德': '约翰·古尔特弗里德',
  '约翰·麦克法兰': '约翰·麦克法兰',
  '德里克·莫恩': '德里克·莫恩',
  '唐·霍华德': '唐·霍华德',
  '鲍勃·德纳姆': '鲍勃·德纳姆',
  '理查德·瑟斯': '理查德·瑟斯',
  '罗伊·丁斯代尔': '罗伊·丁斯代尔',
  // 别名映射
  '戈伊苏埃塔': '罗伯托·戈伊苏埃塔',
  '林格沃尔特': '杰克·林格沃尔特',
  '桑图利': '里奇·桑图利',
  '赫尔兹伯格': '小巴内特·赫尔兹伯格',
  '古尔特弗里德': '约翰·古尔特弗里德',
  '德纳姆': '鲍勃·德纳姆',
  '马克斯韦尔': '大卫·马克斯韦尔',
  '莫格勒': '科尔曼·莫格勒',
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
        } else if (CONCEPT_MAP[pageName]) {
          token.attrs[hrefIndex][1] = `/02_concepts/${CONCEPT_MAP[pageName]}`
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
      } else if (displayText.startsWith('/')) {
        href = displayText
      } else if (displayText.match(/^(05_quotes|03_companies|04_people|02_concepts|01_letters)\//)) {
        href = `/${displayText}`
      } else if (CONCEPT_MAP[pageName]) {
        href = `/02_concepts/${CONCEPT_MAP[pageName]}`
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

      // 对于 [[/01_letters/1993年/核心总结]] 无 | 的情况，
      // 用路径最后一段做显示文本（如"核心总结"）
      const display = (!pageName.includes('|') && pageName.startsWith('/'))
        ? (pageName.split('/').pop() || pageName)
        : displayText
      const textToken = state.push('text', '', 0)
      textToken.content = display

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

  if (yearNum >= 1970 || ['1956','1957','1958','1959','1960','1961','1962','1963','1964','1965','1966','1967','1968','1969'].includes(year)) {
    items.push({ text: '📝 核心总结', link: `/01_letters/${year}年/核心总结` })
  }

  items.push({ text: '🧠 思维导图', link: `/01_letters/${year}年/思维导图` })

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

  cleanUrls: false,

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
      { text: '全年股东信', link: '/01_letters.html' },
      { text: '70年导读', link: '/00_index/巴菲特致股东信70年导读.html' },
      { text: '主题索引', link: '/02_concepts.html' },
      { text: '公司档案', link: '/03_companies.html' },
      { text: '人物传记', link: '/04_people.html' },
      { text: '金句库', link: '/05_quotes.html' },
      { text: '知识图谱', link: '/08_knowledge-graph.html' },
      { text: '📖 经典著作', link: '/09_books.html' },
    ],

    sidebar: [
      {
        text: '🏠 首页',
        link: '/'
      },

      {
        text: '📚 全年股东信',
        link: '/01_letters.html',
        collapsed: false,
        items: ERA_SIDEBAR
      },

      {
        text: '🎯 主题索引',
        link: '/02_concepts.html',
        collapsed: true,
        items: [
          {
            text: '💡 投资哲学（5）',
            collapsed: true,
            items: [
              { text: '内在价值', link: '/02_concepts/intrinsic-value.html' },
              { text: '护城河', link: '/02_concepts/moat.html' },
              { text: '安全边际', link: '/02_concepts/safety-margin.html' },
              { text: '复利', link: '/02_concepts/compounding.html' },
              { text: 'GAAP vs 真实盈利', link: '/02_concepts/accounting-earnings.html' }
            ]
          },
          {
            text: '⚙️ 商业逻辑（5）',
            collapsed: true,
            items: [
              { text: '保险浮存金', link: '/02_concepts/insurance-float.html' },
              { text: '承保纪律', link: '/02_concepts/underwriting-discipline.html' },
              { text: '资本配置', link: '/02_concepts/capital-allocation.html' },
              { text: '递延税复利 🆕', link: '/02_concepts/deferred-tax.html' },
              { text: '回购纪律', link: '/02_concepts/share-buybacks.html' }
            ]
          },
          {
            text: '🧠 投资方法论（4）',
            collapsed: true,
            items: [
              { text: '能力圈', link: '/02_concepts/circle-of-competence.html' },
              { text: '逆向思维', link: '/02_concepts/contrarian.html' },
              { text: '透视盈利 🆕', link: '/02_concepts/look-through-earnings.html' },
              { text: '风险', link: '/02_concepts/risk.html' }
            ]
          },
          {
            text: '🏛️ 治理智慧（5）',
            collapsed: true,
            items: [
              { text: '管理层选择', link: '/02_concepts/management.html' },
              { text: '高管薪酬', link: '/02_concepts/executive-compensation.html' },
              { text: '董事会与公司治理', link: '/02_concepts/corporate-governance.html' },
              { text: '错误坦诚 🆕', link: '/02_concepts/mistakes.html' },
              { text: '声誉', link: '/02_concepts/reputation.html' }
            ]
          },
          {
            text: '📜 历史镜鉴（5）',
            collapsed: true,
            items: [
              { text: '航空公司教训', link: '/02_concepts/airline-lessons.html' },
              { text: '所罗门危机 🆕', link: '/02_concepts/salomon-crisis.html' },
              { text: '日本五大投资', link: '/02_concepts/japan-investments.html' },
              { text: '长期主义', link: '/02_concepts/long-term.html' },
              { text: '多元化与集中', link: '/02_concepts/diversification.html' }
            ]
          },
          {
            text: '📦 合伙基金时期（1956-1969）',
            collapsed: true,
            items: [
              { text: '三大投资类别 🆕', link: '/02_concepts/partnership-method.html' },
              { text: '安全边际的原始含义', link: '/02_concepts/safety-margin.html' }
            ]
          }
        ]
      },

      {
        text: '🏢 公司档案',
        link: '/03_companies.html',
        collapsed: true,
        items: [
          {
            text: '📁 保险业务',
            collapsed: true,
            items: [
              { text: 'GEICO', link: '/03_companies/GEICO.html' },
              { text: '国家赔偿公司', link: '/03_companies/国家赔偿公司.html' },
              { text: '通用再保险', link: '/03_companies/通用再保险.html' },
            ]
          },
          {
            text: '📁 消费与零售',
            collapsed: true,
            items: [
              { text: '喜诗糖果', link: '/03_companies/喜诗糖果.html' },
              { text: '内布拉斯加家具城', link: '/03_companies/内布拉斯加家具城.html' },
              { text: '克莱顿家园', link: '/03_companies/克莱顿家园.html' },
              { text: 'Forest River', link: '/03_companies/Forest River.html' },
              { text: 'McLanes麦克莱恩', link: '/03_companies/McLanes麦克莱恩.html' },
              { text: '麦当劳', link: '/03_companies/麦当劳.html' },
            ]
          },
          {
            text: '📁 媒体与出版',
            collapsed: true,
            items: [
              { text: '华盛顿邮报', link: '/03_companies/华盛顿邮报.html' },
              { text: '首都城市ABC', link: '/03_companies/首都城市ABC.html' },
              { text: '水牛城新闻', link: '/03_companies/水牛城新闻.html' },
            ]
          },
          {
            text: '📁 工业与制造',
            collapsed: true,
            items: [
              { text: 'BNSF铁路', link: '/03_companies/BNSF铁路.html' },
              { text: 'ISCAR-IMC', link: '/03_companies/ISCAR-IMC.html' },
              { text: 'Marmon集团', link: '/03_companies/Marmon集团.html' },
              { text: 'Scott & Fetzer', link: '/03_companies/Scott_Fetzer.html' },
              { text: 'Fechheimer Bros.', link: '/03_companies/Fechheimer_Bros.html' },
              { text: '冠军国际纸业', link: '/03_companies/冠军国际纸业.html' },
            ]
          },
          {
            text: '📁 能源与金融',
            collapsed: true,
            items: [
              { text: '中美能源', link: '/03_companies/中美能源.html' },
              { text: '蓝筹印花', link: '/03_companies/蓝筹印花.html' },
              { text: '所罗门兄弟', link: '/03_companies/所罗门兄弟.html' },
              { text: '伯克希尔哈撒韦', link: '/03_companies/伯克希尔哈撒韦.html' },
              { text: '健力士', link: '/03_companies/健力士.html' },
            ]
          },
          {
            text: '📁 核心持仓',
            collapsed: true,
            items: [
              { text: '苹果公司', link: '/03_companies/苹果公司.html' },
              { text: '美国运通', link: '/03_companies/美国运通.html' },
              { text: '可口可乐', link: '/03_companies/可口可乐.html' },
              { text: '美国银行', link: '/03_companies/美国银行.html' },
              { text: '雪佛龙', link: '/03_companies/雪佛龙.html' },
              { text: '比亚迪', link: '/03_companies/比亚迪.html' },
              { text: '迪士尼', link: '/03_companies/迪士尼.html' },
            ]
          },
          {
            text: '📁 已清仓/历史持仓',
            collapsed: true,
            items: [
              { text: '富国银行', link: '/03_companies/富国银行.html' },
              { text: 'IBM', link: '/03_companies/IBM.html' },
              { text: '伊利诺伊国民银行', link: '/03_companies/伊利诺伊国民银行.html' },
              { text: '联合零售商店', link: '/03_companies/联合零售商店.html' },
            ]
          },
        ]
      },

      {
        text: '👤 人物传记',
        link: '/04_people.html',
        collapsed: true,
        items: [
          {
            text: '👑 伯克希尔核心（4）',
            collapsed: true,
            items: [
              { text: '沃伦·巴菲特', link: '/04_people/沃伦·巴菲特.html' },
              { text: '查理·芒格', link: '/04_people/查理·芒格.html' },
              { text: '格雷格·阿贝尔', link: '/04_people/格雷格·阿贝尔.html' },
              { text: '阿吉特·贾恩', link: '/04_people/阿吉特·贾恩.html' },
            ]
          },
          {
            text: '📊 投资经理（3）',
            collapsed: true,
            items: [
              { text: '托德·康姆斯', link: '/04_people/托德·康姆斯.html' },
              { text: '特德·韦斯勒', link: '/04_people/特德·韦斯勒.html' },
              { text: '卢·辛普森', link: '/04_people/卢·辛普森.html' },
            ]
          },
          {
            text: '🏢 保险业务（10）',
            collapsed: true,
            items: [
              { text: '托尼·尼斯利', link: '/04_people/托尼·尼斯利.html' },
              { text: '杰克·伯恩', link: '/04_people/杰克·伯恩.html' },
              { text: '洛伊默·戴维森', link: '/04_people/洛伊默·戴维森.html' },
              { text: '比尔·斯奈德', link: '/04_people/比尔·斯奈德.html' },
              { text: '罗恩·弗格森', link: '/04_people/罗恩·弗格森.html' },
              { text: '菲尔·利切', link: '/04_people/菲尔·利切.html' },
              { text: '杰克·林格沃尔特', link: '/04_people/杰克·林格沃尔特.html' },
              { text: '比尔·凯泽', link: '/04_people/比尔·凯泽.html' },
              { text: '迈克·戈德堡', link: '/04_people/迈克·戈德堡.html' },
              { text: '迪诺斯·约达努', link: '/04_people/迪诺斯·约达努.html' },
            ]
          },
          {
            text: '🏭 子公司CEO与管理层（36）',
            collapsed: true,
            items: [
              { text: 'B夫人', link: '/04_people/B夫人.html' },
              { text: '路易·布鲁姆金', link: '/04_people/路易·布鲁姆金.html' },
              { text: '罗恩·欧文', link: '/04_people/罗恩·欧文.html' },
              { text: '凯文·克莱顿', link: '/04_people/凯文·克莱顿.html' },
              { text: '格雷迪·罗西尔', link: '/04_people/格雷迪·罗西尔.html' },
              { text: '皮特·利格尔', link: '/04_people/皮特·利格尔.html' },
              { text: '埃坦·韦特海默', link: '/04_people/埃坦·韦特海默.html' },
              { text: '雅各布·哈帕兹', link: '/04_people/雅各布·哈帕兹.html' },
              { text: '弗兰克·普塔克', link: '/04_people/弗兰克·普塔克.html' },
              { text: '里奇·桑图利', link: '/04_people/里奇·桑图利.html' },
              { text: 'Chuck Huggins', link: '/04_people/Chuck_Huggins.html' },
              { text: '斯坦·利普西', link: '/04_people/斯坦·利普西.html' },
              { text: '默里·莱特', link: '/04_people/默里·莱特.html' },
              { text: '迪克·西蒙斯', link: '/04_people/迪克·西蒙斯.html' },
              { text: '本·罗斯纳', link: '/04_people/本·罗斯纳.html' },
              { text: '吉恩·阿贝格', link: '/04_people/吉恩·阿贝格.html' },
              { text: '弗兰克·鲁尼', link: '/04_people/弗兰克·鲁尼.html' },
              { text: '吉姆·伊斯勒', link: '/04_people/吉姆·伊斯勒.html' },
              { text: '比尔·蔡尔德', link: '/04_people/比尔·蔡尔德.html' },
              { text: '谢尔顿·蔡尔德', link: '/04_people/谢尔顿·蔡尔德.html' },
              { text: '哈罗德·阿尔方德', link: '/04_people/哈罗德·阿尔方德.html' },
              { text: '彼得·伦德', link: '/04_people/彼得·伦德.html' },
              { text: '梅尔文·沃尔夫', link: '/04_people/梅尔文·沃尔夫.html' },
              { text: '雪莉·图米姆', link: '/04_people/雪莉·图米姆.html' },
              { text: '赫尔德曼家族', link: '/04_people/赫尔德曼家族.html' },
              { text: '巴里·塔特尔曼', link: '/04_people/巴里·塔特尔曼.html' },
              { text: '艾略特·塔特尔曼', link: '/04_people/艾略特·塔特尔曼.html' },
              { text: '小巴内特·赫尔兹伯格', link: '/04_people/小巴内特·赫尔兹伯格.html' },
              { text: '杰夫·科门特', link: '/04_people/杰夫·科门特.html' },
              { text: '苏珊·雅克', link: '/04_people/苏珊·雅克.html' },
              { text: '艾克·弗里德曼', link: '/04_people/艾克·弗里德曼.html' },
              { text: '艾伦·弗里德曼', link: '/04_people/艾伦·弗里德曼.html' },
              { text: '约翰·穆蒂', link: '/04_people/约翰·穆蒂.html' },
              { text: '迈克·沙利文', link: '/04_people/迈克·沙利文.html' },
              { text: '阿尔·乌尔奇', link: '/04_people/阿尔·乌尔奇.html' },
              { text: '拉尔夫·谢伊', link: '/04_people/拉尔夫·谢伊.html' },
            ]
          },
          {
            text: '📰 被投公司CEO（17）',
            collapsed: true,
            items: [
              { text: 'Tom Murphy', link: '/04_people/Tom_Murphy.html' },
              { text: '丹·伯克', link: '/04_people/丹·伯克.html' },
              { text: '凯·格雷厄姆', link: '/04_people/凯·格雷厄姆.html' },
              { text: '罗伯托·戈伊苏埃塔', link: '/04_people/罗伯托·戈伊苏埃塔.html' },
              { text: '唐·库赫', link: '/04_people/唐·库赫.html' },
              { text: '保罗·黑曾', link: '/04_people/保罗·黑曾.html' },
              { text: '卡尔·赖查特', link: '/04_people/卡尔·赖查特.html' },
              { text: '大卫·马克斯韦尔', link: '/04_people/大卫·马克斯韦尔.html' },
              { text: '比尔·安德斯', link: '/04_people/比尔·安德斯.html' },
              { text: '科尔曼·莫格勒', link: '/04_people/科尔曼·莫格勒.html' },
              { text: '弗兰克·奥尔森', link: '/04_people/弗兰克·奥尔森.html' },
              { text: '塞思·斯科菲尔德', link: '/04_people/塞思·斯科菲尔德.html' },
              { text: '约翰·古尔特弗里德', link: '/04_people/约翰·古尔特弗里德.html' },
              { text: '约翰·麦克法兰', link: '/04_people/约翰·麦克法兰.html' },
              { text: '德里克·莫恩', link: '/04_people/德里克·莫恩.html' },
              { text: '唐·霍华德', link: '/04_people/唐·霍华德.html' },
              { text: '鲍勃·德纳姆', link: '/04_people/鲍勃·德纳姆.html' },
            ]
          },
          {
            text: '🎓 投资大师（1）',
            collapsed: true,
            items: [
              { text: '本·格雷厄姆', link: '/04_people/本·格雷厄姆.html' },
            ]
          },
          {
            text: '🤝 董事与顾问（5）',
            collapsed: true,
            items: [
              { text: '沃尔特·斯科特', link: '/04_people/沃尔特·斯科特.html' },
              { text: '罗恩·奥尔森', link: '/04_people/罗恩·奥尔森.html' },
              { text: '大卫·索科尔', link: '/04_people/大卫·索科尔.html' },
              { text: '理查德·瑟斯', link: '/04_people/理查德·瑟斯.html' },
              { text: '罗伊·丁斯代尔', link: '/04_people/罗伊·丁斯代尔.html' },
            ]
          },
        ]
      },

      {
        text: '💬 金句库',
        link: '/05_quotes.html',
        collapsed: false,
        items: [
          { text: '📚 按主题', link: '/05_quotes/by-theme.html' },
          { text: '📅 按年份', link: '/05_quotes/by-year.html' },
          { text: '🎯 按场景', link: '/05_quotes/by-scene.html' }
        ]
      },

      {
        text: '📊 数据可视化',
        link: '/06_visualization.html',
        collapsed: true,
        items: [
          {
            text: '📈 业绩与估值',
            collapsed: true,
            items: [
              { text: '伯克希尔 vs 标普500', link: '/06_visualization/berkshire-vs-sp500.html' },
              { text: '账面价值增长', link: '/06_visualization/book-value-growth.html' }
            ]
          },
          {
            text: '💼 持仓与收购',
            collapsed: true,
            items: [
              { text: '主要持仓变迁', link: '/06_visualization/top-holdings.html' },
              { text: '重大收购时间线', link: '/06_visualization/acquisitions-timeline.html' },
              { text: '保险浮存金趋势', link: '/06_visualization/insurance-float.html' }
            ]
          },
          {
            text: '🏭 业务版图',
            collapsed: true,
            items: [
              { text: '收入结构', link: '/06_visualization/revenue-breakdown.html' }
            ]
          }
        ]
      },

      {
        text: '📖 扩展阅读',
        link: '/07_resources.html',
        collapsed: true,
        items: []
      },

      {
        text: '📖 经典著作',
        link: '/09_books.html',
        collapsed: false,
        items: [
          { text: '📖 巴菲特之道', link: '/09_books/巴菲特之道.html' },
          { text: '🏢 企业准则', link: '/09_books/巴菲特之道/准则/01_企业准则.html' },
          { text: '👔 管理准则', link: '/09_books/巴菲特之道/准则/02_管理准则.html' },
          { text: '💰 财务准则', link: '/09_books/巴菲特之道/准则/03_财务准则.html' },
          { text: '📈 市场准则', link: '/09_books/巴菲特之道/准则/04_市场准则.html' },
        ]
      },
      {
        text: '🔗 知识图谱',
        link: '/08_knowledge-graph.html',
        collapsed: true,
        items: [
          { text: '📊 概念关系图', link: '/08_knowledge-graph/concept-relations.html' },
          { text: '👥 人物关系网络', link: '/08_knowledge-graph/person-network.html' },
          { text: '📅 投资时间线', link: '/08_knowledge-graph/investment-timeline.html' },
          { text: '🌐 全景图谱', link: '/08_knowledge-graph/full-graph.html' },
        ]
      },

    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: '巴菲特致股东信知识库（1956-2025）- 免费分享',
      copyright: 'Copyright © 2026'
    }
  },

  build: {
    end() {
      // Cloudflare Pages SPA fallback
      const distDir = join(__dirname, '..', '..', '.vitepress', 'dist')
      writeFileSync(
        join(distDir, '_redirects'),
        '/*    /index.html   200\n'
      )
    }
  }
}))
