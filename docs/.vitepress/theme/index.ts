import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'
import KnowledgeGraph from '../components/KnowledgeGraph.vue'
import FullKnowledgeGraph from '../components/FullKnowledgeGraph.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('KnowledgeGraph', KnowledgeGraph)
    app.component('FullKnowledgeGraph', FullKnowledgeGraph)
  }
} satisfies Theme
