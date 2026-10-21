<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const open = ref(false)
const src = ref('')
const alt = ref('')
const closeBtn = ref<HTMLButtonElement | null>(null)
/** Gate Teleport until after client mount so SSR never emits teleport anchors. */
const ready = ref(false)

let lastFocused: HTMLElement | null = null
let scrollY = 0

const lockScroll = (): void => {
  scrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.overflow = 'hidden'
}

const unlockScroll = (): void => {
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.overflow = ''
  window.scrollTo(0, scrollY)
}

const close = (): void => {
  if (!open.value) return
  open.value = false
  src.value = ''
  alt.value = ''
  unlockScroll()
  lastFocused?.focus?.()
  lastFocused = null
}

const show = (img: HTMLImageElement): void => {
  lastFocused = document.activeElement as HTMLElement | null
  src.value = img.currentSrc || img.src
  alt.value = img.alt || ''
  open.value = true
  lockScroll()
  nextTick(() => closeBtn.value?.focus())
}

const HINT = '点击查看大图'

const markImages = (): void => {
  document.querySelectorAll('.g-prose img').forEach((el) => {
    const img = el as HTMLImageElement
    if (!img.getAttribute('title')) img.setAttribute('title', HINT)
    if (!img.getAttribute('aria-label') && !img.alt) {
      img.setAttribute('aria-label', HINT)
    }
  })
}

const onKeydown = (e: KeyboardEvent): void => {
  if (e.key === 'Escape' && open.value) {
    e.preventDefault()
    close()
  }
}

const onProseClick = (e: MouseEvent): void => {
  const target = e.target
  if (!(target instanceof HTMLImageElement)) return
  const prose = target.closest('.g-prose')
  if (!prose) return
  // Prefer lightbox even when the img sits inside an <a>
  e.preventDefault()
  e.stopPropagation()
  show(target)
}

let observer: MutationObserver | null = null

onMounted(() => {
  ready.value = true
  document.addEventListener('click', onProseClick, true)
  document.addEventListener('keydown', onKeydown)
  // Do not touch .g-prose DOM until hydration has settled
  nextTick(() => {
    requestAnimationFrame(() => {
      markImages()
      observer = new MutationObserver(() => markImages())
      observer.observe(document.body, { childList: true, subtree: true })
    })
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onProseClick, true)
  document.removeEventListener('keydown', onKeydown)
  observer?.disconnect()
  observer = null
  if (open.value) unlockScroll()
})

watch(open, (v) => {
  if (!v) return
  nextTick(() => closeBtn.value?.focus())
})
</script>

<template>
  <!-- Teleport only after mount: avoids SSR teleport anchors that break hydrate -->
  <Teleport v-if="ready" to="body">
    <div
      v-if="open"
      class="g-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="图片预览"
      @click.self="close"
    >
      <button
        ref="closeBtn"
        type="button"
        class="g-lightbox__close"
        aria-label="关闭预览"
        @click="close"
      >×</button>
      <figure class="g-lightbox__figure" @click.stop>
        <img
          class="g-lightbox__img"
          :src="src"
          :alt="alt"
          draggable="false"
        />
        <figcaption v-if="alt" class="g-lightbox__caption">{{ alt }}</figcaption>
      </figure>
    </div>
  </Teleport>
</template>
