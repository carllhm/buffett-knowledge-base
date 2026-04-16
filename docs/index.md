---
layout: home
aside: false

hero:
  name: "巴菲特致股东信知识库"
  text: ""
  tagline: "70年投资智慧 · 系统学习巴菲特"
  actions:
    - theme: brand
      text: 📖 70年导读
      link: /00_index/巴菲特致股东信70年导读
    - theme: alt
      text: 🧭 阅读导航
      link: /00_index/reading-guide

features:
  - icon: 📖
    title: 原文翻译
    details: 70年完整翻译（1956-2025）
    link: /01_letters/
  - icon: 🧠
    title: 思维导图
    details: 70年两级折叠导图
    link: /01_letters/1977年/思维导图.html
  - icon: 📝
    title: 核心总结
    details: 70年年度精华梳理
    link: /01_letters/1989年/核心总结.html
  - icon: 🧩
    title: 主题索引
    details: 25个核心投资概念
    link: /02_concepts/
  - icon: 🏢
    title: 公司档案
    details: 35家经典投资案例
    link: /03_companies/
  - icon: 👤
    title: 人物传记
    details: 77位核心人物全收录
    link: /04_people/
  - icon: 💬
    title: 金句库
    details: 70年经典语录分类
    link: /05_quotes/
  - icon: 📈
    title: 数据可视化
    details: 6大维度图表分析
    link: /06_visualization/
  - icon: 📚
    title: 拓展阅读
    details: 演讲访谈纪录片汇总
    link: /07_resources/
---

<style>
/* 压缩首页间距，实现一屏展示 */
.home .hero {
  padding-top: 24px !important;
  padding-bottom: 12px !important;
  padding-right: 200px !important; /* 给右上角二维码留出空间 */
}
.home .hero .name {
  font-size: 28px !important;
  line-height: 1.2 !important;
  margin-bottom: 4px !important;
}
.home .hero .tagline {
  font-size: 16px !important;
  margin-bottom: 16px !important;
}
.home .features {
  padding-top: 12px !important;
  padding-bottom: 12px !important;
  padding-right: 200px !important; /* 给右上角二维码留出空间 */
}
.home .features .feature {
  padding: 12px 16px !important;
}
.home .features .feature .title {
  font-size: 15px !important;
  margin-bottom: 4px !important;
}
.home .features .feature .details {
  font-size: 13px !important;
  line-height: 1.4 !important;
}
/* 九宫格卡片改为左右布局：左边图标+标题，右边描述 */
.home .features .feature {
  display: flex !important;
  align-items: center !important;
  text-align: left !important;
  gap: 12px !important;
}
.home .features .feature .icon {
  flex-shrink: 0;
  margin: 0 !important;
  font-size: 28px !important;
}
.home .features .feature .content {
  flex: 1;
}
/* 隐藏关于我们标题 */
.home-container h2 {
  display: none;
}
/* 右上角固定二维码 */
.qrcode-float {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 100;
  text-align: center;
}
.qrcode-box {
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 6px;
}
.qrcode-item {
  text-align: center;
  background: var(--vp-c-bg-soft);
  padding: 6px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.qrcode-item img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}
.qrcode-item p {
  margin: 2px 0 0;
  font-size: 10px;
  line-height: 1.2;
}
.qrcode-float .qrcode-title {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
/* 底部版权 */
.copyright {
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 8px 0 12px;
  padding-right: 200px;
}
.home-container p.intro {
  margin: 8px 0 !important;
  padding-right: 200px;
  font-size: 14px;
  text-align: left;
}
</style>

<!-- 右上角浮动二维码 -->
<div class="qrcode-float">
  <div class="qrcode-box">
    <div class="qrcode-item">
      <img src="/images/公众号二维码.jpg" alt="公众号">
      <p><strong>公众号</strong><br>慢慢变富的卡尔</p>
    </div>
    <div class="qrcode-item">
      <img src="/images/视频号二维码.jpg" alt="视频号">
      <p><strong>视频号</strong><br>慢慢变富的卡尔</p>
    </div>
  </div>
  <div class="qrcode-title">关注我，一起学习投资大师</div>
</div>

<p class="intro"><strong>我是卡尔，「慢慢变富的卡尔」主理人。</strong>做这个知识库，倒逼自己系统化学习，也分享给同道中人，一起慢慢变富。</p>

<div class="copyright">本站内容免费分享，欢迎传播</div>
