<script setup lang="ts">
import { computed } from 'vue'

import { BOTS, findBot, shareUrl } from '../../data/bots'

import BotMark from './BotMark.vue'
import ImportButton from './ImportButton.vue'

const props = defineProps<{
  id: string
}>()

const bot = computed(() => findBot(props.id))

const others = computed(() =>
  BOTS.filter((item) => item.id !== props.id).slice(0, 3),
)

const caption = computed(() => {
  const current = bot.value
  if (!current) return ''
  const url = shareUrl(current)
  return url ? `导入模板 → 打开 ${url}（唤起本机 Grok Bot）` : ''
})
</script>

<template>
  <section v-if="bot" class="g-detail">
    <div class="g-container">
      <div class="g-detail__grid">
        <div class="g-detail__visual">
          <div class="g-detail__stage">
            <BotMark :color="bot.color" :shape="bot.shape" size="lg" hover-target=".g-detail__visual" :label="`${bot.name} 的头像`" />
          </div>
        </div>

        <div class="g-detail__copy">
          <div class="g-detail__eyebrow">
            <RouterLink to="/bots/">Bot 馆</RouterLink>
            <span aria-hidden="true"> · </span>
            <span>模板详情</span>
          </div>
          <h1 class="g-detail__name">{{ bot.name }}</h1>
          <div class="g-detail__role">{{ bot.role }}</div>

          <div class="g-detail__meta">
            <span class="g-pill g-pill--sm g-detail__chip">{{ bot.tag }}</span>
            <span v-if="bot.shareId" class="g-pill g-pill--sm g-detail__chip">
              可导入
            </span>
          </div>

          <p class="g-detail__desc">{{ bot.desc }}</p>

          <div class="g-detail__bubble">「{{ bot.bubble }}」</div>

          <div class="g-detail__actions">
            <ImportButton :bot="bot" size="lg" />
            <RouterLink class="g-pill g-pill--ghost g-detail__tutorial" :to="bot.tutorial">
              教程
            </RouterLink>
          </div>

          <div v-if="caption" class="g-detail__cap">{{ caption }}</div>
        </div>
      </div>

      <div class="g-detail__others">
        <h2 class="g-detail__others-title">其他队友</h2>
        <div class="g-detail__others-list">
          <RouterLink
            v-for="other in others"
            :key="other.id"
            class="g-detail__other"
            :to="`/bots/${other.id}/`"
          >
            <BotMark :color="other.color" :shape="other.shape" size="sm" hover-target=".g-detail__other" />
            <span class="g-detail__other-name">{{ other.name }}</span>
            <span class="g-detail__other-role">{{ other.role }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.g-detail {
  padding: 64px 0 24px;
}

.g-detail__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.g-detail__visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border: 1px solid var(--dove);
  border-radius: 24px;
  padding: 64px 48px;
  min-height: 420px;
}

.g-detail__stage {
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.g-detail__eyebrow {
  font-family: var(--inter);
  font-size: 13px;
  line-height: var(--lh-ui);
  font-weight: var(--fw-medium);
  color: var(--fog);
  margin-bottom: 12px;

  a {
    color: var(--fog);
    text-decoration: none;

    &:hover {
      color: var(--ink);
    }
  }
}

.g-detail__name {
  margin: 0 0 8px;
  font-size: var(--fs-display-l);
  line-height: var(--lh-display-l);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-display);
  color: var(--ink);
}

.g-detail__role {
  font-size: 16px;
  line-height: 1.55;
  color: var(--fog);
  margin-bottom: 20px;
}

.g-detail__meta {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.g-detail__chip {
  min-height: 29px;
  padding: 7px 14px;
  font-size: 12.5px;
  font-weight: var(--fw-medium);
  line-height: var(--lh-ui);
  background: var(--pill);
  color: var(--ink);
}

.g-detail__desc {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 1.7;
  color: var(--body);
  max-width: 28em;
}

.g-detail__bubble {
  display: inline-block;
  background: var(--ink);
  color: var(--white);
  font-size: 13.5px;
  line-height: 1.5;
  padding: 12px 16px;
  border-radius: 14px;
  margin-bottom: 28px;
  max-width: 28em;
}

.g-detail__actions {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.g-detail__tutorial {
  min-height: 44px;
  padding: 11px 20px;
  font-size: 14px;
  line-height: 20px;
}

.g-detail__cap {
  margin-top: 12px;
  font-size: 12.5px;
  color: var(--fog);
  font-family: var(--inter);
}

.g-detail__others {
  margin-top: 48px;
}

.g-detail__others-title {
  margin: 0 0 16px;
  font-size: var(--fs-h2);
  font-weight: var(--fw-medium);
  letter-spacing: -0.01em;
  line-height: 1.55;
  color: var(--ink);
}

.g-detail__others-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 420px;
}

.g-detail__other {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 44px;
  padding: 0 8px;
  border-radius: var(--r8);
  transition: background-color 0.15s ease;

  &:hover {
    background: var(--row-hover);
  }
}

.g-detail__other-name {
  font-size: 14px;
  font-weight: var(--fw-medium);
  color: var(--ink);
}

.g-detail__other-role {
  font-size: 13px;
  color: var(--fog);
}

@media (max-width: 760px) {
  .g-detail {
    padding: 32px 0 24px;
  }

  .g-detail__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }

  .g-detail__visual {
    min-height: 240px;
    padding: 40px 24px;
  }

  .g-detail__name {
    font-size: 40px;
    line-height: 1.3;
  }
}
</style>
