<script setup>
import DefaultTheme from 'vitepress/theme'
import PythonHome from './PythonHome.vue'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <PythonHome v-if="frontmatter.layout === 'python-home'" />
  <Layout v-else />
</template>
