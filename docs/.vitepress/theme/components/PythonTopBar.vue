<script setup>
import { ref } from 'vue'

const showFontMenu = ref(false)
const showSocialMenu = ref(false)
const currentSize = ref(1) // 0: 90%, 1: 100%, 2: 112%

function setFontSize(level) {
  currentSize.value = level
  const sizes = ['90%', '100%', '112%']
  if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = sizes[level]
  }
  showFontMenu.value = false
}

function cycleFontSize() {
  const next = (currentSize.value + 1) % 3
  setFontSize(next)
}

function toggleFontMenu() {
  showFontMenu.value = !showFontMenu.value
  showSocialMenu.value = false
}

function toggleSocialMenu() {
  showSocialMenu.value = !showSocialMenu.value
  showFontMenu.value = false
}
</script>

<template>
  <div class="py-top-bar" id="top">
    <div class="py-top-container">
      <nav class="py-meta-nav">
        <ul class="py-meta-menu">
          <li class="active"><a href="/command-center/">Command Center</a></li>
          <li><a href="/command-center/00-mastery-spectrum/basic-to-ultra">Core Spectrum</a></li>
          <li><a href="/command-center/01-operating-systems/linux-core-essentials">Docs</a></li>
          <li><a href="/command-center/07-ultra-power-tools/system-internals">Forensics</a></li>
          <li><a href="https://github.com/musawir-13/command-center" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="/command-center/contributing">Community</a></li>
        </ul>
      </nav>

      <div class="py-top-actions">
        <!-- Font Size Adjuster Dropdown -->
        <div class="py-dropdown-wrapper" @mouseleave="showFontMenu = false">
          <button 
            type="button" 
            class="py-top-btn font-trigger" 
            @click="cycleFontSize"
            @mouseenter="showFontMenu = true"
            title="Adjust text size">
            <strong><small>A</small> A</strong>
            <span class="py-arrow">&#9662;</span>
          </button>
          <ul v-show="showFontMenu" class="py-dropdown-menu">
            <li><a href="javascript:;" @click="setFontSize(0)" :class="{ active: currentSize === 0 }">Smaller</a></li>
            <li><a href="javascript:;" @click="setFontSize(1)" :class="{ active: currentSize === 1 }">Reset (Default)</a></li>
            <li><a href="javascript:;" @click="setFontSize(2)" :class="{ active: currentSize === 2 }">Larger</a></li>
          </ul>
        </div>

        <!-- Socialize Dropdown -->
        <div class="py-dropdown-wrapper" @mouseleave="showSocialMenu = false">
          <button 
            type="button" 
            class="py-top-btn" 
            @click="toggleSocialMenu"
            @mouseenter="showSocialMenu = true">
            Socialize
            <span class="py-arrow">&#9662;</span>
          </button>
          <ul v-show="showSocialMenu" class="py-dropdown-menu">
            <li><a href="https://github.com/musawir-13/command-center" target="_blank" rel="noopener">GitHub Repository</a></li>
            <li><a href="https://github.com/musawir-13/command-center/issues" target="_blank" rel="noopener">Issue Tracker</a></li>
            <li><a href="https://github.com/musawir-13/command-center/discussions" target="_blank" rel="noopener">Discussions</a></li>
            <li><a href="/command-center/contributing">SRE Community</a></li>
          </ul>
        </div>

        <a href="https://github.com/musawir-13/command-center" target="_blank" rel="noopener" class="py-star-btn">
          Star on GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.py-top-bar {
  background-color: #2b5b84;
  border-bottom: 1px solid #1e415e;
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 0.82rem;
  line-height: 1.5;
  color: #d1e2f2;
  position: relative;
  z-index: 100;
  width: 100%;
}

.py-top-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.py-meta-menu {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0;
  padding: 0;
}

.py-meta-menu li a {
  color: #d1e2f2;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.84rem;
  transition: color 0.15s ease;
}

.py-meta-menu li a:hover,
.py-meta-menu li.active a {
  color: #ffd343;
}

.py-top-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.py-dropdown-wrapper {
  position: relative;
}

.py-top-btn {
  background: none;
  border: none;
  color: #d1e2f2;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 3px;
  transition: color 0.15s ease;
}

.py-top-btn:hover {
  color: #ffd343;
}

.py-arrow {
  font-size: 0.65rem;
}

.py-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 6px 0;
  margin: 4px 0 0 0;
  min-width: 160px;
  z-index: 1000;
}

.py-dropdown-menu li a {
  display: block;
  padding: 6px 14px;
  color: #333333;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 500;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.py-dropdown-menu li a:hover,
.py-dropdown-menu li a.active {
  background-color: #f1f5f9;
  color: #306998;
  font-weight: 700;
}

.py-star-btn {
  color: #ffd343;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.82rem;
  transition: opacity 0.15s ease;
}

.py-star-btn:hover {
  opacity: 0.85;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .py-meta-menu {
    gap: 10px;
    font-size: 0.78rem;
  }
  .py-top-container {
    padding: 0 12px;
  }
  .py-star-btn {
    display: none;
  }
}
</style>
