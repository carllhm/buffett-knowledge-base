import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '巴菲特致股东信知识库',
  description: '中文世界最系统的巴菲特股东信知识库',
  
  // 忽略所有死链接（函数形式）
  ignoreDeadLinks: (link) => {
    return true
  },
  
  cleanUrls: true,
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '全年股东信', link: '/01_letters/' },
      { text: '主题索引', link: '/02_concepts/' },
      { text: '公司档案', link: '/03_companies/' },
      { text: '人物传记', link: '/04_people/' },
      { text: '金句库', link: '/05_quotes/' },
      { text: '数据可视化', link: '/06_visualization/' },
      { text: '扩展阅读', link: '/07_resources/' }
    ],
    
    sidebar: {
      '/01_letters/': [
        {
          text: '合伙基金时期（1956-1969）',
          collapsed: true,
          items: [
            { text: '1956年', link: '/01_letters/1956年/翻译' },
            { text: '1957年', link: '/01_letters/1957年/翻译' },
            { text: '1958年', link: '/01_letters/1958年/翻译' },
            { text: '1959年', link: '/01_letters/1959年/翻译' },
            { text: '1960年', link: '/01_letters/1960年/翻译' },
            { text: '1961年', link: '/01_letters/1961年/翻译' },
            { text: '1962年', link: '/01_letters/1962年/翻译' },
            { text: '1963年', link: '/01_letters/1963年/翻译' },
            { text: '1964年', link: '/01_letters/1964年/翻译' },
            { text: '1965年', link: '/01_letters/1965年/翻译' },
            { text: '1966年', link: '/01_letters/1966年/翻译' },
            { text: '1967年', link: '/01_letters/1967年/翻译' },
            { text: '1968年', link: '/01_letters/1968年/翻译' },
            { text: '1969年', link: '/01_letters/1969年/翻译' }
          ]
        },
        {
          text: '转型期（1970-1976）',
          collapsed: true,
          items: [
            { text: '1970年', link: '/01_letters/1970年/翻译' },
            { text: '1971年', link: '/01_letters/1971年/翻译' },
            { text: '1972年', link: '/01_letters/1972年/翻译' },
            { text: '1973年', link: '/01_letters/1973年/翻译' },
            { text: '1974年', link: '/01_letters/1974年/翻译' },
            { text: '1975年', link: '/01_letters/1975年/翻译' },
            { text: '1976年', link: '/01_letters/1976年/翻译' }
          ]
        },
        {
          text: '伯克希尔时期（1977-1987）',
          collapsed: false,
          items: [
            { text: '1977年', link: '/01_letters/1977年/翻译' },
            { text: '1978年', link: '/01_letters/1978年/翻译' },
            { text: '1979年', link: '/01_letters/1979年/翻译' },
            { text: '1980年', link: '/01_letters/1980年/翻译' },
            { text: '1981年', link: '/01_letters/1981年/翻译' },
            { text: '1982年', link: '/01_letters/1982年/翻译' },
            { text: '1983年', link: '/01_letters/1983年/翻译' },
            { text: '1984年', link: '/01_letters/1984年/翻译' },
            { text: '1985年', link: '/01_letters/1985年/翻译' },
            { text: '1986年', link: '/01_letters/1986年/翻译' },
            { text: '1987年', link: '/01_letters/1987年/翻译' }
          ]
        },
        {
          text: '保险帝国扩张期（1988-1997）',
          collapsed: true,
          items: [
            { text: '1988年', link: '/01_letters/1988年/翻译' },
            { text: '1989年', link: '/01_letters/1989年/翻译' },
            { text: '1990年', link: '/01_letters/1990年/翻译' },
            { text: '1991年', link: '/01_letters/1991年/翻译' },
            { text: '1992年', link: '/01_letters/1992年/翻译' },
            { text: '1993年', link: '/01_letters/1993年/翻译' },
            { text: '1994年', link: '/01_letters/1994年/翻译' },
            { text: '1995年', link: '/01_letters/1995年/翻译' },
            { text: '1996年', link: '/01_letters/1996年/翻译' },
            { text: '1997年', link: '/01_letters/1997年/翻译' }
          ]
        },
        {
          text: '科技股泡沫与危机（1998-2009）',
          collapsed: true,
          items: [
            { text: '1998年', link: '/01_letters/1998年/翻译' },
            { text: '1999年', link: '/01_letters/1999年/翻译' },
            { text: '2000年', link: '/01_letters/2000年/翻译' },
            { text: '2001年', link: '/01_letters/2001年/翻译' },
            { text: '2002年', link: '/01_letters/2002年/翻译' },
            { text: '2003年', link: '/01_letters/2003年/翻译' },
            { text: '2004年', link: '/01_letters/2004年/翻译' },
            { text: '2005年', link: '/01_letters/2005年/翻译' },
            { text: '2006年', link: '/01_letters/2006年/翻译' },
            { text: '2007年', link: '/01_letters/2007年/翻译' },
            { text: '2008年', link: '/01_letters/2008年/翻译' },
            { text: '2009年', link: '/01_letters/2009年/翻译' }
          ]
        },
        {
          text: '后危机时代（2010-2025）',
          collapsed: true,
          items: [
            { text: '2010年', link: '/01_letters/2010年/翻译' },
            { text: '2011年', link: '/01_letters/2011年/翻译' },
            { text: '2012年', link: '/01_letters/2012年/翻译' },
            { text: '2013年', link: '/01_letters/2013年/翻译' },
            { text: '2014年', link: '/01_letters/2014年/翻译' },
            { text: '2015年', link: '/01_letters/2015年/翻译' },
            { text: '2016年', link: '/01_letters/2016年/翻译' },
            { text: '2017年', link: '/01_letters/2017年/翻译' },
            { text: '2018年', link: '/01_letters/2018年/翻译' },
            { text: '2019年', link: '/01_letters/2019年/翻译' },
            { text: '2020年', link: '/01_letters/2020年/翻译' },
            { text: '2021年', link: '/01_letters/2021年/翻译' },
            { text: '2022年', link: '/01_letters/2022年/翻译' },
            { text: '2023年', link: '/01_letters/2023年/翻译' },
            { text: '2024年', link: '/01_letters/2024年/翻译' },
            { text: '2025年', link: '/01_letters/2025年/翻译' }
          ]
        }
      ],
      
      '/02_concepts/': [
        {
          text: '投资哲学',
          items: [
            { text: '内在价值', link: '/02_concepts/intrinsic-value' },
            { text: '护城河', link: '/02_concepts/moat' },
            { text: '安全边际', link: '/02_concepts/safety-margin' },
            { text: '复利', link: '/02_concepts/compounding' },
            { text: '长期主义', link: '/02_concepts/long-term' },
            { text: '能力圈', link: '/02_concepts/circle-of-competence' }
          ]
        },
        {
          text: '业务分析',
          items: [
            { text: '保险浮存金', link: '/02_concepts/insurance-float' },
            { text: '承保纪律', link: '/02_concepts/underwriting-discipline' },
            { text: '资本配置', link: '/02_concepts/capital-allocation' },
            { text: '风险控制', link: '/02_concepts/risk' }
          ]
        },
        {
          text: '人生智慧',
          items: [
            { text: '逆向思维', link: '/02_concepts/contrarian' },
            { text: '声誉经济', link: '/02_concepts/reputation' },
            { text: '管理层选择', link: '/02_concepts/management' }
          ]
        }
      ],
      
      '/03_companies/': [
        {
          text: '公司库',
          items: [
            { text: 'BNSF铁路', link: '/03_companies/BNSF铁路' },
            { text: 'Fechheimer Bros.', link: '/03_companies/Fechheimer_Bros' },
            { text: 'Forest River', link: '/03_companies/Forest River' },
            { text: 'GEICO', link: '/03_companies/GEICO' },
            { text: 'IBM', link: '/03_companies/IBM' },
            { text: 'ISCAR-IMC', link: '/03_companies/ISCAR-IMC' },
            { text: 'Marmon集团', link: '/03_companies/Marmon集团' },
            { text: 'McLanes麦克莱恩', link: '/03_companies/McLanes麦克莱恩' },
            { text: 'Scott Fetzer', link: '/03_companies/Scott_Fetzer' },
            { text: '中美能源', link: '/03_companies/中美能源' },
            { text: '伊利诺伊国民银行', link: '/03_companies/伊利诺伊国民银行' },
            { text: '伯克希尔哈撒韦', link: '/03_companies/伯克希尔哈撒韦' },
            { text: '健力士', link: '/03_companies/健力士' },
            { text: '克莱顿家园', link: '/03_companies/克莱顿家园' },
            { text: '内布拉斯加家具城', link: '/03_companies/内布拉斯加家具城' },
            { text: '冠军国际纸业', link: '/03_companies/冠军国际纸业' },
            { text: '华盛顿邮报', link: '/03_companies/华盛顿邮报' },
            { text: '可口可乐', link: '/03_companies/可口可乐' },
            { text: '喜诗糖果', link: '/03_companies/喜诗糖果' },
            { text: '国家赔偿公司', link: '/03_companies/国家赔偿公司' },
            { text: '富国银行', link: '/03_companies/富国银行' },
            { text: '所罗门兄弟', link: '/03_companies/所罗门兄弟' },
            { text: '比亚迪', link: '/03_companies/比亚迪' },
            { text: '水牛城新闻', link: '/03_companies/水牛城新闻' },
            { text: '美国运通', link: '/03_companies/美国运通' },
            { text: '美国银行', link: '/03_companies/美国银行' },
            { text: '联合零售商店', link: '/03_companies/联合零售商店' },
            { text: '苹果公司', link: '/03_companies/苹果公司' },
            { text: '蓝筹印花', link: '/03_companies/蓝筹印花' },
            { text: '迪士尼', link: '/03_companies/迪士尼' },
            { text: '通用再保险', link: '/03_companies/通用再保险' },
            { text: '雪佛龙', link: '/03_companies/雪佛龙' },
            { text: '首都城市ABC', link: '/03_companies/首都城市ABC' },
            { text: '麦当劳', link: '/03_companies/麦当劳' }
          ]
        }
      ],
      
      '/04_people/': [
        {
          text: '人物库',
          items: [
            { text: 'B夫人', link: '/04_people/B夫人' },
            { text: 'Chuck Huggins', link: '/04_people/Chuck_Huggins' },
            { text: 'Tom Murphy', link: '/04_people/Tom_Murphy' },
            { text: 'Ron Ferguson', link: '/04_people/ron_ferguson' },
            { text: '丹·伯克', link: '/04_people/丹·伯克' },
            { text: '保罗·黑曾', link: '/04_people/保罗·黑曾' },
            { text: '凯·格雷厄姆', link: '/04_people/凯·格雷厄姆' },
            { text: '凯文·克莱顿', link: '/04_people/凯文·克莱顿' },
            { text: '卡尔·赖查特', link: '/04_people/卡尔·赖查特' },
            { text: '卢·辛普森', link: '/04_people/卢·辛普森' },
            { text: '吉姆·伊斯勒', link: '/04_people/吉姆·伊斯勒' },
            { text: '吉恩·阿贝格', link: '/04_people/吉恩·阿贝格' },
            { text: '哈罗德·阿尔方德', link: '/04_people/哈罗德·阿尔方德' },
            { text: '唐·库赫', link: '/04_people/唐·库赫' },
            { text: '唐·霍华德', link: '/04_people/唐·霍华德' },
            { text: '埃坦·韦特海默', link: '/04_people/埃坦·韦特海默' },
            { text: '塞思·斯科菲尔德', link: '/04_people/塞思·斯科菲尔德' },
            { text: '大卫·索科尔', link: '/04_people/大卫·索科尔' },
            { text: '大卫·马克斯韦尔', link: '/04_people/大卫·马克斯韦尔' },
            { text: '小巴内特·赫尔兹伯格', link: '/04_people/小巴内特·赫尔兹伯格' },
            { text: '巴里·塔特尔曼', link: '/04_people/巴里·塔特尔曼' },
            { text: '弗兰克·奥尔森', link: '/04_people/弗兰克·奥尔森' },
            { text: '弗兰克·普塔克', link: '/04_people/弗兰克·普塔克' },
            { text: '弗兰克·鲁尼', link: '/04_people/弗兰克·鲁尼' },
            { text: '彼得·伦德', link: '/04_people/彼得·伦德' },
            { text: '德里克·莫恩', link: '/04_people/德里克·莫恩' },
            { text: '托尼·尼斯利', link: '/04_people/托尼·尼斯利' },
            { text: '托德·康姆斯', link: '/04_people/托德·康姆斯' },
            { text: '拉尔夫·谢伊', link: '/04_people/拉尔夫·谢伊' },
            { text: '斯坦·利普西', link: '/04_people/斯坦·利普西' },
            { text: '本·格雷厄姆', link: '/04_people/本·格雷厄姆' },
            { text: '本·罗斯纳', link: '/04_people/本·罗斯纳' },
            { text: '杰克·伯恩', link: '/04_people/杰克·伯恩' },
            { text: '杰克·林格沃尔特', link: '/04_people/杰克·林格沃尔特' },
            { text: '杰夫·科门特', link: '/04_people/杰夫·科门特' },
            { text: '查理·芒格', link: '/04_people/查理·芒格' },
            { text: '格雷格·阿贝尔', link: '/04_people/格雷格·阿贝尔' },
            { text: '格雷迪·罗西尔', link: '/04_people/格雷迪·罗西尔' },
            { text: '梅尔文·沃尔夫', link: '/04_people/梅尔文·沃尔夫' },
            { text: '比尔·凯泽', link: '/04_people/比尔·凯泽' },
            { text: '比尔·安德斯', link: '/04_people/比尔·安德斯' },
            { text: '比尔·斯奈德', link: '/04_people/比尔·斯奈德' },
            { text: '比尔·蔡尔德', link: '/04_people/比尔·蔡尔德' },
            { text: '沃伦·巴菲特', link: '/04_people/沃伦·巴菲特' },
            { text: '沃尔特·斯科特', link: '/04_people/沃尔特·斯科特' },
            { text: '洛伊默·戴维森', link: '/04_people/洛伊默·戴维森' },
            { text: '特德·韦斯勒', link: '/04_people/特德·韦斯勒' },
            { text: '理查德·瑟斯', link: '/04_people/理查德·瑟斯' },
            { text: '皮特·利格尔', link: '/04_people/皮特·利格尔' },
            { text: '科尔曼·莫格勒', link: '/04_people/科尔曼·莫格勒' },
            { text: '约翰·古尔特弗里德', link: '/04_people/约翰·古尔特弗里德' },
            { text: '约翰·穆蒂', link: '/04_people/约翰·穆蒂' },
            { text: '约翰·麦克法兰', link: '/04_people/约翰·麦克法兰' },
            { text: '罗伊·丁斯代尔', link: '/04_people/罗伊·丁斯代尔' },
            { text: '罗伯托·戈伊苏埃塔', link: '/04_people/罗伯托·戈伊苏埃塔' },
            { text: '罗恩·奥尔森', link: '/04_people/罗恩·奥尔森' },
            { text: '罗恩·弗格森', link: '/04_people/罗恩·弗格森' },
            { text: '罗恩·欧文', link: '/04_people/罗恩·欧文' },
            { text: '艾伦·弗里德曼', link: '/04_people/艾伦·弗里德曼' },
            { text: '艾克·弗里德曼', link: '/04_people/艾克·弗里德曼' },
            { text: '艾略特·塔特尔曼', link: '/04_people/艾略特·塔特尔曼' },
            { text: '苏珊·雅克', link: '/04_people/苏珊·雅克' },
            { text: '菲尔·利切', link: '/04_people/菲尔·利切' },
            { text: '谢尔顿·蔡尔德', link: '/04_people/谢尔顿·蔡尔德' },
            { text: '赫尔德曼家族', link: '/04_people/赫尔德曼家族' },
            { text: '路易·布鲁姆金', link: '/04_people/路易·布鲁姆金' },
            { text: '迈克·戈德堡', link: '/04_people/迈克·戈德堡' },
            { text: '迈克·沙利文', link: '/04_people/迈克·沙利文' },
            { text: '迪克·西蒙斯', link: '/04_people/迪克·西蒙斯' },
            { text: '迪诺斯·约达努', link: '/04_people/迪诺斯·约达努' },
            { text: '里奇·桑图利', link: '/04_people/里奇·桑图利' },
            { text: '阿吉特·贾恩', link: '/04_people/阿吉特·贾恩' },
            { text: '阿尔·乌尔奇', link: '/04_people/阿尔·乌尔奇' },
            { text: '雅各布·哈帕兹', link: '/04_people/雅各布·哈帕兹' },
            { text: '雪莉·图米姆', link: '/04_people/雪莉·图米姆' },
            { text: '鲍勃·德纳姆', link: '/04_people/鲍勃·德纳姆' },
            { text: '默里·莱特', link: '/04_people/默里·莱特' }
          ]
        }
      ]
    },
    
    search: {
      provider: 'local'
    },
    
    footer: {
      message: '巴菲特致股东信知识库 - 免费分享',
      copyright: 'Copyright © 2026'
    }
  }
})
