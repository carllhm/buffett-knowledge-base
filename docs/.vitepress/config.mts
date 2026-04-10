import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// 人物名 → 人物页 slug 映射（用于 wiki-link 直接跳转）
const PEOPLE_MAP: Record<string, string> = {
  '沃伦·巴菲特': '沃伦·巴菲特',
  '巴菲特': '沃伦·巴菲特',
  '查理·芒格': '查理·芒格',
  '芒格': '查理·芒格',
  '阿吉特·贾恩': '阿吉特·贾恩',
  'Ajit·贾恩': '阿吉特·贾恩',
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
  'Murphy': 'Tom_Murphy',
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

// 公司名别名 → 公司页 slug 映射（wiki-link 直接跳转）
const COMPANY_MAP: Record<string, string> = {
  'ABC': '首都城市ABC',
  'ABC广播': '首都城市ABC',
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
  'Burlington Northern': 'BNSF铁路',
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
  'Johnson Johnson': '强生',
  'Marmon': 'Marmon集团',
  'Marmon集团': 'Marmon集团',
  'McLane': 'McLanes麦克莱恩',
  'McLanes': 'McLanes麦克莱恩',
  'MetLife': '大都会',
  'Metropolitan': '大都会',
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
  'Procter Gamble': '宝洁',
  'Salomon': '所罗门兄弟',
  'Salomon Brothers': '所罗门兄弟',
  'Scott & Fetzer': 'Scott_Fetzer',
  'Scott Fetzer': 'Scott_Fetzer',
  "See's": '喜诗糖果',
  "See's Candies": '喜诗糖果',
  'Washington Post': '华盛顿邮报',
  'Wells Fargo': '富国银行',
  '《华盛顿邮报》': '华盛顿邮报',
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
  '华盛顿邮报公司': '华盛顿邮报',
  '卡夫亨氏': '亨氏',
  '可乐': '可口可乐',
  '可口可乐': '可口可乐',
  '吉列': '吉列',
  '吉列公司': '吉列',
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
  '布法罗新闻': '水牛城新闻',
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
// 公司名别名 → 公司页 slug 映射（wiki-link 直接跳转）
const COMPANY_MAP: Record<string, string> = {
  'ABC': '首都城市ABC',
  'ABC广播': '首都城市ABC',
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
  'Burlington Northern': 'BNSF铁路',
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
  'Johnson Johnson': '强生',
  'Marmon': 'Marmon集团',
  'Marmon集团': 'Marmon集团',
  'McLane': 'McLanes麦克莱恩',
  'McLanes': 'McLanes麦克莱恩',
  'MetLife': '大都会',
  'Metropolitan': '大都会',
  'MidAmerican': '中美能源',
  'MidAmerican Energy': '中美能源',
  'Moody': '穆迪',
  'Moody's': '穆迪',
  'NFM': '内布拉斯加家具城',
  'NICO': '国家赔偿公司',
  'National Indemnity': '国家赔偿公司',
  'Nebraska Furniture Mart': '内布拉斯加家具城',
  'OXY': '西方石油',
  'Occidental': '西方石油',
  'P&G': '宝洁',
  'Procter & Gamble': '宝洁',
  'Procter Gamble': '宝洁',
  'Salomon': '所罗门兄弟',
  'Salomon Brothers': '所罗门兄弟',
  'Scott & Fetzer': 'Scott_Fetzer',
  'Scott Fetzer': 'Scott_Fetzer',
  'See's': '喜诗糖果',
  'See's Candies': '喜诗糖果',
  'Washington Post': '华盛顿邮报',
  'Wells Fargo': '富国银行',
  '《华盛顿邮报》': '华盛顿邮报',
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
  '华盛顿邮报公司': '华盛顿邮报',
  '卡夫亨氏': '亨氏',
  '可乐': '可口可乐',
  '可口可乐': '可口可乐',
  '吉列': '吉列',
  '吉列公司': '吉列',
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
  '布法罗新闻': '水牛城新闻',
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
// 自定义 wiki-links 插件
const wikiLinksPlugin = (md) => {
  const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    
    if (hrefIndex !== -1) {
      let href = token.attrs[hrefIndex][1]
      
      // 处理 wiki-links 格式 [[页面名]] 或 [[页面名|显示文本]]
      const wikiMatch = href.match(/^\[\[(.+?)\]\]$/)
      if (wikiMatch) {
        const rawContent = wikiMatch[1]
        const pipeIndex = rawContent.indexOf('|')
        const pageName = pipeIndex >= 0 ? rawContent.slice(0, pipeIndex) : rawContent
        
        // 以 / 开头的路径直接使用
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

// 生成年份子菜单（翻译、核心总结、思维导图）
function generateYearItems(year: string) {
  const items = []
  const yearNum = parseInt(year)
  
  // 翻译始终存在
  items.push({ text: '📄 全年股东信', link: `/01_letters/${year}年/翻译` })
  
  // 年中信（1961、1962年有年中信）
  if (year === '1961' || year === '1962') {
    items.push({ text: '📅 年中信', link: `/01_letters/${year}年/年中信` })
  }
  
  // 核心总结（1989年以后）
  if (yearNum >= 1989) {
    items.push({ text: '📝 核心总结', link: `/01_letters/${year}年/核心总结` })
  }
  
  // 思维导图（1977年以后，除了2009）
  if (yearNum >= 1977 && year !== '2009') {
    items.push({ text: '🧠 思维导图', link: `/01_letters/${year}年/思维导图` })
  }
  
  return items
}

export default withMermaid(defineConfig({
  title: '巴菲特致股东信知识库',
  description: '中文世界最系统的巴菲特股东信知识库（1956-2025）',
  
  ignoreDeadLinks: true,
  
  mermaid: {
    // Mermaid配置
  },
  
  markdown: {
    config: (md) => {
      // 配置 wiki-links 解析（支持管道符语法 [[页面|显示文本]]）
      md.inline.ruler.before('link', 'wiki_link', function(state, silent) {
        const start = state.pos
        const marker = state.src.charCodeAt(start)
        
        // 检查是否以 [[ 开头
        if (marker !== 0x5B /* [ */ || state.src.charCodeAt(start + 1) !== 0x5B /* [ */) {
          return false
        }
        
        const endPos = state.src.indexOf(']]', start + 2)
        if (endPos === -1) return false
        
        const rawContent = state.src.slice(start + 2, endPos)
        // 支持管道符语法：[[页面名|显示文本]]
        const pipeIndex = rawContent.indexOf('|')
        const pageName = pipeIndex >= 0 ? rawContent.slice(0, pipeIndex) : rawContent
        const displayText = pipeIndex >= 0 ? rawContent.slice(pipeIndex + 1) : rawContent
        
        if (!silent) {
          let href: string
          // 以 / 开头的路径直接使用
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
  },
  
  themeConfig: {
    // 首页配置（包含侧边栏）
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
      // 首页 - 显示左侧导航栏
      {
        text: '🏠 首页',
        link: '/'
      },
      
      // 原文翻译 - 多级结构（去掉年份）
      {
        text: '📚 全年股东信',
        link: '/01_letters/',
        collapsed: false,
        items: [
          {
            text: '第一纪元：合伙人信',
            collapsed: true,
            items: [
              { text: '1956年', collapsed: true, items: generateYearItems('1956') },
              { text: '1957年', collapsed: true, items: generateYearItems('1957') },
              { text: '1958年', collapsed: true, items: generateYearItems('1958') },
              { text: '1959年', collapsed: true, items: generateYearItems('1959') },
              { text: '1960年', collapsed: true, items: generateYearItems('1960') },
              { text: '1961年', collapsed: true, items: generateYearItems('1961') },
              { text: '1962年', collapsed: true, items: generateYearItems('1962') },
              { text: '1963年', collapsed: true, items: generateYearItems('1963') },
              { text: '1964年', collapsed: true, items: generateYearItems('1964') },
              { text: '1965年', collapsed: true, items: generateYearItems('1965') },
              { text: '1966年', collapsed: true, items: generateYearItems('1966') },
              { text: '1967年', collapsed: true, items: generateYearItems('1967') },
              { text: '1968年', collapsed: true, items: generateYearItems('1968') },
              { text: '1969年', collapsed: true, items: generateYearItems('1969') }
            ]
          },
          {
            text: '第二纪元：早期探索',
            collapsed: true,
            items: [
              { text: '1970年', collapsed: true, items: generateYearItems('1970') },
              { text: '1971年', collapsed: true, items: generateYearItems('1971') },
              { text: '1972年', collapsed: true, items: generateYearItems('1972') },
              { text: '1973年', collapsed: true, items: generateYearItems('1973') },
              { text: '1974年', collapsed: true, items: generateYearItems('1974') },
              { text: '1975年', collapsed: true, items: generateYearItems('1975') },
              { text: '1976年', collapsed: true, items: generateYearItems('1976') }
            ]
          },
          {
            text: '第二纪元：保险驱动',
            collapsed: true,
            items: [
              { text: '1977年', collapsed: true, items: generateYearItems('1977') },
              { text: '1978年', collapsed: true, items: generateYearItems('1978') },
              { text: '1979年', collapsed: true, items: generateYearItems('1979') },
              { text: '1980年', collapsed: true, items: generateYearItems('1980') },
              { text: '1981年', collapsed: true, items: generateYearItems('1981') },
              { text: '1982年', collapsed: true, items: generateYearItems('1982') },
              { text: '1983年', collapsed: true, items: generateYearItems('1983') },
              { text: '1984年', collapsed: true, items: generateYearItems('1984') },
              { text: '1985年', collapsed: true, items: generateYearItems('1985') },
              { text: '1986年', collapsed: true, items: generateYearItems('1986') },
              { text: '1987年', collapsed: true, items: generateYearItems('1987') },
              { text: '1988年', collapsed: true, items: generateYearItems('1988') }
            ]
          },
          {
            text: '第二纪元：帝国扩张',
            collapsed: true,
            items: [
              { text: '1989年', collapsed: true, items: generateYearItems('1989') },
              { text: '1990年', collapsed: true, items: generateYearItems('1990') },
              { text: '1991年', collapsed: true, items: generateYearItems('1991') },
              { text: '1992年', collapsed: true, items: generateYearItems('1992') },
              { text: '1993年', collapsed: true, items: generateYearItems('1993') },
              { text: '1994年', collapsed: true, items: generateYearItems('1994') },
              { text: '1995年', collapsed: true, items: generateYearItems('1995') },
              { text: '1996年', collapsed: true, items: generateYearItems('1996') },
              { text: '1997年', collapsed: true, items: generateYearItems('1997') },
              { text: '1998年', collapsed: true, items: generateYearItems('1998') },
              { text: '1999年', collapsed: true, items: generateYearItems('1999') }
            ]
          },
          {
            text: '第二纪元：周期穿越',
            collapsed: true,
            items: [
              { text: '2000年', collapsed: true, items: generateYearItems('2000') },
              { text: '2001年', collapsed: true, items: generateYearItems('2001') },
              { text: '2002年', collapsed: true, items: generateYearItems('2002') },
              { text: '2003年', collapsed: true, items: generateYearItems('2003') },
              { text: '2004年', collapsed: true, items: generateYearItems('2004') },
              { text: '2005年', collapsed: true, items: generateYearItems('2005') },
              { text: '2006年', collapsed: true, items: generateYearItems('2006') },
              { text: '2007年', collapsed: true, items: generateYearItems('2007') },
              { text: '2008年', collapsed: true, items: generateYearItems('2008') }
            ]
          },
          {
            text: '第二纪元：超级控股',
            collapsed: true,
            items: [
              { text: '2009年', collapsed: true, items: generateYearItems('2009') },
              { text: '2010年', collapsed: true, items: generateYearItems('2010') },
              { text: '2011年', collapsed: true, items: generateYearItems('2011') },
              { text: '2012年', collapsed: true, items: generateYearItems('2012') },
              { text: '2013年', collapsed: true, items: generateYearItems('2013') },
              { text: '2014年', collapsed: true, items: generateYearItems('2014') },
              { text: '2015年', collapsed: true, items: generateYearItems('2015') },
              { text: '2016年', collapsed: true, items: generateYearItems('2016') },
              { text: '2017年', collapsed: true, items: generateYearItems('2017') },
              { text: '2018年', collapsed: true, items: generateYearItems('2018') },
              { text: '2019年', collapsed: true, items: generateYearItems('2019') }
            ]
          },
          {
            text: '第二纪元：传承告别',
            collapsed: false,
            items: [
              { text: '2020年', collapsed: true, items: generateYearItems('2020') },
              { text: '2021年', collapsed: true, items: generateYearItems('2021') },
              { text: '2022年', collapsed: true, items: generateYearItems('2022') },
              { text: '2023年', collapsed: true, items: generateYearItems('2023') },
              { text: '2024年', collapsed: true, items: generateYearItems('2024') },
              { text: '2025年', collapsed: true, items: generateYearItems('2025') }
            ]
          }
        ]
      },
      
      // 主题索引
      {
        text: '🎯 主题索引',
        link: '/02_concepts/',
        collapsed: true,
        items: [
          { text: '资本配置', link: '/02_concepts/capital-allocation' },
          { text: '能力圈', link: '/02_concepts/circle-of-competence' },
          { text: '复利', link: '/02_concepts/compounding' },
          { text: '逆向思维', link: '/02_concepts/contrarian' },
          { text: '保险浮存金', link: '/02_concepts/insurance-float' },
          { text: '内在价值', link: '/02_concepts/intrinsic-value' },
          { text: '长期主义', link: '/02_concepts/long-term' },
          { text: '管理层选择', link: '/02_concepts/management' },
          { text: '护城河', link: '/02_concepts/moat' },
          { text: '声誉经济', link: '/02_concepts/reputation' },
          { text: '风险', link: '/02_concepts/risk' },
          { text: '安全边际', link: '/02_concepts/safety-margin' },
          { text: '承保纪律', link: '/02_concepts/underwriting-discipline' }
        ]
      },
      
      // 公司档案 - 带二级分类
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
      
      // 人物传记 - 带二级分类
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
      
      // 金句库
      {
        text: '💬 金句库',
        link: '/05_quotes/',
        collapsed: true,
        items: []
      },
      
      // 数据可视化
      {
        text: '📊 数据可视化',
        link: '/06_visualization/',
        collapsed: true,
        items: []
      },
      
      // 扩展阅读
      {
        text: '📖 扩展阅读',
        link: '/07_resources/',
        collapsed: true,
        items: []
      },
      
      // 创作工具
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
