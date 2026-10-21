<script setup lang="ts">
import { computed, ref } from 'vue'

import { findBot } from '../../data/bots'
import { PATH_ROWS, ROLES } from '../../data/paths'

import BotMark from './BotMark.vue'

type FilterKey = 'all' | '30min' | '7days' | 'creator' | 'dev' | 'ops'

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: '30min', label: '30 分钟' },
  { key: '7days', label: '7 天' },
  { key: 'creator', label: '创作者' },
  { key: 'dev', label: '开发者' },
  { key: 'ops', label: '运营' },
]

const active = ref<FilterKey>('all')

const isRowFilter = (key: FilterKey): boolean =>
  key === '30min' || key === '7days'

const visibleRows = computed(() => {
  if (active.value === 'all') return PATH_ROWS
  if (isRowFilter(active.value))
    return PATH_ROWS.filter((row) => row.key === active.value)
  return []
})

const showRoles = computed(() => !isRowFilter(active.value))

const isDimmed = (key: string): boolean =>
  active.value !== 'all' && active.value !== key

const botOf = (id: string) => findBot(id)
</script>

<template>
  <section class="g-paths">
    <div class="g-container">
      <div class="g-paths__inner">
        <div class="g-paths__eyebrow">学习路线</div>
        <h1 class="g-paths__title">选一条轨道出发</h1>
        <p class="g-paths__lead">
          不必读完整个手册。先选时间盒或角色，里程碑达标再扩展编制。
        </p>

        <div class="g-paths__filters" role="group" aria-label="按时间盒或角色筛选">
          <button
            v-for="filter in FILTERS"
            :key="filter.key"
            type="button"
            class="g-pill"
            :class="{ 'g-pill--dark': active === filter.key }"
            :aria-pressed="active === filter.key"
            @click="active = filter.key"
          >{{ filter.label }}</button>
        </div>

        <div v-if="visibleRows.length" class="g-paths__list">
          <RouterLink
            v-for="row in visibleRows"
            :key="row.key"
            class="g-paths__row"
            :to="row.link"
          >
            <span class="g-paths__badge">{{ row.badge }}</span>
            <span class="g-paths__body">
              <span class="g-paths__row-title">{{ row.title }}</span>
              <span class="g-paths__row-desc">{{ row.desc }}</span>
            </span>
            <span class="g-pill g-pill--ghost g-pill--sm g-paths__open">打开</span>
          </RouterLink>
        </div>

        <div v-if="showRoles" class="g-paths__roles">
          <h2 class="g-paths__section-title">按角色</h2>
          <div class="g-paths__role-grid">
            <RouterLink
              v-for="role in ROLES"
              :key="role.key"
              class="g-paths__role"
              :class="{ 'is-dimmed': isDimmed(role.key) }"
              :to="role.link"
            >
              <span class="g-paths__role-top">
                <BotMark
                  :color="botOf(role.bot)?.color ?? '#0A0A0A'"
                  :shape="botOf(role.bot)?.shape ?? 'blob'"
                  size="md"
                  hover-target=".g-paths__role"
                />
                <span class="g-paths__role-title">{{ role.title }}</span>
              </span>
              <span class="g-paths__role-desc">{{ role.desc }}</span>
              <span class="g-paths__role-go">查看路线 →</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.g-paths__inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 56px 0 24px;
}

.g-paths__eyebrow {
  font-size: 13px;
  line-height: var(--lh-ui);
  font-weight: var(--fw-medium);
  color: var(--fog);
  margin-bottom: 16px;
}

.g-paths__title {
  margin: 0 0 16px;
  font-size: var(--fs-display-m);
  line-height: var(--lh-display-m);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-display);
  color: var(--ink);
}

.g-paths__lead {
  margin: 0 0 36px;
  max-width: 36em;
  font-size: 16px;
  line-height: var(--lh-lead);
  color: var(--mut);
}

.g-paths__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

// ---------------------------------------------------------------------------
// time-box rows
// ---------------------------------------------------------------------------
.g-paths__list {
  display: flex;
  flex-direction: column;
  background: var(--white);
  border: 1px solid var(--dove);
  border-radius: var(--r16);
  overflow: hidden;
}

.g-paths__row {
  display: grid;
  grid-template-columns: 88px 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 24px 28px;
  border-bottom: 1px solid var(--dove);
  transition: background-color var(--t-color);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--row-hover);
  }
}

.g-paths__badge {
  font-family: var(--inter);
  font-size: 13px;
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-badge);
  color: var(--fog);
}

.g-paths__body {
  display: block;
  min-width: 0;
}

.g-paths__row-title {
  display: block;
  margin-bottom: 6px;
  font-size: 17px;
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-h3);
  color: var(--ink);
}

.g-paths__row-desc {
  display: block;
  max-width: 42em;
  font-size: 14px;
  line-height: 1.55;
  color: var(--mut);
}

.g-paths__open {
  pointer-events: none;
}

// ---------------------------------------------------------------------------
// role cards
// ---------------------------------------------------------------------------
.g-paths__roles {
  margin-top: 48px;
}

.g-paths__section-title {
  margin: 0 0 16px;
  font-size: var(--fs-h2);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-h2);
  color: var(--ink);
}

.g-paths__role-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--role-gap);
}

.g-paths__role {
  display: block;
  background: var(--white);
  border: 1px solid var(--dove);
  border-radius: var(--r16);
  padding: 24px;
  transition: transform var(--t-card), box-shadow var(--t-card),
    opacity var(--t-color);

  &:hover {
    transform: translateY(var(--lift));
    box-shadow: var(--shadow-hover);
  }

  &.is-dimmed {
    opacity: 0.4;
  }
}

.g-paths__role-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.g-paths__role-title {
  font-size: 16px;
  font-weight: var(--fw-medium);
  color: var(--ink);
}

.g-paths__role-desc {
  display: block;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--mut);
}

.g-paths__role-go {
  display: block;
  margin-top: 18px;
  font-size: 13px;
  font-weight: var(--fw-medium);
  color: var(--ink);
}

// ---------------------------------------------------------------------------
// responsive
// ---------------------------------------------------------------------------
@media (max-width: 1100px) {
  .g-paths__role-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .g-paths__inner {
    padding: 40px 0 24px;
  }

  .g-paths__title {
    font-size: 32px;
    line-height: 1.25;
  }

  .g-paths__row {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 20px;
  }

  .g-paths__open {
    justify-self: start;
  }

  .g-paths__role-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
