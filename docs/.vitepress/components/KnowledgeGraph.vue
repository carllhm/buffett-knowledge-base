<template>
  <div class="kg-wrapper">
    <!-- 顶部工具栏 -->
    <div class="kg-toolbar">
      <div class="kg-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input v-model="searchQuery" placeholder="搜索概念..." @input="onSearch" />
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
          <filter id="glow-blue">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-green">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-selected">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <marker id="arrow" viewBox="0 -5 10 10" refX="20" refY="0" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,-5L10,0L0,5" fill="#555"/>
          </marker>
          <marker id="arrow-highlight" viewBox="0 -5 10 10" refX="20" refY="0" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,-5L10,0L0,5" fill="#f59e0b"/>
          </marker>
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
          <div class="kg-detail-connections">
            <div class="kg-detail-conn-title">关联概念</div>
            <div class="kg-detail-conn-list">
              <span
                v-for="conn in getConnections(selectedNode.id)"
                :key="conn.id"
                class="kg-detail-conn-tag"
                :style="{ borderColor: getCategoryColor(conn.category) }"
                @click="selectNodeById(conn.id)"
              >{{ conn.name }}</span>
            </div>
          </div>
          <a :href="selectedNode.link" class="kg-detail-link">
            深入阅读 →
          </a>
        </div>
      </transition>

      <!-- 统计信息 -->
      <div class="kg-stats">
        <span>{{ visibleNodes.length }} 个概念</span>
        <span>{{ visibleLinks.length }} 条关联</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as d3 from 'd3'

// ─── 数据 ───────────────────────────────────────────────────────────────────

const categories = [
  { id: 'philosophy', label: '投资哲学', color: '#60a5fa' },
  { id: 'business',   label: '商业逻辑', color: '#34d399' },
  { id: 'method',     label: '投资方法', color: '#fbbf24' },
  { id: 'governance', label: '治理智慧', color: '#a78bfa' },
  { id: 'history',    label: '历史镜鉴', color: '#94a3b8' },
]

const allNodes = [
  // 投资哲学 (核心，size大)
  { id: 'intrinsic-value', name: '内在价值', category: 'philosophy', size: 36,
    description: '企业未来现金流的折现值。巴菲特一切投资决策的基石——只有当价格低于内在价值时才买入。',
    link: '/02_concepts/intrinsic-value' },
  { id: 'moat', name: '护城河', category: 'philosophy', size: 32,
    description: '企业可持续的竞争优势。品牌、网络效应、成本优势、转换成本是四大护城河来源。',
    link: '/02_concepts/moat' },
  { id: 'margin-of-safety', name: '安全边际', category: 'philosophy', size: 30,
    description: '以低于内在价值的价格买入，为错误留出缓冲空间。格雷厄姆传授给巴菲特的核心原则。',
    link: '/02_concepts/safety-margin' },
  { id: 'compounding', name: '复利', category: 'philosophy', size: 28,
    description: '时间放大的收益增长。巴菲特称之为"滚雪球"——需要湿雪和长坡。',
    link: '/02_concepts/compounding' },
  { id: 'long-term', name: '长期主义', category: 'philosophy', size: 24,
    description: '最喜欢的持有期是永远。时间是优质企业的朋友，是平庸企业的敌人。',
    link: '/02_concepts/long-termism' },
  { id: 'real-earnings', name: '真实盈利', category: 'philosophy', size: 22,
    description: '企业实际创造的现金利润，区别于GAAP会计利润。',
    link: '/02_concepts/look-through-earnings' },

  // 商业逻辑
  { id: 'float', name: '保险浮存金', category: 'business', size: 28,
    description: '先收保费后赔付之间的无息资金。伯克希尔最重要的竞争优势之一。',
    link: '/02_concepts/insurance-float' },
  { id: 'underwriting', name: '承保纪律', category: 'business', size: 22,
    description: '只为盈利承保，不为规模承保。承保亏损的浮存金是有成本的。',
    link: '/02_concepts/underwriting-discipline' },
  { id: 'capital-allocation', name: '资本配置', category: 'business', size: 26,
    description: '将资本投向最高回报的地方。巴菲特认为这是CEO最重要的工作。',
    link: '/02_concepts/capital-allocation' },
  { id: 'tax-deferred', name: '递延税复利', category: 'business', size: 20,
    description: '未实现利得递延纳税，相当于政府给的无息贷款，放大复利效应。',
    link: '/02_concepts/deferred-tax' },

  // 投资方法
  { id: 'circle', name: '能力圈', category: 'method', size: 26,
    description: '只投资自己真正理解的公司。知道边界比扩大边界更重要。',
    link: '/02_concepts/circle-of-competence' },
  { id: 'contrarian', name: '逆向思维', category: 'method', size: 22,
    description: '别人贪婪时恐惧，别人恐惧时贪婪。市场恐慌才能创造安全边际。',
    link: '/02_concepts/contrarian-thinking' },
  { id: 'risk', name: '风险控制', category: 'method', size: 24,
    description: '风险是永久损失的可能性，而非价格波动。第一条：不要亏损。',
    link: '/02_concepts/risk-control' },
  { id: 'look-through', name: '透视盈利', category: 'method', size: 20,
    description: '被投公司留存收益的真实价值，即使不分红也在为股东创造财富。',
    link: '/02_concepts/look-through-earnings' },
  { id: 'buyback', name: '股票回购', category: 'method', size: 22,
    description: '低于内在价值时回购是最好的资本配置。回购必须有纪律。',
    link: '/02_concepts/share-buybacks' },

  // 治理智慧
  { id: 'management', name: '管理层选择', category: 'governance', size: 26,
    description: '选择德才兼备的管理者。才能没有品德是危险的，品德没有才能是无用的。',
    link: '/02_concepts/management-selection' },
  { id: 'compensation', name: '高管薪酬', category: 'governance', size: 20,
    description: '薪酬应与股东利益一致，而非与规模挂钩。',
    link: '/02_concepts/executive-compensation' },
  { id: 'mistakes', name: '错误坦诚', category: 'governance', size: 20,
    description: '公开承认错误，建立信任。巴菲特每年在股东信中坦诚自己的失误。',
    link: '/02_concepts/mistakes' },
  { id: 'reputation', name: '声誉', category: 'governance', size: 24,
    description: '建立需要20年，毁掉只需5分钟。声誉是伯克希尔最重要的资产。',
    link: '/02_concepts/reputation' },
  { id: 'governance-sys', name: '公司治理', category: 'governance', size: 20,
    description: '保障股东利益的制度设计。独立董事、审计委员会是基础。',
    link: '/02_concepts/corporate-governance' },

  // 历史镜鉴
  { id: 'airlines', name: '航空公司教训', category: 'history', size: 20,
    description: '无护城河行业的投资陷阱。巴菲特曾两次投资航空公司，两次亏损。',
    link: '/02_concepts/moat' },
  { id: 'salomon', name: '所罗门危机', category: 'history', size: 22,
    description: '1991年临危受命，声誉与勇气的教科书案例。',
    link: '/02_concepts/salomon-crisis' },
  { id: 'japan', name: '日本五大商社', category: 'history', size: 20,
    description: '2020年以低于账面价值买入，能力圈原则的当代实践。',
    link: '/02_concepts/japan-investment' },
]

const allLinks = [
  // 核心三角（强）
  { source: 'intrinsic-value', target: 'moat',           strength: 3 },
  { source: 'moat',           target: 'margin-of-safety', strength: 3 },
  { source: 'margin-of-safety', target: 'intrinsic-value', strength: 3 },

  // 哲学内部
  { source: 'compounding',    target: 'long-term',        strength: 2 },
  { source: 'real-earnings',  target: 'intrinsic-value',  strength: 2 },
  { source: 'tax-deferred',   target: 'compounding',      strength: 2 },

  // 商业逻辑
  { source: 'float',          target: 'underwriting',     strength: 3 },
  { source: 'capital-allocation', target: 'float',        strength: 2 },
  { source: 'capital-allocation', target: 'intrinsic-value', strength: 2 },

  // 方法论
  { source: 'circle',         target: 'intrinsic-value',  strength: 2 },
  { source: 'contrarian',     target: 'margin-of-safety', strength: 2 },
  { source: 'risk',           target: 'margin-of-safety', strength: 2 },
  { source: 'look-through',   target: 'real-earnings',    strength: 1 },
  { source: 'buyback',        target: 'intrinsic-value',  strength: 2 },
  { source: 'buyback',        target: 'capital-allocation', strength: 1 },

  // 治理
  { source: 'management',     target: 'moat',             strength: 2 },
  { source: 'compensation',   target: 'management',       strength: 2 },
  { source: 'mistakes',       target: 'risk',             strength: 1 },
  { source: 'reputation',     target: 'mistakes',         strength: 2 },
  { source: 'governance-sys', target: 'management',       strength: 1 },
  { source: 'reputation',     target: 'management',       strength: 1 },

  // 历史验证
  { source: 'airlines',       target: 'moat',             strength: 1 },
  { source: 'salomon',        target: 'reputation',       strength: 2 },
  { source: 'japan',          target: 'circle',           strength: 1 },
  { source: 'japan',          target: 'margin-of-safety', strength: 1 },
]

// ─── 状态 ───────────────────────────────────────────────────────────────────

const graphEl    = ref(null)
const svgEl      = ref(null)
const gEl        = ref(null)
const searchQuery = ref('')
const selectedNode = ref(null)
const isFullscreen = ref(false)
const activeCategories = ref(['philosophy', 'business', 'method', 'governance', 'history'])
const highlightedIds = ref([])

const visibleNodes = computed(() =>
  allNodes.filter(n => activeCategories.value.includes(n.category))
)
const visibleLinks = computed(() =>
  allLinks.filter(l =>
    visibleNodes.value.find(n => n.id === l.source) &&
    visibleNodes.value.find(n => n.id === l.target)
  )
)

// ─── 工具函数 ────────────────────────────────────────────────────────────────

const getCategoryColor = (cat) => categories.find(c => c.id === cat)?.color || '#888'
const getCategoryLabel = (cat) => categories.find(c => c.id === cat)?.label || ''

const getConnections = (nodeId) => {
  const connIds = new Set()
  allLinks.forEach(l => {
    if (l.source === nodeId || (l.source.id && l.source.id === nodeId)) connIds.add(typeof l.target === 'object' ? l.target.id : l.target)
    if (l.target === nodeId || (l.target.id && l.target.id === nodeId)) connIds.add(typeof l.source === 'object' ? l.source.id : l.source)
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
  const W = el.clientWidth || 900
  const H = isFullscreen.value ? window.innerHeight - 60 : 560

  svgSelection = d3.select(svgEl.value)
    .attr('width', W)
    .attr('height', H)

  const g = d3.select(gEl.value)

  zoomBehavior = d3.zoom()
    .scaleExtent([0.3, 4])
    .on('zoom', (e) => g.attr('transform', e.transform))

  svgSelection.call(zoomBehavior)
    .on('dblclick.zoom', null)

  renderGraph(W, H)
}

const renderGraph = (W, H) => {
  const g = d3.select(gEl.value)
  g.selectAll('*').remove()

  const nodes = visibleNodes.value.map(n => ({ ...n }))
  const links = visibleLinks.value.map(l => ({ ...l }))

  // 力模拟
  simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(d => 120 - d.strength * 15))
    .force('charge', d3.forceManyBody().strength(d => -d.size * 18))
    .force('center', d3.forceCenter(W / 2, H / 2))
    .force('collision', d3.forceCollide().radius(d => d.size + 18))
    .alphaDecay(0.02)

  // 连线
  const link = g.append('g').attr('class', 'links')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', '#334155')
    .attr('stroke-width', d => d.strength)
    .attr('stroke-opacity', d => 0.3 + d.strength * 0.15)
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
      .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y })
      .on('end',   (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null })
    )
    .on('click', (e, d) => {
      e.stopPropagation()
      selectedNode.value = d
      highlightNode(d.id)
    })

  // 外圈光晕
  node.append('circle')
    .attr('r', d => d.size + 8)
    .attr('fill', d => getCategoryColor(d.category))
    .attr('opacity', 0.12)

  // 主圆
  node.append('circle')
    .attr('r', d => d.size)
    .attr('fill', d => getCategoryColor(d.category) + '22')
    .attr('stroke', d => getCategoryColor(d.category))
    .attr('stroke-width', 2)

  // 文字
  node.append('text')
    .text(d => d.name)
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('font-size', d => Math.max(10, Math.min(13, d.size * 0.42)) + 'px')
    .attr('fill', d => getCategoryColor(d.category))
    .attr('font-weight', '600')
    .attr('pointer-events', 'none')

  // 点击空白取消选中
  svgSelection.on('click', () => {
    selectedNode.value = null
    resetHighlight()
  })

  // tick
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
    node.attr('transform', d => `translate(${d.x},${d.y})`)
  })
}

const highlightNode = (id) => {
  const g = d3.select(gEl.value)
  const connIds = new Set(getConnections(id).map(n => n.id))
  connIds.add(id)

  g.selectAll('.node-group circle:nth-child(2)')
    .attr('opacity', d => connIds.has(d.id) ? 1 : 0.15)
    .attr('stroke-width', d => d.id === id ? 3 : 2)

  g.selectAll('.node-group text')
    .attr('opacity', d => connIds.has(d.id) ? 1 : 0.2)

  g.selectAll('.links line')
    .attr('stroke', l => {
      const sid = typeof l.source === 'object' ? l.source.id : l.source
      const tid = typeof l.target === 'object' ? l.target.id : l.target
      return (sid === id || tid === id) ? '#fbbf24' : '#334155'
    })
    .attr('stroke-opacity', l => {
      const sid = typeof l.source === 'object' ? l.source.id : l.source
      const tid = typeof l.target === 'object' ? l.target.id : l.target
      return (sid === id || tid === id) ? 0.9 : 0.1
    })
    .attr('stroke-width', l => {
      const sid = typeof l.source === 'object' ? l.source.id : l.source
      const tid = typeof l.target === 'object' ? l.target.id : l.target
      return (sid === id || tid === id) ? l.strength + 1 : l.strength
    })
}

const resetHighlight = () => {
  const g = d3.select(gEl.value)
  g.selectAll('.node-group circle:nth-child(2)').attr('opacity', 1).attr('stroke-width', 2)
  g.selectAll('.node-group text').attr('opacity', 1)
  g.selectAll('.links line')
    .attr('stroke', '#334155')
    .attr('stroke-opacity', d => 0.3 + d.strength * 0.15)
    .attr('stroke-width', d => d.strength)
}

// ─── 搜索 ────────────────────────────────────────────────────────────────────

const onSearch = () => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) { resetHighlight(); return }
  const matched = allNodes.filter(n => n.name.toLowerCase().includes(q) || n.description.toLowerCase().includes(q))
  if (matched.length === 1) {
    selectedNode.value = matched[0]
    highlightNode(matched[0].id)
  } else if (matched.length > 1) {
    const g = d3.select(gEl.value)
    const matchedIds = new Set(matched.map(n => n.id))
    g.selectAll('.node-group circle:nth-child(2)').attr('opacity', d => matchedIds.has(d.id) ? 1 : 0.1)
    g.selectAll('.node-group text').attr('opacity', d => matchedIds.has(d.id) ? 1 : 0.1)
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  resetHighlight()
}

// ─── 控制 ────────────────────────────────────────────────────────────────────

const toggleCategory = (cat) => {
  const idx = activeCategories.value.indexOf(cat)
  if (idx > -1) activeCategories.value.splice(idx, 1)
  else activeCategories.value.push(cat)
  nextTick(() => {
    const el = graphEl.value
    const W = el.clientWidth || 900
    const H = isFullscreen.value ? window.innerHeight - 60 : 560
    renderGraph(W, H)
  })
}

const resetView = () => {
  if (svgSelection && zoomBehavior) {
    const el = graphEl.value
    const W = el.clientWidth || 900
    const H = isFullscreen.value ? window.innerHeight - 60 : 560
    svgSelection.transition().duration(600).call(
      zoomBehavior.transform,
      d3.zoomIdentity.translate(W / 2, H / 2).scale(0.9).translate(-W / 2, -H / 2)
    )
  }
  selectedNode.value = null
  resetHighlight()
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  nextTick(() => initGraph())
}

// ─── 生命周期 ────────────────────────────────────────────────────────────────

onMounted(() => {
  nextTick(() => initGraph())
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (simulation) simulation.stop()
})

const handleResize = () => {
  if (!isFullscreen.value) initGraph()
}
</script>

<style scoped>
.kg-wrapper {
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 24px 0;
}

/* ── 工具栏 ── */
.kg-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #0f172a;
  border-radius: 10px 10px 0 0;
  border: 1px solid #1e293b;
  border-bottom: none;
  flex-wrap: wrap;
}

.kg-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 6px 10px;
  min-width: 180px;
  color: #94a3b8;
}

.kg-search input {
  background: none;
  border: none;
  outline: none;
  color: #e2e8f0;
  font-size: 13px;
  width: 120px;
}

.kg-search input::placeholder { color: #475569; }

.kg-search-clear {
  cursor: pointer;
  color: #475569;
  font-size: 12px;
  line-height: 1;
}
.kg-search-clear:hover { color: #94a3b8; }

.kg-filters {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  flex: 1;
}

.kg-filter-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #334155;
  background: transparent;
  color: #64748b;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.kg-filter-btn:hover { border-color: #475569; color: #94a3b8; }
.kg-filter-btn.active { font-weight: 600; }

.kg-filter-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.kg-actions {
  display: flex;
  gap: 6px;
}

.kg-btn {
  padding: 5px 12px;
  border-radius: 5px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.kg-btn:hover { background: #334155; color: #e2e8f0; }

/* ── 画布 ── */
.kg-canvas {
  position: relative;
  background: #0a0f1e;
  border: 1px solid #1e293b;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  height: 560px;
}

.kg-canvas.fullscreen {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  border-radius: 0;
  height: 100vh;
}

.kg-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* ── 详情面板 ── */
.kg-detail {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 260px;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  z-index: 10;
}

.kg-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #1e293b;
}

.kg-detail-tag {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.kg-detail-close {
  background: none;
  border: none;
  color: #475569;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  line-height: 1;
}
.kg-detail-close:hover { color: #94a3b8; }

.kg-detail-title {
  font-size: 16px;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 8px 0;
}

.kg-detail-desc {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0 0 12px 0;
}

.kg-detail-connections { margin-bottom: 14px; }

.kg-detail-conn-title {
  font-size: 11px;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.kg-detail-conn-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.kg-detail-conn-tag {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.15s;
}
.kg-detail-conn-tag:hover { color: #e2e8f0; background: #1e293b; }

.kg-detail-link {
  display: block;
  font-size: 13px;
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
}
.kg-detail-link:hover { color: #93c5fd; }

/* ── 统计 ── */
.kg-stats {
  position: absolute;
  bottom: 12px;
  left: 16px;
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: #334155;
}

/* ── 动画 ── */
.slide-enter-active, .slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
