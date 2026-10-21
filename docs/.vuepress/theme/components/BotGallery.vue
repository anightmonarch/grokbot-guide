<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { BOT_TAGS, BOTS } from '../../data/bots'

import type { BotShape } from '../botmark/geometry'
import type { BotMarkSize } from '../botmark/geometry'
import BotMark from './BotMark.vue'
import BotCard from './BotCard.vue'

const props = withDefaults(
  defineProps<{
    variant?: 'home' | 'bots'
  }>(),
  {
    variant: 'home',
  },
)

const active = ref('全部')

const tags = ['全部', ...BOT_TAGS]

const titleHtml = computed(() =>
  props.variant === 'home' ? '挑一位队友，<br>立刻上岗。' : 'Bot 模板馆',
)

const sub = computed(() =>
  props.variant === 'home'
    ? '开源实践手册附带可导入的 Bot 模板。点「导入模板」会唤起本机 Grok Bot；点「教程」读完整场景说明。'
    : '每位都是一份窄职责模板：一个名字、一份工作、一条审批边界。导入后可在 Grok Bot 里继续改。',
)

const filtered = computed(() =>
  active.value === '全部'
    ? BOTS
    : BOTS.filter((bot) => bot.tag === active.value),
)

// /bots/ keeps the filter in the URL so a filtered gallery can be shared
const syncQuery = (tag: string): void => {
  if (props.variant !== 'bots' || typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (tag === '全部') url.searchParams.delete('tag')
  else url.searchParams.set('tag', tag)
  window.history.replaceState(window.history.state, '', url)
}

const selectTag = (tag: string): void => {
  active.value = tag
  syncQuery(tag)
}

onMounted(() => {
  if (props.variant !== 'bots' || typeof window === 'undefined') return
  const tag = new URL(window.location.href).searchParams.get('tag')
  if (tag && tags.includes(tag)) active.value = tag
})

// hero cluster: the black site mark in the middle at xl, teammates around it
const byId = (id: string) => BOTS.find((b) => b.id === id)!
const cluster: { key: string; color: string; shape: BotShape; size: BotMarkSize }[] = [
  { key: 'xiaoye', color: byId('xiaoye').color, shape: byId('xiaoye').shape, size: 'lg' },
  { key: 'machu', color: byId('machu').color, shape: byId('machu').shape, size: 'md' },
  { key: 'site', color: '#0A0A0A', shape: 'blob', size: 'xl' },
  { key: 'shizhi', color: byId('shizhi').color, shape: byId('shizhi').shape, size: 'md' },
  { key: 'chenhao', color: byId('chenhao').color, shape: byId('chenhao').shape, size: 'lg' },
]
</script>

<template>
  <section class="g-gallery" :class="`g-gallery--${variant}`">
    <div class="g-container">
      <div class="g-hero">
        <div class="g-hero__copy">
          <div class="g-hero__eyebrow">Bot 馆</div>
          <h1 class="g-hero__title" v-html="titleHtml" />
          <p class="g-hero__sub">{{ sub }}</p>
          <div class="g-hero__filters" role="group" aria-label="按职责筛选模板">
            <button
              v-for="tag in tags"
              :key="tag"
              type="button"
              class="g-filter"
              :class="{ 'is-active': active === tag }"
              :aria-pressed="active === tag"
              @click="selectTag(tag)"
            >{{ tag }}</button>
          </div>
        </div>

        <div class="g-hero__visual">
          <div class="g-cluster" aria-hidden="true">
            <span
              v-for="item in cluster"
              :key="item.key"
              class="g-cluster__item"
            >
              <BotMark :color="item.color" :shape="item.shape" :size="item.size" />
            </span>
          </div>
          <div class="g-cluster__cap">{{ BOTS.length }} 个模板 · 持续扩充</div>
        </div>
      </div>

      <div class="g-grid">
        <BotCard v-for="bot in filtered" :key="bot.id" :bot="bot" />
      </div>

      <p v-if="!filtered.length" class="g-gallery__empty">
        这个分类还没有模板，欢迎投稿。
        <RouterLink to="/contribute/">去投稿 →</RouterLink>
      </p>

      <div class="g-note">
        <strong>导入说明</strong>
        <span>「导入模板」打开 x.ai/bot 上的官方分享链接，由系统唤起本机 Grok Bot 桌面端；未安装客户端时会引导下载。模板与教程均为本站原创，MIT 开源。</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.g-gallery {
  padding: 0;
}

.g-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;
  padding: 88px 0 28px;
}

.g-hero__copy {
  width: 560px;
  max-width: 100%;
}

.g-hero__eyebrow {
  font-family: var(--inter);
  font-size: 13px;
  line-height: var(--lh-ui);
  font-weight: var(--fw-medium);
  color: var(--fog);
  margin-bottom: 16px;
}

.g-hero__title {
  margin: 0;
  font-size: var(--fs-display-xl);
  line-height: var(--lh-display-xl);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-display);
  color: var(--ink);
}

.g-hero__sub {
  margin: 20px 0 0;
  font-size: var(--fs-16);
  line-height: var(--lh-lead-home);
  color: var(--mut);
}

.g-hero__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.g-filter {
  appearance: none;
  border: 0;
  flex: 0 0 auto;
  min-height: 33px;
  background: var(--pill);
  color: var(--ink);
  font-family: inherit;
  font-size: 12.5px;
  font-weight: var(--fw-medium);
  line-height: var(--lh-ui);
  padding: 7px 14px;
  border-radius: var(--r-pill);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: var(--pill-hover);
  }

  &.is-active {
    background: var(--ink);
    color: var(--white);

    &:hover {
      background: var(--ink);
    }
  }
}

.g-hero__visual {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}

.g-cluster {
  display: flex;
  align-items: center;
  padding-right: 8px;
}

.g-cluster__item {
  display: flex;
  align-items: center;
  margin-left: -18px;

  &:first-child {
    margin-left: 0;
  }
}

.g-cluster__cap {
  font-size: 12.5px;
  color: var(--fog);
  text-align: right;
}

/* Home-only sizing: preserve the gallery and card boxes. */
.g-gallery--home :deep(.g-card .g-botmark) {
  --bm-size: 60px;
}

.g-gallery--home .g-cluster :deep(.g-botmark--md) { --bm-size: 52px; }
.g-gallery--home .g-cluster :deep(.g-botmark--lg) { --bm-size: 82px; }
.g-gallery--home .g-cluster :deep(.g-botmark--xl) { --bm-size: 140px; }

.g-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  max-width: 1200px;
  padding-top: 8px;
}

.g-gallery__empty {
  margin: 24px 0 0;
  font-size: 13px;
  color: var(--fog);

  a {
    color: var(--ink);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}

.g-note {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
  padding: 14px 20px;
  background: var(--ivory);
  border: 1px solid var(--dove);
  border-radius: 12px;

  strong {
    font-size: 12.5px;
    font-weight: var(--fw-medium);
    color: var(--ink);
    flex-shrink: 0;
  }

  span {
    font-size: 12.5px;
    line-height: 20px;
    color: var(--mut);
  }
}

// /bots/ has no closing section — keep 96px between note and footer hairline
.g-gallery--bots .g-note {
  margin-bottom: 48px;
}

@media (max-width: 1100px) {
  .g-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    max-width: 100%;
  }
}

@media (max-width: 760px) {
  .g-hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    padding: 56px 0 24px;
  }

  .g-hero__copy {
    width: 100%;
  }

  .g-hero__title {
    font-size: 40px;
    line-height: 48px;
  }

  .g-hero__sub {
    font-size: 15px;
    line-height: 25px;
  }

  .g-hero__filters {
    flex-wrap: nowrap;
    align-items: center;
    overflow-x: auto;
    scrollbar-width: none;
    max-width: 100%;
    padding-bottom: 2px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .g-hero__visual {
    align-items: flex-start;
    order: -1;
  }

  .g-cluster {
    transform: scale(0.6);
    transform-origin: left center;
  }

  .g-cluster__cap {
    display: none;
  }

  .g-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .g-note {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>
