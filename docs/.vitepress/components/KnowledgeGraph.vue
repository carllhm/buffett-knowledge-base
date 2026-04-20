<template>
  <div class="knowledge-graph">
    <div class="controls">
      <div class="legend">
        <span class="legend-item" @click="toggleCategory('philosophy')">
          <span class="dot philosophy"></span>投资哲学
        </span>
        <span class="legend-item" @click="toggleCategory('business')">
          <span class="dot business"></span>商业逻辑
        </span>
        <span class="legend-item" @click="toggleCategory('method')">
          <span class="dot method"></span>投资方法
        </span>
        <span class="legend-item" @click="toggleCategory('governance')">
          <span class="dot governance"></span>治理智慧
        </span>
        <span class="legend-item" @click="toggleCategory('history')">
          <span class="dot history"></span>历史镜鉴
        </span>
      </div>
      <div class="actions">
        <button @click="resetZoom">重置视图</button>
        <button @click="highlightCore">核心三角</button>
      </div>
    </div>
    <div ref="container" class="graph-container"></div>
    <div v-if="selectedNode" class="node-detail">
      <h3>{{ selectedNode.name }}</h3>
      <p>{{ selectedNode.description }}</p>
      <a :href="selectedNode.link" target="_blank">查看详情 →</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const container = ref(null)
const selectedNode = ref(null)
let svg, simulation, nodes, links

// 概念数据
const concepts = [
  // 投资哲学
  { id: 'intrinsic-value', name: '内在价值', category: 'philosophy', 
    description: '企业未来现金流的折现值，投资的基石', link: '/02_concepts/intrinsic-value' },
  { id: 'moat', name: '护城河', category: 'philosophy',
    description: '企业可持续的竞争优势', link: '/02_concepts/moat' },
  { id: 'margin-of-safety', name: '安全边际', category: 'philosophy',
    description: '价格低于价值的缓冲空间', link: '/02_concepts/safety-margin' },
  { id: 'compounding', name: '复利', category: 'philosophy',
    description: '时间放大的收益增长', link: '/02_concepts/compounding' },
  { id: 'long-term', name: '长期主义', category: 'philosophy',
    description: '以年为单位持有优质资产', link: '/02_concepts/long-termism' },
  { id: 'real-earnings', name: '真实盈利', category: 'philosophy',
    description: '企业实际创造的现金利润', link: '/02_concepts/look-through-earnings' },
  
  // 商业逻辑
  { id: 'float', name: '保险浮存金', category: 'business',
    description: '先收保费后赔付的无息资金', link: '/02_concepts/insurance-float' },
  { id: 'underwriting', name: '承保纪律', category: 'business',
    description: '只为盈利承保，不为规模承保', link: '/02_concepts/underwriting-discipline' },
  { id: 'capital-allocation', name: '资本配置', category: 'business',
    description: '将资本投向最高回报的地方', link: '/02_concepts/capital-allocation' },
  { id: 'tax-deferred', name: '递延税复利', category: 'business',
    description: '未实现利得递延纳税的放大效应', link: '/02_concepts/deferred-tax' },
  
  // 投资方法
  { id: 'circle', name: '能力圈', category: 'method',
    description: '只投资自己理解的公司', link: '/02_concepts/circle-of-competence' },
  { id: 'contrarian', name: '逆向思维', category: 'method',
    description: '在市场恐慌时买入', link: '/02_concepts/contrarian-thinking' },
  { id: 'risk', name: '风险', category: 'method',
    description: '永久损失的可能性，而非波动', link: '/02_concepts/risk-control' },
  { id: 'look-through', name: '透视盈利', category: 'method',
    description: '被投公司留存收益的价值', link: '/02_concepts/look-through-earnings' },
  { id: 'buyback', name: '股票回购', category: 'method',
    description: '低于内在价值时回购股票', link: '/02_concepts/share-buybacks' },
  
  // 治理智慧
  { id: 'management', name: '管理层选择', category: 'governance',
    description: '选择德才兼备的管理者', link: '/02_concepts/management-selection' },
  { id: 'compensation', name: '高管薪酬', category: 'governance',
    description: '与股东利益一致的激励', link: '/02_concepts/executive-compensation' },
  { id: 'mistakes', name: '错误坦诚', category: 'governance',
    description: '公开承认错误，建立信任', link: '/02_concepts/mistakes' },
  { id: 'reputation', name: '声誉', category: 'governance',
    description: '建立需20年，毁掉只需5分钟', link: '/02_concepts/reputation' },
  { id: 'governance', name: '公司治理', category: 'governance',
    description: '保障股东利益的制度设计', link: '/02_concepts/corporate-governance' },
  
  // 历史镜鉴
  { id: 'airlines', name: '航空公司教训', category: 'history',
    description: '无护城河行业的投资陷阱', link: '/02_concepts/moat' },
  { id: 'salomon', name: '所罗门危机', category: 'history',
    description: '声誉危机的教科书案例', link: '/02_concepts/salomon-crisis' },
  { id: 'japan', name: '日本投资', category: 'history',
    description: '能力圈原则的当代实践', link: '/02_concepts/japan-investment' },
]

// 关系数据
const relations = [
  // 核心三角
  { source: 'intrinsic-value', target: 'moat', strength: 'strong' },
  { source: 'moat', target: 'margin-of-safety', strength: 'strong' },
  { source: 'margin-of-safety', target: 'intrinsic-value', strength: 'strong' },
  
  // 投资哲学内部
  { source: 'compounding', target: 'long-term', strength: 'strong' },
  { source: 'real-earnings', target: 'intrinsic-value', strength: 'medium' },
  
  // 商业逻辑内部
  { source: 'float', target: 'underwriting', strength: 'strong' },
  { source: 'capital-allocation', target: 'float', strength: 'medium' },
  { source: 'tax-deferred', target: 'compounding', strength: 'medium' },
  
  // 投资方法连接
  { source: 'circle', target: 'intrinsic-value', strength: 'medium' },
  { source: 'contrarian', target: 'margin-of-safety', strength: 'medium' },
  { source: 'risk', target: 'margin-of-safety', strength: 'strong' },
  { source: 'look-through', target: 'real-earnings', strength: 'medium' },
  { source: 'buyback', target: 'intrinsic-value', strength: 'medium' },
  
  // 治理智慧连接
  { source: 'management', target: 'moat', strength: 'medium' },
  { source: 'compensation', target: 'management', strength: 'medium' },
  { source: 'mistakes', target: 'risk', strength: 'weak' },
  { source: 'reputation', target: 'mistakes', strength: 'medium' },
  { source: 'governance', target: 'management', strength: 'medium' },
  
  // 历史验证
  { source: 'airlines', target: 'moat', strength: 'weak' },
  { source: 'salomon', target: 'reputation', strength: 'weak' },
  { source: 'japan', target: 'circle', strength: 'weak' },
]

const categoryColors = {
  philosophy: '#3b82f6', // 蓝
  business: '#10b981',   // 绿
  method: '#f59e0b',     // 橙
  governance: '#8b5cf6', // 紫
  history: '#6b7280',    // 灰
}

const activeCategories = ref(['philosophy', 'business', 'method', 'governance', 'history'])

const toggleCategory = (category) => {
  const index = activeCategories.value.indexOf(category)
  if (index > -1) {
    activeCategories.value.splice(index, 1)
  } else {
    activeCategories.value.push(category)
  }
  updateGraph()
}

const resetZoom = () => {
  if (svg) {
    svg.transition().duration(500).call(
      d3.zoom().transform,
      d3.zoomIdentity.translate(400, 300).scale(1)
    )
  }
}

const highlightCore = () => {
  activeCategories.value = ['philosophy']
  updateGraph()
  selectedNode.value = null
}

const updateGraph = () => {
  if (!simulation) return
  
  const filteredNodes = concepts.filter(n => activeCategories.value.includes(n.category))
  const filteredLinks = relations.filter(l => 
    filteredNodes.find(n => n.id === l.source) && 
    filteredNodes.find(n => n.id === l.target)
  )
  
  // 更新模拟
  simulation.nodes(filteredNodes)
  simulation.force('link').links(filteredLinks)
  simulation.alpha(1).restart()
  
  // 更新DOM
  renderGraph(filteredNodes, filteredLinks)
}

const renderGraph = (nodeData, linkData) => {
  // 清空
  d3.select(container.value).selectAll('*').remove()
  
  const width = 800
  const height = 600
  
  svg = d3.select(container.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
  
  // 添加缩放
  const zoom = d3.zoom()
    .scaleExtent([0.5, 3])
    .on('zoom', (event) => {
      g.attr('transform', event.transform)
    })
  
  svg.call(zoom)
  
  const g = svg.append('g')
  
  // 绘制连接线
  links = g.append('g')
    .selectAll('line')
    .data(linkData)
    .join('line')
    .attr('stroke', '#999')
    .attr('stroke-opacity', d => d.strength === 'strong' ? 0.8 : d.strength === 'medium' ? 0.5 : 0.3)
    .attr('stroke-width', d => d.strength === 'strong' ? 3 : d.strength === 'medium' ? 2 : 1)
  
  // 绘制节点
  nodes = g.append('g')
    .selectAll('g')
    .data(nodeData)
    .join('g')
    .attr('cursor', 'pointer')
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended))
    .on('click', (event, d) => {
      selectedNode.value = d
    })
  
  // 节点圆圈
  nodes.append('circle')
    .attr('r', 25)
    .attr('fill', d => categoryColors[d.category])
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
  
  // 节点文字
  nodes.append('text')
    .text(d => d.name)
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('font-size', '12px')
    .attr('fill', '#fff')
    .attr('font-weight', 'bold')
  
  // 力模拟
  simulation = d3.forceSimulation(nodeData)
    .force('link', d3.forceLink(linkData).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(40))
  
  simulation.on('tick', () => {
    links
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
    
    nodes.attr('transform', d => `translate(${d.x},${d.y})`)
  })
}

function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart()
  d.fx = d.x
  d.fy = d.y
}

function dragged(event, d) {
  d.fx = event.x
  d.fy = event.y
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0)
  d.fx = null
  d.fy = null
}

onMounted(() => {
  renderGraph(concepts, relations)
})
</script>

<style scoped>
.knowledge-graph {
  position: relative;
  width: 100%;
  margin: 20px 0;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  flex-wrap: wrap;
  gap: 10px;
}

.legend {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background 0.2s;
}

.legend-item:hover {
  background: var(--vp-c-bg);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.philosophy { background: #3b82f6; }
.dot.business { background: #10b981; }
.dot.method { background: #f59e0b; }
.dot.governance { background: #8b5cf6; }
.dot.history { background: #6b7280; }

.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.actions button:hover {
  opacity: 0.8;
}

.graph-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.node-detail {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 280px;
  padding: 15px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.node-detail h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.node-detail p {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.node-detail a {
  font-size: 14px;
  color: var(--vp-c-brand);
}
</style>
