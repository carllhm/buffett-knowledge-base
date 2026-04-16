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

---

<style>
/* 自定义九宫格容器 */
.custom-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 24px 24px 12px;
  max-width: 1152px;
  margin: 0 auto;
}
/* 自定义卡片 - 左右布局 */
.custom-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: all 0.2s ease;
  text-decoration: none !important;
  color: var(--vp-c-text-1);
}
.custom-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}
.custom-card .icon {
  flex-shrink: 0;
  font-size: 32px;
  width: 40px;
  text-align: center;
  line-height: 40px;
}
.custom-card .content {
  flex: 1;
}
.custom-card .content .title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--vp-c-text-1);
}
.custom-card .content .details {
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
}
/* 二维码区块 - 放在九宫格下方 */
.qrcode-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 8px 24px 24px;
  max-width: 1152px;
  margin: 0 auto;
}
.qrcode-box {
  display: flex;
  gap: 24px;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 12px 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.qrcode-item {
  text-align: center;
}
.qrcode-item img {
  width: 80px;
  height: 80px;
  display: block;
  border-radius: 4px;
}
.qrcode-item p {
  margin: 6px 0 0 0;
  font-size: 12px;
  line-height: 1.4;
}
.qrcode-title {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
/* 底部版权 */
.copyright {
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 0 0 16px;
}
</style>

<!-- 自定义九宫格卡片 -->
<div class="custom-grid">
  <a href="/01_letters/" class="custom-card">
    <div class="icon">📖</div>
    <div class="content">
      <h3 class="title">原文翻译</h3>
      <p class="details">70年完整翻译（1956-2025）</p>
    </div>
  </a>
  <a href="/01_letters/1977年/思维导图.html" class="custom-card">
    <div class="icon">🧠</div>
    <div class="content">
      <h3 class="title">思维导图</h3>
      <p class="details">70年两级折叠导图</p>
    </div>
  </a>
  <a href="/01_letters/1989年/核心总结.html" class="custom-card">
    <div class="icon">📝</div>
    <div class="content">
      <h3 class="title">核心总结</h3>
      <p class="details">70年年度精华梳理</p>
    </div>
  </a>
  <a href="/02_concepts/" class="custom-card">
    <div class="icon">🧩</div>
    <div class="content">
      <h3 class="title">主题索引</h3>
      <p class="details">25个核心投资概念</p>
    </div>
  </a>
  <a href="/03_companies/" class="custom-card">
    <div class="icon">🏢</div>
    <div class="content">
      <h3 class="title">公司档案</h3>
      <p class="details">35家经典投资案例</p>
    </div>
  </a>
  <a href="/04_people/" class="custom-card">
    <div class="icon">👤</div>
    <div class="content">
      <h3 class="title">人物传记</h3>
      <p class="details">77位核心人物全收录</p>
    </div>
  </a>
  <a href="/05_quotes/" class="custom-card">
    <div class="icon">💬</div>
    <div class="content">
      <h3 class="title">金句库</h3>
      <p class="details">70年经典语录分类</p>
    </div>
  </a>
  <a href="/06_visualization/" class="custom-card">
    <div class="icon">📈</div>
    <div class="content">
      <h3 class="title">数据可视化</h3>
      <p class="details">6大维度图表分析</p>
    </div>
  </a>
  <a href="/07_resources/" class="custom-card">
    <div class="icon">📚</div>
    <div class="content">
      <h3 class="title">拓展阅读</h3>
      <p class="details">演讲访谈纪录片汇总</p>
    </div>
  </a>
</div>

<!-- 二维码区块 - 放在九宫格下方 -->
<div class="qrcode-section">
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

<div class="copyright">本站内容免费分享，欢迎传播</div>