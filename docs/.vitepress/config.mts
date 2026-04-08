import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: '巴菲特致股东信知识库',
  description: '中文世界最系统的巴菲特股东信知识库（1956-2025）',
  
  ignoreDeadLinks: true,
  // cleanUrls: true, // 已禁用，避免Cloudflare Pages 404问题
  
  mermaid: {
    // Mermaid配置
  },
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '70年导读', link: '/00_index/巴菲特致股东信70年导读' },
      { text: '阅读导航', link: '/00_index/reading-guide' },
      { text: '原文翻译', link: '/01_letters/' },
      { text: '主题索引', link: '/02_concepts/' },
      { text: '公司库', link: '/03_companies/' },
      { text: '人物库', link: '/04_people/' },
      { text: '金句库', link: '/05_quotes/' },
      { text: '数据可视化', link: '/06_visualization/' },
      { text: '扩展阅读', link: '/07_resources/' },
      { text: '创作工具', link: '/08_tools/' }
    ],
    
    sidebar: {
      '/00_index/': [
        { text: '阅读导航', link: '/00_index/reading-guide' }
      ],
      
      '/01_letters/': [
        {
          text: '第一纪元：合伙人信纪元（1956-1969）',
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
          text: '第二纪元：早期探索期（1970-1976）',
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
          text: '第二纪元：保险驱动期（1977-1988）',
          collapsed: true,
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
            { text: '1987年', link: '/01_letters/1987年/翻译' },
            { text: '1988年', link: '/01_letters/1988年/翻译' }
          ]
        },
        {
          text: '第二纪元：帝国扩张期（1989-1999）',
          collapsed: true,
          items: [
            { text: '1989年', link: '/01_letters/1989年/翻译' },
            { text: '1990年', link: '/01_letters/1990年/翻译' },
            { text: '1991年', link: '/01_letters/1991年/翻译' },
            { text: '1992年', link: '/01_letters/1992年/翻译' },
            { text: '1993年', link: '/01_letters/1993年/翻译' },
            { text: '1994年', link: '/01_letters/1994年/翻译' },
            { text: '1995年', link: '/01_letters/1995年/翻译' },
            { text: '1996年', link: '/01_letters/1996年/翻译' },
            { text: '1997年', link: '/01_letters/1997年/翻译' },
            { text: '1998年', link: '/01_letters/1998年/翻译' },
            { text: '1999年', link: '/01_letters/1999年/翻译' }
          ]
        },
        {
          text: '第二纪元：周期穿越期（2000-2008）',
          collapsed: true,
          items: [
            { text: '2000年', link: '/01_letters/2000年/翻译' },
            { text: '2001年', link: '/01_letters/2001年/翻译' },
            { text: '2002年', link: '/01_letters/2002年/翻译' },
            { text: '2003年', link: '/01_letters/2003年/翻译' },
            { text: '2004年', link: '/01_letters/2004年/翻译' },
            { text: '2005年', link: '/01_letters/2005年/翻译' },
            { text: '2006年', link: '/01_letters/2006年/翻译' },
            { text: '2007年', link: '/01_letters/2007年/翻译' },
            { text: '2008年', link: '/01_letters/2008年/翻译' }
          ]
        },
        {
          text: '第二纪元：超级控股期（2009-2019）',
          collapsed: true,
          items: [
            { text: '2009年', link: '/01_letters/2009年/翻译' },
            { text: '2010年', link: '/01_letters/2010年/翻译' },
            { text: '2011年', link: '/01_letters/2011年/翻译' },
            { text: '2012年', link: '/01_letters/2012年/翻译' },
            { text: '2013年', link: '/01_letters/2013年/翻译' },
            { text: '2014年', link: '/01_letters/2014年/翻译' },
            { text: '2015年', link: '/01_letters/2015年/翻译' },
            { text: '2016年', link: '/01_letters/2016年/翻译' },
            { text: '2017年', link: '/01_letters/2017年/翻译' },
            { text: '2018年', link: '/01_letters/2018年/翻译' },
            { text: '2019年', link: '/01_letters/2019年/翻译' }
          ]
        },
        {
          text: '第二纪元：传承与告别期（2020-2025）',
          collapsed: false,
          items: [
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
        { text: '主题索引', link: '/02_concepts/' }
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
            { text: 'Fechheimer Bros.', link: '/03_companies/Fechheimer_Bros' }
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
            { text: '本·罗斯纳', link: '/04_people/本·罗斯纳' }
          ]
        }
      ],
      
      '/05_quotes/': [
        { text: '金句库', link: '/05_quotes/' }
      ],
      
      '/06_visualization/': [
        { text: '数据可视化', link: '/06_visualization/' }
      ],
      
      '/07_resources/': [
        { text: '扩展阅读', link: '/07_resources/' }
      ],
      
      '/08_tools/': [
        { text: '创作工具', link: '/08_tools/' }
      ]
    },
    
    search: {
      provider: 'local'
    },
    
    footer: {
      message: '巴菲特致股东信知识库（1956-2025）- 免费分享',
      copyright: 'Copyright © 2026'
    }
  }
}))
