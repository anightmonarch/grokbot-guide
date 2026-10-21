<script setup lang="ts">
import { usePageFrontmatter } from 'vuepress/client'

import DocsLayout from './DocsLayout.vue'
import SiteFooter from './SiteFooter.vue'
import SiteHeader from './SiteHeader.vue'

const frontmatter = usePageFrontmatter()
</script>

<template>
  <div
    class="g-wrap g-wrap--layout"
    :class="{ 'g-wrap--custom': frontmatter.pageType === 'custom' }"
  >
    <a class="g-skip" href="#main-content">跳至主要内容</a>
    <SiteHeader />
    <main id="main-content" class="g-main">
      <Content v-if="frontmatter.pageType === 'custom'" class="g-custom" />
      <DocsLayout v-else />
    </main>
    <SiteFooter />

    <!-- custom pages have no sidebar: keep the slimsearch hotkeys site-wide -->
    <div v-if="frontmatter.pageType === 'custom'" class="g-search-hotkey">
      <SearchBox />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'GrokLayout',
}
</script>
