<script setup>
import DefaultTheme from 'vitepress/theme'
import PythonHome from './PythonHome.vue'
import PythonTopBar from './components/PythonTopBar.vue'
import PythonFooter from './components/PythonFooter.vue'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <PythonHome v-if="frontmatter.layout === 'python-home'" />
  <Layout v-else>
    <template #nav-bar-before>
      <PythonTopBar />
    </template>
    <template #layout-bottom>
      <PythonFooter />
    </template>
  </Layout>
</template>
