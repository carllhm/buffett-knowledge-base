import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'
import KnowledgeGraph from '../components/KnowledgeGraph.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('KnowledgeGraph', KnowledgeGraph)
  }
} satisfies Theme
