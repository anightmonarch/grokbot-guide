<script setup lang="ts">
import { computed } from 'vue'

import type { BotTemplate } from '../../data/bots'
import { shareUrl } from '../../data/bots'

const props = withDefaults(
  defineProps<{
    bot: BotTemplate
    size?: 'sm' | 'lg'
  }>(),
  {
    size: 'sm',
  },
)

const url = computed(() => shareUrl(props.bot))
</script>

<template>
  <a
    v-if="url"
    class="g-pill g-pill--dark g-import"
    :class="size === 'lg' ? 'g-import--lg' : 'g-import--sm'"
    :href="url"
    target="_blank"
    rel="noopener"
  >导入模板</a>
</template>

<style scoped lang="scss">
.g-import {
  text-decoration: none;
  font-weight: var(--fw-medium);
}

.g-import--sm {
  min-height: 34px;
  padding: 9px 16px;
  font-size: 13px;
  line-height: 16px;
}

.g-import--lg {
  min-height: 44px;
  padding: 11px 20px;
  font-size: 14px;
}
</style>
