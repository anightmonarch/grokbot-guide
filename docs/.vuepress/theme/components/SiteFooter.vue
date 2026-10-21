<script setup lang="ts">
import { SITE } from '../site'

import BotMark from './BotMark.vue'

const repoLink = SITE.repo
</script>

<template>
  <footer class="g-footer">
    <div class="g-footer__line" />
    <div class="g-footer__row">
      <div class="g-footer__left">
        <BotMark color="#0A0A0A" shape="blob" size="xs" hover-target=".g-footer__left" />
        <span>Grok Bot 中文指南 · MIT · 一宿君</span>
      </div>
      <div class="g-footer__right">
        <a :href="SITE.officialDocs" target="_blank" rel="noopener">官方文档</a>
        <a class="g-footer__github" :href="repoLink" target="_blank" rel="noopener">GitHub</a>
        <a :href="SITE.commitDiary" target="_blank" rel="noopener">Commit 日记</a>
      </div>
    </div>
  </footer>
</template>
