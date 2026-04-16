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
/* 父容器设置相对定位，用于二维码绝对定位 */
.home-container {
  position: relative;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}
/* 压缩首页间距，实现一屏展示 */
.home .hero {
  padding-top: 24px !important;
  padding-bottom: 12px !important;
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
/* 二维码区块 - 绝对定位到右上角 */
.qrcode-section {
  position: absolute;
  top: 24px; /* 与hero的padding-top一致，和标题上沿对齐 */
  right: 0; /* 与九宫格右边缘、标题右边缘对齐 */
  text-align: center;
}
.qrcode-box {
  display: flex;
  gap: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 4px;
}
.qrcode-item {
  text-align: center;
}
.qrcode-item img {
  width: 70px;
  height: 70px;
  display: block;
  border-radius: 4px;
}
.qrcode-item p {
  margin: 4px 0 0 0;
  font-size: 11px;
  line-height: 1.2;
}
.qrcode-title {
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-align: center;
}
/* 自定义九宫格容器 - 上方留足够空间，完全不重合 */
.custom-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding-top: 130px; /* 增加到130px，完全避开二维码高度，不重合 */
  padding-bottom: 12px;
}
/* 自定义卡片 - 左右布局：左边图标+标题，右边描述 */
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
/* 隐藏关于我们标题 */
.home-container h2 {
  display: none;
}
/* 底部版权 */
.copyright {
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 8px 0 12px;
}
</style>

<div class="home-container">
  <!-- 二维码区块：右上角，顶端和标题上沿对齐，右边和九宫格对齐 -->
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

  <!-- 自定义九宫格卡片 - 左右布局 -->
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

  <div class="copyright">本站内容免费分享，欢迎传播</div>
</div>
