<script setup lang="ts">
import SiteFooter from './SiteFooter.vue'
import SiteHeader from './SiteHeader.vue'
</script>

<template>
  <div class="g-wrap g-wrap--notfound">
    <SiteHeader />
    <main id="main-content" class="g-main">
      <section class="g-notfound">
        <div class="g-container">
          <div class="g-notfound__inner">
            <div class="g-notfound__code">404</div>
            <h1 class="g-notfound__title">这一页不在这里</h1>
            <p class="g-notfound__desc">
              链接可能已经失效。可以回到首页，或从入门章节重新开始。
            </p>
            <div class="g-notfound__actions">
              <RouterLink to="/" class="g-pill g-pill--dark">回到首页</RouterLink>
              <RouterLink to="/start/" class="g-pill">入门</RouterLink>
            </div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
