<script setup lang="ts">
import type { BotTemplate } from '../../data/bots'

import BotMark from './BotMark.vue'
import ImportButton from './ImportButton.vue'

defineProps<{
  bot: BotTemplate
}>()
</script>

<template>
  <article class="g-card">
    <div class="g-card__top">
      <div class="g-card__id">
        <div class="g-card__stage">
          <BotMark :color="bot.color" :shape="bot.shape" size="md" hover-target=".g-card" />
        </div>
        <div class="g-card__nameblock">
          <RouterLink class="g-card__name" :to="`/bots/${bot.id}/`">
            {{ bot.name }}
          </RouterLink>
          <div class="g-card__role">{{ bot.role }}</div>
        </div>
      </div>
      <span class="g-card__tag">{{ bot.tag }}</span>
    </div>

    <p class="g-card__job">{{ bot.job }}</p>

    <div class="g-card__actions">
      <ImportButton :bot="bot" size="sm" />
      <RouterLink class="g-pill g-pill--ghost g-card__tutorial" :to="bot.tutorial">
        教程
      </RouterLink>
    </div>

    <div class="g-card__bubble" aria-hidden="true">{{ bot.bubble }}</div>
  </article>
</template>

<style scoped lang="scss">
.g-card {
  position: relative;
  min-height: 281px;
  background: var(--white);
  border: 1px solid var(--dove);
  border-radius: 20px;
  padding: 28px 24px 24px;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.g-card:hover,
.g-card:focus-within {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
  z-index: 2;
}

.g-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.g-card__id {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.g-card__stage {
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.g-card__nameblock {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.g-card__name {
  font-size: var(--fs-card-name);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-card-name);
  color: var(--ink);
  line-height: var(--lh-ui);

  &:hover {
    color: var(--mut);
  }
}

.g-card__role {
  font-size: 13px;
  line-height: var(--lh-ui);
  color: var(--fog);
}

.g-card__tag {
  flex-shrink: 0;
  font-size: 11.5px;
  color: var(--mut);
  background: var(--nim);
  border-radius: var(--r-pill);
  padding: 4px 10px;
  line-height: var(--lh-ui);
}

.g-card__job {
  margin: 16px 0 0;
  font-size: var(--fs-14-5);
  line-height: var(--lh-job);
  color: var(--body);
}

.g-card__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
}

.g-card__tutorial {
  min-height: 34px;
  padding: 9px 16px;
  font-size: 13px;
  line-height: 16px;
}

.g-card__bubble {
  position: absolute;
  top: 100%;
  left: 24px;
  /* 18px below the action row (card padding-bottom is 24px) */
  margin-top: -6px;
  max-width: calc(100% - 48px);
  background: var(--ink);
  color: var(--white);
  font-size: 12.5px;
  line-height: 18px;
  padding: 10px 14px;
  border-radius: 14px;
  box-shadow: var(--shadow-bubble);
  opacity: 0;
  transform: translateY(-2px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
  pointer-events: none;
}

.g-card:hover .g-card__bubble,
.g-card:focus-within .g-card__bubble {
  opacity: 1;
  transform: translateY(0);
}

@media (hover: none) {
  .g-card__bubble {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .g-card__bubble {
    transition: none;
  }
}
</style>
