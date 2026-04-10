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
      { text: '原文翻译', link: '/01_letters/' },
      { text: '主题索引', link: '/02_concepts/' },
      { text: '公司库', link: '/03_companies/' },
      { text: '人物库', link: '/04_people/' }
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
            { text: 'GEICO', link: '/03_companies/GEICO' },
            { text: '喜诗糖果', link: '/03_companies/喜诗糖果' },
            { text: '内布拉斯加家具城', link: '/03_companies/内布拉斯加家具城' },
            { text: '伯克希尔哈撒韦', link: '/03_companies/伯克希尔哈撒韦' },
            { text: '华盛顿邮报', link: '/03_companies/华盛顿邮报' },
            { text: '首都城市ABC', link: '/03_companies/首都城市ABC' },
            { text: '水牛城新闻', link: '/03_companies/水牛城新闻' },
            { text: '国家赔偿公司', link: '/03_companies/国家赔偿公司' },
            { text: '蓝筹印花', link: '/03_companies/蓝筹印花' },
            { text: 'Scott & Fetzer', link: '/03_companies/Scott_Fetzer' },
            { text: '所罗门兄弟', link: '/03_companies/所罗门兄弟' },
            { text: 'Fechheimer Bros.', link: '/03_companies/Fechheimer_Bros' },
            { text: 'BNSF铁路', link: '/03_companies/BNSF铁路' },
            { text: 'ISCAR-IMC', link: '/03_companies/ISCAR-IMC' },
            { text: 'Marmon集团', link: '/03_companies/Marmon集团' },
            { text: 'McLanes麦克莱恩', link: '/03_companies/McLanes麦克莱恩' },
            { text: '中美能源', link: '/03_companies/中美能源' },
            { text: '克莱顿家园', link: '/03_companies/克莱顿家园' },
            { text: '比亚迪', link: '/03_companies/比亚迪' },
            { text: '美国银行', link: '/03_companies/美国银行' },
            { text: '苹果公司', link: '/03_companies/苹果公司' },
            { text: '雪佛龙', link: '/03_companies/雪佛龙' }
          ]
        }
      ],
      
      '/04_people/': [
        {
          text: '人物库',
          items: [
            { text: '沃伦·巴菲特', link: '/04_people/沃伦·巴菲特' },
            { text: '查理·芒格', link: '/04_people/查理·芒格' },
            { text: 'B夫人', link: '/04_people/B夫人' },
            { text: '本·格雷厄姆', link: '/04_people/本·格雷厄姆' },
            { text: '杰克·伯恩', link: '/04_people/杰克·伯恩' },
            { text: '菲尔·利切', link: '/04_people/菲尔·利切' },
            { text: 'Chuck Huggins', link: '/04_people/Chuck_Huggins' },
            { text: 'Tom Murphy', link: '/04_people/Tom_Murphy' },
            { text: '卢·辛普森', link: '/04_people/卢·辛普森' },
            { text: '斯坦·利普西', link: '/04_people/斯坦·利普西' },
            { text: '吉恩·阿贝格', link: '/04_people/吉恩·阿贝格' },
            { text: '本·罗斯纳', link: '/04_people/本·罗斯纳' },
            { text: '查理·芒格（继承者）', link: '/04_people/查理·芒格' },
            { text: '格雷迪·罗西尔', link: '/04_people/格雷迪·罗西尔' },
            { text: '皮特·利格尔', link: '/04_people/皮特·利格尔' },
            { text: '阿吉特·贾恩', link: '/04_people/阿吉特·贾恩' },
            { text: '雅各布·哈帕兹', link: '/04_people/雅各布·哈帕兹' },
            { text: '凯文·克林顿', link: '/04_people/凯文·克林顿' },
            { text: '埃坦·韦特海默', link: '/04_people/埃坦·韦特海默' },
            { text: '弗兰克·普塔克', link: '/04_people/弗兰克·普塔克' }
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
