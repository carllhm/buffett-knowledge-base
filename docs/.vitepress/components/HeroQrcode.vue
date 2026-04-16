<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  // 把二维码插入到 hero 的 container 中，放在 .main 后面
  const heroContainer = document.querySelector('.VPHero .container')
  const heroMain = document.querySelector('.VPHero .main')
  if (heroContainer && heroMain) {
    // 找到 .main 后面的空注释节点，在那里插入
    const placeholder = heroContainer.querySelector(':scope > :last-child')
    const qrcodeEl = document.createElement('div')
    qrcodeEl.className = 'vp-hero-qrcode'
    qrcodeEl.innerHTML = `
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
    `
    heroContainer.insertBefore(qrcodeEl, placeholder)
  }
})
</script>

<style scoped>
.vp-hero-qrcode {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 4px;
  flex: 0 0 auto;
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
</style>