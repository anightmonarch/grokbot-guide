<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { usePageData, useRoutePath } from 'vuepress/client'

import { SITE } from '../site'
import ImageLightbox from './ImageLightbox.vue'
import { getPrevNext, sidebarGroups } from '../sidebar'

const page = usePageData()
const routePath = useRoutePath()

const readingMinutes = computed(() => {
  // `readingTime` is attached to the page data by plugin-reading-time
  const minutes =
    (page.value as unknown as { readingTime?: { minutes?: number } })
      .readingTime?.minutes ?? 0
  return Math.max(1, Math.ceil(minutes))
})

const metaRequires = computed(
  () => (page.value.frontmatter as Record<string, unknown>).requires ?? null,
)

const metaVerified = computed(() => {
  const raw = (page.value.frontmatter as Record<string, unknown>).verified
  if (!raw) return null
  if (raw instanceof Date) return raw.toISOString().slice(0, 10)
  const text = String(raw)
  return /^\d{4}-\d{2}-\d{2}/.test(text) ? text.slice(0, 10) : text
})

interface TocEntry {
  level: number
  title: string
  slug: string
}

const tocItems = computed<TocEntry[]>(() => {
  const headers = page.value.headers ?? []
  return headers.flatMap((h) => [
    { level: 2, title: h.title, slug: h.slug },
    ...(h.children ?? []).map((child) => ({
      level: 3,
      title: child.title,
      slug: child.slug,
    })),
  ])
})

// scroll-spy: highlight the H2/H3 currently near the top of the viewport
const activeAnchor = ref('')
const articleEl = ref<HTMLElement | null>(null)

const onScrollSpy = (): void => {
  let current = ''
  const sections = (articleEl.value?.querySelectorAll(
    'h2[id], h3[id]',
  ) ?? []) as HTMLElement[]
  sections.forEach((el) => {
    if (el.getBoundingClientRect().top <= 96) {
      current = el.getAttribute('id') ?? ''
    }
  })
  activeAnchor.value = current
}

const onRouteChange = (): void => {
  nextTick(onScrollSpy)
}

onMounted(() => {
  window.addEventListener('scroll', onScrollSpy, { passive: true })
  onRouteChange()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollSpy)
})

watch(() => routePath.value, onRouteChange)

const prev = computed(() => getPrevNext(routePath.value).prev)
const next = computed(() => getPrevNext(routePath.value).next)

const activeSidebarLink = (link: string): boolean =>
  routePath.value === link

const editLink = computed(() => {
  const relative = page.value.filePathRelative
  if (!relative) return ''
  return `${SITE.repo}/edit/${SITE.branch}/docs/${relative}`
})

const sideOpen = ref(false)

// the mobile outline panel is a transient affordance — close it on navigation
watch(
  () => routePath.value,
  () => {
    sideOpen.value = false
  },
)
</script>

<template>
  <div class="g-wrap g-wrap--docs">
    <div class="g-docs" :class="{ 'is-side-open': sideOpen }">
      <aside class="g-sidebar">
        <div class="g-sidebar__search">
          <SearchBox />
        </div>
        <div v-for="group in sidebarGroups" :key="group.label" class="g-sidegroup">
          <div class="g-sidegroup__label">{{ group.label }}</div>
          <RouterLink
            v-for="item in group.items"
            :key="item.link"
            :to="item.link"
            class="g-sidelink"
            :class="{ 'is-active': activeSidebarLink(item.link) }"
          >{{ item.text }}</RouterLink>
        </div>
      </aside>

      <button
        type="button"
        class="g-docs__toggle"
        :aria-expanded="sideOpen"
        @click="sideOpen = !sideOpen"
      >目录</button>

      <article ref="articleEl" class="g-article">
        <div v-if="page.frontmatter.eyebrow" class="g-eyebrow">{{ page.frontmatter.eyebrow }}</div>
        <h1 class="g-title">{{ page.title }}</h1>
        <div class="g-meta">
          <span>阅读约 {{ readingMinutes }} 分钟</span>
          <template v-if="metaRequires">
            <span aria-hidden="true">·</span><span>{{ metaRequires }}</span>
          </template>
          <template v-if="metaVerified">
            <span aria-hidden="true">·</span><span>核对日期 {{ metaVerified }}</span>
          </template>
        </div>

        <div class="g-prose">
          <Content />
        </div>

        <div class="g-hr" />

        <div class="g-prevnext">
          <RouterLink v-if="prev" class="g-prevnext__link" :to="prev.link">
            <span class="g-prevnext__label">上一篇</span>
            <span class="g-prevnext__text">← {{ prev.text }}</span>
          </RouterLink>
          <div v-else />
          <RouterLink
            v-if="next"
            class="g-prevnext__link g-prevnext__link--right"
            :to="next.link"
          >
            <span class="g-prevnext__label">下一篇</span>
            <span class="g-prevnext__text">{{ next.text }} →</span>
          </RouterLink>
        </div>

        <a
          v-if="editLink"
          class="g-edit"
          :href="editLink"
          target="_blank"
          rel="noopener"
        >纠错 / 改进此页</a>
      </article>

      <aside v-if="tocItems.length" class="g-toc">
        <div class="g-toc__title">本页</div>
        <a
          v-for="item in tocItems"
          :key="item.slug"
          class="g-toc__link"
          :class="{ 'is-active': item.slug === activeAnchor, 'is-h3': item.level === 3 }"
          :href="`#${item.slug}`"
        >
          <span class="g-toc__bar" />
          <span>{{ item.title }}</span>
        </a>
      </aside>
    </div>
    <ClientOnly>
      <ImageLightbox />
    </ClientOnly>
  </div>
</template>
