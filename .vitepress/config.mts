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
      { text: '公司库', link: '/03_companies/' },
      { text: '人物库', link: '/04_people/' }
    ],
    
    sidebar: {
      '/01_letters/': [
        {
          text: '原文翻译（1977-1987）',
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
