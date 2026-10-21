<template>
  <section class="g-closing">
    <div class="g-container">
      <h2 class="g-closing__title">
        没有合适的？<br>自己建一位，再投进馆里。
      </h2>
      <div class="g-closing__ctas">
        <RouterLink class="g-pill g-pill--dark g-closing__pill" to="/paths/30min/">
          30 分钟入门
        </RouterLink>
        <RouterLink class="g-pill g-closing__pill g-closing__pill--grey" to="/contribute/">
          如何贡献模板
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.g-closing {
  padding: 96px 0 48px;
}

.g-closing__title {
  margin: 0;
  font-size: var(--fs-h2-closing);
  line-height: var(--lh-h2-closing);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-h2-closing);
  color: var(--ink);
}

.g-closing__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.g-closing__pill {
  min-height: 44px;
  padding: 11px 20px;
  font-size: 14px;
  line-height: 20px;
}

.g-closing__pill--grey {
  background: var(--pill);
  color: var(--ink);

  &:hover {
    background: var(--pill-hover);
  }
}

@media (max-width: 760px) {
  .g-closing {
    padding: 56px 0 32px;
  }
}
</style>
