<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRoutePath } from 'vuepress/client'

import { SITE } from '../site'
import BotMark from './BotMark.vue'

const routePath = useRoutePath()

const links = [
  { text: '入门', link: '/start/' },
  { text: '学习路线', link: '/paths/' },
  { text: 'Bot 馆', link: '/bots/' },
  { text: '场景库', link: '/scenarios/' },
  { text: '共建', link: '/contribute/' },
  { text: 'Q&A', link: '/faq/' },
]

const repoLink = SITE.repo
const commitDiaryLink = SITE.commitDiary

const isActive = (link: string): boolean =>
  routePath.value === link || (link !== '/' && routePath.value.startsWith(link))

const menuOpen = ref(false)

// the drop panel is a mobile-only affordance — close it on every navigation
watch(
  () => routePath.value,
  () => {
    menuOpen.value = false
  },
)

// NOTE: .g-mobile-panel is rendered as a SIBLING of <header>, not a child.
// .g-header is sticky + blurred; on WebKit/iOS a backdrop-filter ancestor
// becomes the containing block for position:fixed descendants, which collapsed
// the panel to the header's box (~1px tall, every link clipped).

// lock page scroll behind the open panel (client-only: watchers never fire during SSR)
const LOCK_CLASS = 'g-menu-lock'
watch(menuOpen, (open) => {
  document.documentElement.classList.toggle(LOCK_CLASS, open)
})
onBeforeUnmount(() => {
  document.documentElement.classList.remove(LOCK_CLASS)
})
</script>

<template>
  <header class="g-header" :class="{ 'is-menu-open': menuOpen }">
    <div class="g-header__inner">
      <RouterLink class="g-logo" to="/">
        <BotMark color="#0A0A0A" shape="blob" size="sm" hover-target=".g-logo" />
        <span class="g-logo__text">Grok Bot 中文指南</span>
      </RouterLink>

      <nav class="g-nav">
        <RouterLink
          v-for="item in links"
          :key="item.link"
          :to="item.link"
          class="g-nav__link"
          :class="{ 'is-active': isActive(item.link) }"
        >{{ item.text }}</RouterLink>
        <a
          class="g-pill g-pill--github"
          :href="repoLink"
          target="_blank"
          rel="noopener"
        >GitHub</a>
        <a
          class="g-pill g-pill--github"
          :href="commitDiaryLink"
          target="_blank"
          rel="noopener"
        >Commit 日记</a>
        <RouterLink to="/paths/30min/" class="g-pill g-pill--dark">30 分钟入门</RouterLink>
      </nav>

      <button
        type="button"
        class="g-menu-btn"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
        @click.stop.prevent="menuOpen = !menuOpen"
      >
        <span /><span /><span />
      </button>
    </div>
  </header>

  <div
    class="g-mobile-panel"
    :class="{ 'is-open': menuOpen }"
    :hidden="!menuOpen"
  >
    <RouterLink
      v-for="item in links"
      :key="item.link"
      :to="item.link"
      class="g-mobile-panel__link"
      :class="{ 'is-active': isActive(item.link) }"
      @click="menuOpen = false"
    >{{ item.text }}</RouterLink>
    <a
      class="g-mobile-panel__link"
      :href="repoLink"
      target="_blank"
      rel="noopener"
    >GitHub</a>
    <a
      class="g-mobile-panel__link"
      :href="commitDiaryLink"
      target="_blank"
      rel="noopener"
    >Commit 日记</a>
    <RouterLink
      to="/paths/30min/"
      class="g-mobile-panel__link"
      @click="menuOpen = false"
    >30 分钟入门</RouterLink>
  </div>
</template>
