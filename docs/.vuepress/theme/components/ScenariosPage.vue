<script setup lang="ts">
import { computed, ref } from 'vue'

import { findBot } from '../../data/bots'
import { SCENARIO_TAGS, SCENARIOS } from '../../data/scenarios'
import { SITE } from '../site'

import BotMark from './BotMark.vue'

const active = ref('全部')

const filters = ['全部', ...SCENARIO_TAGS]

const visible = computed(() =>
  active.value === '全部'
    ? SCENARIOS
    : SCENARIOS.filter((scenario) => scenario.cat === active.value),
)

const botOf = (id: string) => findBot(id)

const isExternal = (url: string): boolean => url.startsWith('http')

// TODO: once the repository is public, point this to
// `${SITE.repo}/issues/new?template=case.yml`
const issueUrl = SITE.repo
</script>

<template>
  <section class="g-scen">
    <div class="g-container">
      <div class="g-scen__inner">
        <div class="g-scen__eyebrow">场景库 · 社区实践</div>
        <h1 class="g-scen__title">社区里跑通的工作流</h1>
        <p class="g-scen__lead">
          每条都是可复现的工作流，并附出处域名。效果来自用户自述，需结合实际环境核验；涉及下单或外发时，请保留审批。
        </p>

        <div class="g-scen__filters" role="group" aria-label="按分类筛选场景">
          <button
            v-for="tag in filters"
            :key="tag"
            type="button"
            class="g-pill"
            :class="{ 'g-pill--dark': active === tag }"
            :aria-pressed="active === tag"
            @click="active = tag"
          >{{ tag }}</button>
        </div>

        <div v-if="visible.length" class="g-scen__grid">
          <article v-for="scenario in visible" :key="scenario.id" class="g-scen__card">
            <div class="g-scen__tags">
              <span v-for="tag in scenario.tags" :key="tag" class="g-scen__tag">
                {{ tag }}
              </span>
            </div>
            <h3 class="g-scen__card-title">{{ scenario.title }}</h3>
            <p class="g-scen__card-desc">{{ scenario.desc }}</p>

            <RouterLink class="g-scen__bot" :to="`/bots/${scenario.bot}/`">
              <BotMark
                :color="botOf(scenario.bot)?.color ?? '#0A0A0A'"
                :shape="botOf(scenario.bot)?.shape ?? 'blob'"
                size="sm"
                hover-target=".g-scen__bot"
              />
              <span>相关模板 · {{ botOf(scenario.bot)?.name ?? scenario.bot }}</span>
            </RouterLink>

            <div class="g-scen__actions">
              <a
                v-if="isExternal(scenario.source.url)"
                class="g-pill g-pill--dark g-pill--sm"
                :href="scenario.source.url"
                target="_blank"
                rel="noopener"
              >出处</a>
              <RouterLink
                v-else
                class="g-pill g-pill--dark g-pill--sm"
                :to="scenario.source.url"
              >出处</RouterLink>
              <RouterLink
                class="g-pill g-pill--ghost g-pill--sm"
                :to="`/scenarios/${scenario.id}/`"
              >教程</RouterLink>
            </div>

            <div class="g-scen__src">{{ scenario.source.label }}</div>
          </article>
        </div>

        <p v-else class="g-scen__empty">这个分类还没有场景，欢迎投稿。</p>

        <p class="g-scen__note">
          想补充案例？使用 GitHub Issue 模板
          <a :href="issueUrl" target="_blank" rel="noopener">case.yml</a>
          ，必填出处 URL 与审批边界。
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.g-scen__inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 56px 0 24px;
}

.g-scen__eyebrow {
  font-size: 13px;
  line-height: var(--lh-ui);
  font-weight: var(--fw-medium);
  color: var(--fog);
  margin-bottom: 16px;
}

.g-scen__title {
  margin: 0 0 16px;
  font-size: var(--fs-display-m);
  line-height: var(--lh-display-m);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-display);
  color: var(--ink);
}

.g-scen__lead {
  margin: 0 0 28px;
  max-width: 40em;
  font-size: 16px;
  line-height: var(--lh-lead);
  color: var(--mut);
}

.g-scen__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

// ---------------------------------------------------------------------------
// cards
// ---------------------------------------------------------------------------
.g-scen__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--scen-gap);
}

.g-scen__card {
  display: flex;
  flex-direction: column;
  min-height: 220px;
  background: var(--white);
  border: 1px solid var(--dove);
  border-radius: var(--r20);
  padding: 24px;
  transition: transform var(--t-card), box-shadow var(--t-card);

  &:hover {
    transform: translateY(var(--lift));
    box-shadow: var(--shadow-hover);
  }
}

.g-scen__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.g-scen__tag {
  font-size: var(--fs-11-5);
  padding: var(--pad-tag-scen);
  border-radius: var(--r-pill);
  background: var(--nim);
  color: var(--mut);
}

.g-scen__card-title {
  margin: 0 0 8px;
  font-size: var(--fs-h3);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-h3);
  color: var(--ink);
}

.g-scen__card-desc {
  flex: 1;
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--mut);
}

.g-scen__bot {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0 14px;
  font-size: var(--fs-12-5);
  color: var(--fog);

  &:hover {
    color: var(--ink);
  }
}

.g-scen__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.g-scen__src {
  margin-top: 12px;
  font-family: var(--inter);
  font-size: var(--fs-12);
  color: var(--fog);
}

.g-scen__empty {
  margin: 0;
  font-size: 13px;
  color: var(--fog);
}

.g-scen__note {
  margin: 28px 0 0;
  font-size: 13px;
  color: var(--fog);

  a {
    color: var(--ink);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}

// ---------------------------------------------------------------------------
// responsive
// ---------------------------------------------------------------------------
@media (max-width: 1100px) {
  .g-scen__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .g-scen__inner {
    padding: 40px 0 24px;
  }

  .g-scen__title {
    font-size: 32px;
    line-height: 1.25;
  }

  .g-scen__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
