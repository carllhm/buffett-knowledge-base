<template>
  <div class="kg-wrapper">
    <!-- 顶部工具栏 -->
    <div class="kg-toolbar">
      <div class="kg-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input v-model="searchQuery" placeholder="搜索知识库..." @input="onSearch" />
        <span v-if="searchQuery" class="kg-search-clear" @click="clearSearch">✕</span>
      </div>
      <div class="kg-filters">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['kg-filter-btn', { active: activeCategories.includes(cat.id) }]"
          :style="activeCategories.includes(cat.id) ? { background: cat.color + '33', borderColor: cat.color, color: cat.color } : {}"
          @click="toggleCategory(cat.id)"
        >
          <span class="kg-filter-dot" :style="{ background: cat.color }"></span>
          {{ cat.label }}
        </button>
      </div>
      <div class="kg-actions">
        <button class="kg-btn" @click="resetView" title="重置视图">⟳ 重置</button>
        <button class="kg-btn" @click="toggleFullscreen" title="全屏">⛶ 全屏</button>
      </div>
    </div>

    <!-- 图谱画布 -->
    <div ref="graphEl" class="kg-canvas" :class="{ fullscreen: isFullscreen }">
      <svg ref="svgEl" class="kg-svg">
        <defs>
          <filter id="glow-blue"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glow-green"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glow-gold"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glow-purple"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glow-red"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glow-cyan"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glow-selected"><feGaussianBlur stdDeviation="10" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <marker id="arrow" viewBox="0 -5 10 10" refX="25" refY="0" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,-5L10,0L0,5" fill="#475569"/></marker>
          <marker id="arrow-highlight" viewBox="0 -5 10 10" refX="25" refY="0" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,-5L10,0L0,5" fill="#fbbf24"/></marker>
        </defs>
        <g ref="gEl"></g>
      </svg>

      <!-- 节点详情面板 -->
      <transition name="slide">
        <div v-if="selectedNode" class="kg-detail">
          <div class="kg-detail-header" :style="{ borderColor: getCategoryColor(selectedNode.category) }">
            <span class="kg-detail-tag" :style="{ background: getCategoryColor(selectedNode.category) + '33', color: getCategoryColor(selectedNode.category) }">
              {{ getCategoryLabel(selectedNode.category) }}
            </span>
            <button class="kg-detail-close" @click="selectedNode = null">✕</button>
          </div>
          <h3 class="kg-detail-title">{{ selectedNode.name }}</h3>
          <p class="kg-detail-desc">{{ selectedNode.description }}</p>
          <div v-if="getConnections(selectedNode.id).length" class="kg-detail-connections">
            <div class="kg-detail-conn-title">关联 ({{ getConnections(selectedNode.id).length }})</div>
            <div class="kg-detail-conn-list">
              <span
                v-for="conn in getConnections(selectedNode.id).slice(0, 8)"
                :key="conn.id"
                class="kg-detail-conn-tag"
                :style="{ borderColor: getCategoryColor(conn.category) }"
                @click="selectNodeById(conn.id)"
              >{{ conn.name }}</span>
              <span v-if="getConnections(selectedNode.id).length > 8" class="kg-detail-more">+{{ getConnections(selectedNode.id).length - 8 }}</span>
            </div>
          </div>
          <a v-if="selectedNode.link" :href="selectedNode.link" class="kg-detail-link">深入阅读 →</a>
        </div>
      </transition>

      <!-- 统计信息 -->
      <div class="kg-stats">
        <span>{{ visibleNodes.length }} 节点</span>
        <span>{{ visibleLinks.length }} 关联</span>
        <span v-if="selectedNode" class="kg-stats-selected">选中: {{ selectedNode.name }}</span>
      </div>

      <!-- 图例说明 -->
      <div class="kg-legend-panel">
        <div class="kg-legend-title">图谱说明</div>
        <div class="kg-legend-item"><span class="kg-legend-dot" style="background:#60a5fa"></span>投资概念</div>
        <div class="kg-legend-item"><span class="kg-legend-dot" style="background:#fbbf24"></span>人物</div>
        <div class="kg-legend-item"><span class="kg-legend-dot" style="background:#34d399"></span>公司</div>
        <div class="kg-legend-item"><span class="kg-legend-dot" style="background:#f87171"></span>年份</div>
        <div class="kg-legend-item"><span class="kg-legend-dot" style="background:#22d3ee"></span>主题分类</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as d3 from 'd3'

// ─── 分类配置 ────────────────────────────────────────────────────────────────

const categories = [
  { id: 'concept',  label: '投资概念', color: '#60a5fa', size: 28 },
  { id: 'person',   label: '人物',     color: '#fbbf24', size: 22 },
  { id: 'company',  label: '公司',     color: '#34d399', size: 24 },
  { id: 'year',     label: '年份',     color: '#f87171', size: 16 },
  { id: 'category', label: '主题分类', color: '#22d3ee', size: 20 },
]

// ─── 概念节点 (25个核心主题) ─────────────────────────────────────────────────

const conceptNodes = [
  { id: 'c-intrinsic', name: '内在价值', description: '企业未来现金流的折现值', link: '/02_concepts/intrinsic-value' },
  { id: 'c-moat', name: '护城河', description: '可持续的竞争优势', link: '/02_concepts/moat' },
  { id: 'c-margin', name: '安全边际', description: '价格低于价值的缓冲', link: '/02_concepts/safety-margin' },
  { id: 'c-compound', name: '复利', description: '时间放大的收益增长', link: '/02_concepts/compounding' },
  { id: 'c-longterm', name: '长期主义', description: '最喜欢的持有期是永远', link: '/02_concepts/long-termism' },
  { id: 'c-circle', name: '能力圈', description: '只投资看得懂的公司', link: '/02_concepts/circle-of-competence' },
  { id: 'c-contrarian', name: '逆向思维', description: '别人恐惧时贪婪', link: '/02_concepts/contrarian-thinking' },
  { id: 'c-float', name: '保险浮存金', description: '先收保费后赔付的无息资金', link: '/02_concepts/insurance-float' },
  { id: 'c-capital', name: '资本配置', description: '将资本投向最高回报处', link: '/02_concepts/capital-allocation' },
  { id: 'c-management', name: '管理层选择', description: '德才兼备的管理者', link: '/02_concepts/management-selection' },
  { id: 'c-reputation', name: '声誉', description: '建立需20年，毁掉5分钟', link: '/02_concepts/reputation' },
  { id: 'c-risk', name: '风险控制', description: '永久损失而非波动', link: '/02_concepts/risk-control' },
  { id: 'c-buyback', name: '股票回购', description: '低于内在价值时回购', link: '/02_concepts/share-buybacks' },
  { id: 'c-underwriting', name: '承保纪律', description: '只为盈利承保', link: '/02_concepts/underwriting-discipline' },
  { id: 'c-deferred', name: '递延税复利', description: '未实现利得递延纳税', link: '/02_concepts/deferred-tax' },
  { id: 'c-lookthrough', name: '透视盈利', description: '留存收益的真实价值', link: '/02_concepts/look-through-earnings' },
  { id: 'c-governance', name: '公司治理', description: '保障股东利益的制度', link: '/02_concepts/corporate-governance' },
  { id: 'c-compensation', name: '高管薪酬', description: '与股东利益一致', link: '/02_concepts/executive-compensation' },
  { id: 'c-mistakes', name: '错误坦诚', description: '公开承认错误', link: '/02_concepts/mistakes' },
  { id: 'c-salomon', name: '所罗门危机', description: '1991年声誉危机', link: '/02_concepts/salomon-crisis' },
  { id: 'c-japan', name: '日本投资', description: '2020年五大商社', link: '/02_concepts/japan-investment' },
  { id: 'c-partnership', name: '合伙基金', description: '1956-1969投资方法', link: '/02_concepts/partnership-method' },
  { id: 'c-diversification', name: '集中投资', description: '多元化vs集中', link: '/02_concepts/diversification' },
  { id: 'c-accounting', name: '真实盈利', description: 'GAAP与真实盈利', link: '/02_concepts/accounting-earnings' },
  { id: 'c-patience', name: '耐心', description: '等待最佳击球机会', link: '/02_concepts/patience' },
].map(n => ({ ...n, category: 'concept', size: 28 }))

// ─── 人物节点 (核心人物) ─────────────────────────────────────────────────────

const personNodes = [
  { id: 'p-buffett', name: '沃伦·巴菲特', description: '伯克希尔董事长兼CEO', link: '/04_people/沃伦·巴菲特' },
  { id: 'p-munger', name: '查理·芒格', description: '伯克希尔副董事长', link: '/04_people/查理·芒格' },
  { id: 'p-graham', name: '本·格雷厄姆', description: '价值投资之父，巴菲特导师', link: '/04_people/本·格雷厄姆' },
  { id: 'p-abel', name: '格雷格·阿贝尔', description: '伯克希尔副董事长，继任者', link: '/04_people/格雷格·阿贝尔' },
  { id: 'p-jain', name: '阿吉特·贾恩', description: '保险业务负责人', link: '/04_people/阿吉特·贾恩' },
  { id: 'p-susie', name: '苏珊·巴菲特', description: '巴菲特第一任妻子', link: '/04_people/苏珊·巴菲特' },
  { id: 'p-howard', name: '霍华德·巴菲特', description: '巴菲特父亲', link: '/04_people/霍华德·巴菲特' },
  { id: 'p-fisher', name: '菲利普·费雪', description: '成长股投资大师', link: '/04_people/菲利普·费雪' },
  { id: 'p-murphy', name: 'Tom Murphy', description: '首都城市ABC CEO', link: '/04_people/Tom_Murphy' },
  { id: 'p-goizueta', name: '罗伯托·戈伊苏埃塔', description: '可口可乐传奇CEO', link: '/04_people/罗伯托·戈伊苏埃塔' },
  { id: 'p-gates', name: '比尔·盖茨', description: '微软创始人，伯克希尔董事', link: '/04_people/比尔·盖茨' },
  { id: 'p-b夫人', name: 'B夫人', description: '内布拉斯加家具城创始人', link: '/04_people/B夫人' },
  { id: 'p-byrne', name: '杰克·伯恩', description: 'GEICO救世主', link: '/04_people/杰克·伯恩' },
  { id: 'p-sokol', name: '大卫·索科尔', description: '中美能源前CEO', link: '/04_people/大卫·索科尔' },
  { id: 'p-combs', name: '托德·康姆斯', description: '投资经理', link: '/04_people/托德·康姆斯' },
  { id: 'p-weschler', name: '特德·韦斯勒', description: '投资经理', link: '/04_people/特德·韦斯勒' },
  { id: 'p-simpson', name: '卢·辛普森', description: 'GEICO投资经理', link: '/04_people/卢·辛普森' },
  { id: 'p-gutfreund', name: '约翰·古尔特弗里德', description: '所罗门兄弟前CEO', link: '/04_people/约翰·古尔特弗里德' },
].map(n => ({ ...n, category: 'person', size: 22 }))

// ─── 公司节点 (核心持仓/收购) ────────────────────────────────────────────────

const companyNodes = [
  { id: 'co-berkshire', name: '伯克希尔', description: '巴菲特控股公司', link: '/03_companies/伯克希尔哈撒韦' },
  { id: 'co-geico', name: 'GEICO', description: '低成本车险公司', link: '/03_companies/GEICO' },
  { id: 'co-coke', name: '可口可乐', description: '1988年建仓，长期持有', link: '/03_companies/可口可乐' },
  { id: 'co-amex', name: '美国运通', description: '1964年投资，经典案例', link: '/03_companies/美国运通' },
  { id: 'co-apple', name: '苹果公司', description: '2016年开始重仓', link: '/03_companies/苹果公司' },
  { id: 'co-sees', name: '喜诗糖果', description: '1972年收购，护城河典范', link: '/03_companies/喜诗糖果' },
  { id: 'co-nfm', name: '内布拉斯加家具城', description: 'B夫人的家具帝国', link: '/03_companies/内布拉斯加家具城' },
  { id: 'co-washpost', name: '华盛顿邮报', description: '1973年投资', link: '/03_companies/华盛顿邮报' },
  { id: 'co-capcities', name: '首都城市ABC', description: '1985年投资', link: '/03_companies/首都城市ABC' },
  { id: 'co-bnsf', name: 'BNSF铁路', description: '2009年全资收购', link: '/03_companies/BNSF铁路' },
  { id: 'co-clayton', name: '克莱顿家园', description: '预制房屋制造商', link: '/03_companies/克莱顿家园' },
  { id: 'co-bankofamerica', name: '美国银行', description: '2011年投资', link: '/03_companies/美国银行' },
  { id: 'co-bydd', name: '比亚迪', description: '2008年投资', link: '/03_companies/比亚迪' },
  { id: 'co-marmon', name: 'Marmon集团', description: '工业制造集团', link: '/03_companies/Marmon集团' },
  { id: 'co-iscar', name: 'ISCAR', description: '以色列刀具制造商', link: '/03_companies/ISCAR-IMC' },
  { id: 'co-wellsfargo', name: '富国银行', description: '1989-2022持有', link: '/03_companies/富国银行' },
  { id: 'co-ibm', name: 'IBM', description: '2011-2018持有', link: '/03_companies/IBM' },
  { id: 'co-disney', name: '迪士尼', description: '1966年投资', link: '/03_companies/迪士尼' },
].map(n => ({ ...n, category: 'company', size: 24 }))

// ─── 年份节点 (关键年份) ─────────────────────────────────────────────────────

const yearNodes = [
  { id: 'y-1956', name: '1956', description: '巴菲特合伙公司成立' },
  { id: 'y-1965', name: '1965', description: '收购伯克希尔控制权' },
  { id: 'y-1967', name: '1967', description: '收购国家赔偿公司，进入保险' },
  { id: 'y-1972', name: '1972', description: '收购喜诗糖果' },
  { id: 'y-1973', name: '1973', description: '投资华盛顿邮报' },
  { id: 'y-1976', name: '1976', description: 'GEICO危机，杰克·伯恩拯救' },
  { id: 'y-1983', name: '1983', description: '收购内布拉斯加家具城' },
  { id: 'y-1985', name: '1985', description: '投资首都城市ABC' },
  { id: 'y-1988', name: '1988', description: '开始建仓可口可乐' },
  { id: 'y-1989', name: '1989', description: '投资美国运通' },
  { id: 'y-1991', name: '1991', description: '所罗门危机' },
  { id: 'y-1996', name: '1996', description: '全资收购GEICO' },
  { id: 'y-1998', name: '1998', description: '收购通用再保险' },
  { id: 'y-2006', name: '2006', description: '宣布捐赠计划' },
  { id: 'y-2008', name: '2008', description: '金融危机，投资高盛/比亚迪' },
  { id: 'y-2009', name: '2009', description: '收购BNSF铁路' },
  { id: 'y-2010', name: '2010', description: '收购BNSF完成' },
  { id: 'y-2011', name: '2011', description: '投资IBM' },
  { id: 'y-2016', name: '2016', description: '开始重仓苹果' },
  { id: 'y-2020', name: '2020', description: '投资日本五大商社' },
  { id: 'y-2023', name: '2023', description: '减持苹果，增持日本商社' },
  { id: 'y-2025', name: '2025', description: '巴菲特退休，格雷格继任' },
].map(n => ({ ...n, category: 'year', size: 16 }))

// ─── 主题分类节点 ────────────────────────────────────────────────────────────

const categoryNodes = [
  { id: 'cat-philosophy', name: '投资哲学', description: '内在价值、护城河、安全边际等核心概念' },
  { id: 'cat-business', name: '商业逻辑', description: '保险浮存金、资本配置、承保纪律' },
  { id: 'cat-method', name: '投资方法', description: '能力圈、逆向思维、风险控制' },
  { id: 'cat-governance', name: '治理智慧', description: '管理层选择、声誉、公司治理' },
  { id: 'cat-history', name: '历史镜鉴', description: '所罗门危机、日本投资等案例' },
].map(n => ({ ...n, category: 'category', size: 20 }))

// ─── 合并所有节点 ────────────────────────────────────────────────────────────

const allNodes = [
  ...conceptNodes,
  ...personNodes,
  ...companyNodes,
  ...yearNodes,
  ...categoryNodes,
]

// ─── 关系数据 ─────────────────────────────────────────────────────────────────

const allLinks = [
  // 概念 ↔ 主题分类
  { source: 'c-intrinsic', target: 'cat-philosophy', strength: 3 },
  { source: 'c-moat', target: 'cat-philosophy', strength: 3 },
  { source: 'c-margin', target: 'cat-philosophy', strength: 3 },
  { source: 'c-compound', target: 'cat-philosophy', strength: 3 },
  { source: 'c-longterm', target: 'cat-philosophy', strength: 3 },
  { source: 'c-circle', target: 'cat-method', strength: 3 },
  { source: 'c-contrarian', target: 'cat-method', strength: 3 },
  { source: 'c-risk', target: 'cat-method', strength: 3 },
  { source: 'c-float', target: 'cat-business', strength: 3 },
  { source: 'c-capital', target: 'cat-business', strength: 3 },
  { source: 'c-underwriting', target: 'cat-business', strength: 3 },
  { source: 'c-management', target: 'cat-governance', strength: 3 },
  { source: 'c-reputation', target: 'cat-governance', strength: 3 },
  { source: 'c-salomon', target: 'cat-history', strength: 3 },
  { source: 'c-japan', target: 'cat-history', strength: 3 },

  // 概念间关系
  { source: 'c-intrinsic', target: 'c-moat', strength: 3 },
  { source: 'c-moat', target: 'c-margin', strength: 3 },
  { source: 'c-margin', target: 'c-intrinsic', strength: 3 },
  { source: 'c-compound', target: 'c-longterm', strength: 2 },
  { source: 'c-circle', target: 'c-intrinsic', strength: 2 },
  { source: 'c-contrarian', target: 'c-margin', strength: 2 },
  { source: 'c-risk', target: 'c-margin', strength: 2 },
  { source: 'c-float', target: 'c-underwriting', strength: 3 },
  { source: 'c-capital', target: 'c-float', strength: 2 },
  { source: 'c-management', target: 'c-moat', strength: 2 },
  { source: 'c-reputation', target: 'c-management', strength: 2 },

  // 人物 ↔ 概念
  { source: 'p-graham', target: 'c-margin', strength: 3 },
  { source: 'p-graham', target: 'c-intrinsic', strength: 2 },
  { source: 'p-munger', target: 'c-moat', strength: 3 },
  { source: 'p-munger', target: 'c-circle', strength: 2 },
  { source: 'p-buffett', target: 'c-compound', strength: 3 },
  { source: 'p-buffett', target: 'c-float', strength: 3 },
  { source: 'p-buffett', target: 'c-capital', strength: 3 },
  { source: 'p-jain', target: 'c-float', strength: 3 },
  { source: 'p-jain', target: 'c-underwriting', strength: 3 },
  { source: 'p-byrne', target: 'c-underwriting', strength: 2 },
  { source: 'p-byrne', target: 'co-geico', strength: 3 },

  // 人物 ↔ 公司
  { source: 'p-buffett', target: 'co-berkshire', strength: 3 },
  { source: 'p-buffett', target: 'co-coke', strength: 3 },
  { source: 'p-buffett', target: 'co-amex', strength: 3 },
  { source: 'p-buffett', target: 'co-apple', strength: 3 },
  { source: 'p-buffett', target: 'co-sees', strength: 2 },
  { source: 'p-munger', target: 'co-coke', strength: 2 },
  { source: 'p-goizueta', target: 'co-coke', strength: 3 },
  { source: 'p-b夫人', target: 'co-nfm', strength: 3 },
  { source: 'p-murphy', target: 'co-capcities', strength: 3 },
  { source: 'p-gutfreund', target: 'c-salomon', strength: 3 },

  // 公司 ↔ 概念
  { source: 'co-coke', target: 'c-moat', strength: 3 },
  { source: 'co-sees', target: 'c-moat', strength: 3 },
  { source: 'co-geico', target: 'c-float', strength: 3 },
  { source: 'co-geico', target: 'c-underwriting', strength: 3 },
  { source: 'co-berkshire', target: 'c-capital', strength: 3 },
  { source: 'co-berkshire', target: 'c-float', strength: 3 },
  { source: 'co-amex', target: 'c-moat', strength: 2 },
  { source: 'co-apple', target: 'c-moat', strength: 2 },
  { source: 'co-nfm', target: 'c-moat', strength: 2 },

  // 年份 ↔ 公司/人物/概念
  { source: 'y-1956', target: 'p-buffett', strength: 3 },
  { source: 'y-1965', target: 'co-berkshire', strength: 3 },
  { source: 'y-1967', target: 'c-float', strength: 2 },
  { source: 'y-1972', target: 'co-sees', strength: 3 },
  { source: 'y-1972', target: 'c-moat', strength: 2 },
  { source: 'y-1973', target: 'co-washpost', strength: 3 },
  { source: 'y-1976', target: 'co-geico', strength: 3 },
  { source: 'y-1976', target: 'p-byrne', strength: 3 },
  { source: 'y-1983', target: 'co-nfm', strength: 3 },
  { source: 'y-1985', target: 'co-capcities', strength: 3 },
  { source: 'y-1985', target: 'p-murphy', strength: 2 },
  { source: 'y-1988', target: 'co-coke', strength: 3 },
  { source: 'y-1989', target: 'co-amex', strength: 3 },
  { source: 'y-1991', target: 'c-salomon', strength: 3 },
  { source: 'y-1996', target: 'co-geico', strength: 3 },
  { source: 'y-2008', target: 'co-bydd', strength: 3 },
  { source: 'y-2009', target: 'co-bnsf', strength: 3 },
  { source: 'y-2016', target: 'co-apple', strength: 3 },
  { source: 'y-2020', target: 'c-japan', strength: 3 },
  { source: 'y-2025', target: 'p-buffett', strength: 2 },
  { source: 'y-2025', target: 'p-abel', strength: 2 },
]

// ─── 状态 ────────────────────────────────────────────────────────────────────

const graphEl = ref(null)
const svgEl = ref(null)
const gEl = ref(null)
const searchQuery = ref('')
const selectedNode = ref(null)
const isFullscreen = ref(false)
const activeCategories = ref(['concept', 'person', 'company', 'year', 'category'])

const visibleNodes = computed(() =>
  allNodes.filter(n => activeCategories.value.includes(n.category))
)
const visibleLinks = computed(() =>
  allLinks.filter(l =>
    visibleNodes.value.find(n => n.id === (typeof l.source === 'object' ? l.source.id : l.source)) &&
    visibleNodes.value.find(n => n.id === (typeof l.target === 'object' ? l.target.id : l.target))
  )
)

// ─── 工具函数 ────────────────────────────────────────────────────────────────

const getCategoryColor = (cat) => categories.find(c => c.id === cat)?.color || '#888'
const getCategoryLabel = (cat) => categories.find(c => c.id === cat)?.label || ''

const getConnections = (nodeId) => {
  const connIds = new Set()
  allLinks.forEach(l => {
    const sid = typeof l.source === 'object' ? l.source.id : l.source
    const tid = typeof l.target === 'object' ? l.target.id : l.target
    if (sid === nodeId) connIds.add(tid)
    if (tid === nodeId) connIds.add(sid)
  })
  return allNodes.filter(n => connIds.has(n.id))
}

const selectNodeById = (id) => {
  selectedNode.value = allNodes.find(n => n.id === id) || null
  if (selectedNode.value) highlightNode(id)
}

// ─── 图谱渲染 ────────────────────────────────────────────────────────────────

let simulation = null
let svgSelection = null
let zoomBehavior = null

const initGraph = () => {
  if (!svgEl.value) return
  const el = graphEl.value
  const W = el.clientWidth || 1000
  const H = isFullscreen.value ? window.innerHeight - 60 : 640

  svgSelection = d3.select(svgEl.value).attr('width', W).attr('height', H)
  const g = d3.select(gEl.value)

  zoomBehavior = d3.zoom().scaleExtent([0.2, 4]).on('zoom', (e) => g.attr('transform', e.transform))
  svgSelection.call(zoomBehavior).on('dblclick.zoom', null)

  renderGraph(W, H)
}

const renderGraph = (W, H) => {
  const g = d3.select(gEl.value)
  g.selectAll('*').remove()

  const nodes = visibleNodes.value.map(n => ({ ...n }))
  const links = visibleLinks.value.map(l => ({ ...l }))

  // 力模拟
  simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(d => 100 - (d.strength || 1) * 15))
    .force('charge', d3.forceManyBody().strength(d => -d.size * 25))
    .force('center', d3.forceCenter(W / 2, H / 2))
    .force('collision', d3.forceCollide().radius(d => d.size + 15))
    .alphaDecay(0.015)

  // 连线
  const link = g.append('g').attr('class', 'links')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', '#334155')
    .attr('stroke-width', d => (d.strength || 1) * 1.5)
    .attr('stroke-opacity', d => 0.2 + (d.strength || 1) * 0.15)
    .attr('marker-end', 'url(#arrow)')

  // 节点组
  const node = g.append('g').attr('class', 'nodes')
    .selectAll('g')
    .data(nodes)
    .join('g')
    .attr('class', 'node-group')
    .attr('cursor', 'pointer')
    .call(d3.drag()
      .on('start', (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
      .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y })
      .on('end', (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null })
    )
    .on('click', (e, d) => { e.stopPropagation(); selectedNode.value = d; highlightNode(d.id) })

  // 光晕
  node.append('circle')
    .attr('r', d => d.size + 6)
    .attr('fill', d => getCategoryColor(d.category))
    .attr('opacity', 0.1)

  // 主圆
  node.append('circle')
    .attr('r', d => d.size)
    .attr('fill', d => getCategoryColor(d.category) + '20')
    .attr('stroke', d => getCategoryColor(d.category))
    .attr('stroke-width', 2)

  // 文字
  node.append('text')
    .text(d => d.name)
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('font-size', d => Math.max(9, Math.min(12, d.size * 0.4)) + 'px')
    .attr('fill', d => getCategoryColor(d.category))
    .attr('font-weight', '500')
    .attr('pointer-events', 'none')

  svgSelection.on('click', () => { selectedNode.value = null; resetHighlight() })

  simulation.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y)
    node.attr('transform', d => `translate(${d.x},${d.y})`)
  })
}

const highlightNode = (id) => {
  const g = d3.select(gEl.value)
  const connIds = new Set(getConnections(id).map(n => n.id))
  connIds.add(id)

  g.selectAll('.node-group circle:nth-child(2)').attr('opacity', d => connIds.has(d.id) ? 1 : 0.12).attr('stroke-width', d => d.id === id ? 3 : 2)
  g.selectAll('.node-group text').attr('opacity', d => connIds.has(d.id) ? 1 : 0.15)
  g.selectAll('.links line')
    .attr('stroke', l => {
      const sid = typeof l.source === 'object' ? l.source.id : l.source
      const tid = typeof l.target === 'object' ? l.target.id : l.target
      return (sid === id || tid === id) ? '#fbbf24' : '#334155'
    })
    .attr('stroke-opacity', l => {
      const sid = typeof l.source === 'object' ? l.source.id : l.source
      const tid = typeof l.target === 'object' ? l.target.id : l.target
      return (sid === id || tid === id) ? 0.9 : 0.08
    })
}

const resetHighlight = () => {
  const g = d3.select(gEl.value)
  g.selectAll('.node-group circle:nth-child(2)').attr('opacity', 1).attr('stroke-width', 2)
  g.selectAll('.node-group text').attr('opacity', 1)
  g.selectAll('.links line').attr('stroke', '#334155').attr('stroke-opacity', d => 0.2 + (d.strength || 1) * 0.15)
}

// ─── 搜索与控制 ──────────────────────────────────────────────────────────────

const onSearch = () => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) { resetHighlight(); return }
  const matched = allNodes.filter(n => n.name.toLowerCase().includes(q) || (n.description && n.description.toLowerCase().includes(q)))
  if (matched.length === 1) { selectedNode.value = matched[0]; highlightNode(matched[0].id) }
  else if (matched.length > 1) {
    const matchedIds = new Set(matched.map(n => n.id))
    const g = d3.select(gEl.value)
    g.selectAll('.node-group circle:nth-child(2)').attr('opacity', d => matchedIds.has(d.id) ? 1 : 0.1)
    g.selectAll('.node-group text').attr('opacity', d => matchedIds.has(d.id) ? 1 : 0.1)
  }
}

const clearSearch = () => { searchQuery.value = ''; resetHighlight() }

const toggleCategory = (cat) => {
  const idx = activeCategories.value.indexOf(cat)
  if (idx > -1) activeCategories.value.splice(idx, 1)
  else activeCategories.value.push(cat)
  nextTick(() => { const el = graphEl.value; const W = el.clientWidth || 1000; const H = isFullscreen.value ? window.innerHeight - 60 : 640; renderGraph(W, H) })
}

const resetView = () => {
  if (svgSelection && zoomBehavior) {
    const el = graphEl.value
    const W = el.clientWidth || 1000
    const H = isFullscreen.value ? window.innerHeight - 60 : 640
    svgSelection.transition().duration(600).call(zoomBehavior.transform, d3.zoomIdentity.translate(W / 2, H / 2).scale(0.8).translate(-W / 2, -H / 2))
  }
  selectedNode.value = null
  resetHighlight()
}

const toggleFullscreen = () => { isFullscreen.value = !isFullscreen.value; nextTick(() => initGraph()) }

onMounted(() => { nextTick(() => initGraph()); window.addEventListener('resize', handleResize) })
onUnmounted(() => { window.removeEventListener('resize', handleResize); if (simulation) simulation.stop() })
const handleResize = () => { if (!isFullscreen.value) initGraph() }
</script>

<style scoped>
.kg-wrapper { width: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 24px 0; }

/* 工具栏 */
.kg-toolbar { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: #0f172a; border-radius: 10px 10px 0 0; border: 1px solid #1e293b; border-bottom: none; flex-wrap: wrap; }
.kg-search { display: flex; align-items: center; gap: 8px; background: #1e293b; border: 1px solid #334155; border-radius: 6px; padding: 6px 10px; min-width: 180px; color: #94a3b8; }
.kg-search input { background: none; border: none; outline: none; color: #e2e8f0; font-size: 13px; width: 120px; }
.kg-search input::placeholder { color: #475569; }
.kg-search-clear { cursor: pointer; color: #475569; font-size: 12px; }
.kg-search-clear:hover { color: #94a3b8; }

.kg-filters { display: flex; gap: 6px; flex-wrap: wrap; flex: 1; }
.kg-filter-btn { display: flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: 5px; border: 1px solid #334155; background: transparent; color: #64748b; font-size: 12px; cursor: pointer; transition: all 0.2s; }
.kg-filter-btn:hover { border-color: #475569; color: #94a3b8; }
.kg-filter-btn.active { font-weight: 600; }
.kg-filter-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

.kg-actions { display: flex; gap: 6px; }
.kg-btn { padding: 5px 12px; border-radius: 5px; border: 1px solid #334155; background: #1e293b; color: #94a3b8; font-size: 12px; cursor: pointer; transition: all 0.2s; }
.kg-btn:hover { background: #334155; color: #e2e8f0; }

/* 画布 */
.kg-canvas { position: relative; background: #0a0f1e; border: 1px solid #1e293b; border-radius: 0 0 10px 10px; overflow: hidden; height: 640px; }
.kg-canvas.fullscreen { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; border-radius: 0; height: 100vh; }
.kg-svg { width: 100%; height: 100%; display: block; }

/* 详情面板 */
.kg-detail { position: absolute; top: 16px; right: 16px; width: 280px; background: #0f172a; border: 1px solid #1e293b; border-radius: 10px; padding: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.5); z-index: 10; }
.kg-detail-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #1e293b; }
.kg-detail-tag { font-size: 11px; padding: 3px 8px; border-radius: 4px; font-weight: 600; }
.kg-detail-close { background: none; border: none; color: #475569; cursor: pointer; font-size: 14px; padding: 0; }
.kg-detail-close:hover { color: #94a3b8; }
.kg-detail-title { font-size: 16px; font-weight: 700; color: #f1f5f9; margin: 0 0 8px 0; }
.kg-detail-desc { font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0 0 12px 0; }
.kg-detail-connections { margin-bottom: 14px; }
.kg-detail-conn-title { font-size: 11px; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; }
.kg-detail-conn-list { display: flex; flex-wrap: wrap; gap: 5px; }
.kg-detail-conn-tag { font-size: 11px; padding: 3px 8px; border-radius: 4px; border: 1px solid; color: #94a3b8; cursor: pointer; transition: all 0.15s; }
.kg-detail-conn-tag:hover { color: #e2e8f0; background: #1e293b; }
.kg-detail-more { font-size: 11px; color: #475569; padding: 3px 0; }
.kg-detail-link { display: block; font-size: 13px; color: #60a5fa; text-decoration: none; font-weight: 600; }
.kg-detail-link:hover { color: #93c5fd; }

/* 统计 */
.kg-stats { position: absolute; bottom: 12px; left: 16px; display: flex; gap: 12px; font-size: 11px; color: #475569; }
.kg-stats-selected { color: #fbbf24; }

/* 图例面板 */
.kg-legend-panel { position: absolute; bottom: 12px; right: 16px; background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 12px; font-size: 11px; }
.kg-legend-title { color: #64748b; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
.kg-legend-item { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; color: #94a3b8; }
.kg-legend-dot { width: 8px; height: 8px; border-radius: 50%; }

/* 动画 */
.slide-enter-active, .slide-leave-active { transition: all 0.25s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateX(20px); }
</style>
