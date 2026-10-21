<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { BOTMARK_SIZES, type BotMarkSize, type BotShape } from '../botmark/geometry'
import { createAvatar, restingSvg, updateSvg, pointerGaze } from '../botmark/avatar-engine.js'

const props = withDefaults(defineProps<{
  color?: string
  shape?: BotShape
  size?: BotMarkSize | number
  eyes?: string
  animated?: boolean
  hoverTarget?: string
  label?: string
}>(), {
  color: '#0A0A0A', shape: 'blob', size: 'md', eyes: '#FFFFFF', animated: true,
})

const id = `grok-bot-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
const root = ref<HTMLElement | null>(null)
const sprite = ref<HTMLElement | null>(null)
const playing = ref(false)
const px = computed(() => typeof props.size === 'number' ? props.size : BOTMARK_SIZES[props.size])
const preset = computed(() => typeof props.size === 'number' ? null : props.size)
const still = computed(() => restingSvg(props.shape, props.color, props.eyes, id))
const style = computed(() => preset.value ? undefined : { '--bm-size': `${px.value}px` })
// Each instance has its own director/phase, as on the official site.
let seed = 2166136261
for (const char of id) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619)
let avatar: ReturnType<typeof createAvatar> | undefined
let raf = 0
let last = 0
let mounted = false
let visible = true
let reduced = false
let media: MediaQueryList | undefined
let intersection: IntersectionObserver | undefined
let resize: ResizeObserver | undefined
let host: Element | undefined

const stop = () => {
  cancelAnimationFrame(raf)
  raf = 0
  playing.value = false
}
const render = () => {
  if (sprite.value && avatar) updateSvg(sprite.value, avatar.svg(id))
}
const tick = (now: number) => {
  raf = 0
  if (!avatar || !props.animated || reduced || !visible || document.hidden) {
    playing.value = false
    return
  }
  avatar.advance(Math.min((now - last) / 1000, 0.05))
  last = now
  render()
  raf = requestAnimationFrame(tick)
}
const resume = () => {
  if (!raf && avatar && props.animated && !reduced && visible && !document.hidden) {
    last = performance.now()
    playing.value = true
    raf = requestAnimationFrame(tick)
  }
}
const rebuild = () => {
  if (!mounted) return
  stop()
  avatar = createAvatar({ shape: props.shape, color: props.color, eyes: props.eyes, size: root.value?.clientWidth || px.value, seed: seed >>> 0 })
  if (!props.animated || reduced) avatar.rest()
  render()
  resume()
}
const onMotionChange = () => {
  reduced = media?.matches ?? false
  rebuild()
}
const onVisibility = () => document.hidden ? stop() : resume()
const onPointer = (event: Event) => {
  if (!props.animated || reduced || !root.value) return
  const pointer = event as PointerEvent
  avatar?.gaze(pointerGaze(root.value.getBoundingClientRect(), { x: pointer.clientX, y: pointer.clientY }))
}
const onLeave = () => avatar?.gaze(null)
const bindHost = () => {
  host?.removeEventListener('pointermove', onPointer)
  host?.removeEventListener('pointerleave', onLeave)
  host = (props.hoverTarget ? root.value?.closest(props.hoverTarget) : root.value) ?? undefined
  host?.addEventListener('pointermove', onPointer, { passive: true })
  host?.addEventListener('pointerleave', onLeave)
}

onMounted(() => {
  mounted = true
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced = media.matches
  media.addEventListener('change', onMotionChange)
  document.addEventListener('visibilitychange', onVisibility)
  bindHost()
  rebuild()
  if (typeof IntersectionObserver !== 'undefined') {
    intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      visible ? resume() : stop()
    })
    intersection.observe(root.value!)
  }
  if (typeof ResizeObserver !== 'undefined') {
    resize = new ResizeObserver(([entry]) => avatar?.compact(entry.contentRect.width < 48))
    resize.observe(root.value!)
  }
})
watch(() => [props.color, props.shape, props.eyes, props.size, props.animated], rebuild, { flush: 'post' })
watch(() => props.hoverTarget, bindHost, { flush: 'post' })
onBeforeUnmount(() => {
  mounted = false
  stop()
  intersection?.disconnect()
  resize?.disconnect()
  media?.removeEventListener('change', onMotionChange)
  document.removeEventListener('visibilitychange', onVisibility)
  host?.removeEventListener('pointermove', onPointer)
  host?.removeEventListener('pointerleave', onLeave)
  avatar = undefined
})
</script>

<template>
  <span
    ref="root"
    :class="['g-botmark', preset ? `g-botmark--${preset}` : null]"
    :style="style"
    :data-shape="shape"
    :data-playing="playing"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <span ref="sprite" class="g-botmark__sprite" v-html="still" />
  </span>
</template>

<style>
/* Keep all existing avatar boxes; only the official artwork inside changes. */
.g-botmark {
  --bm-size: var(--bm-md, 44px);
  position: relative;
  width: var(--bm-size);
  height: var(--bm-size);
  flex-shrink: 0;
  display: inline-block;
  overflow: visible;
  vertical-align: middle;
  line-height: 0;
  -webkit-tap-highlight-color: transparent;
}
.g-botmark--xs { --bm-size: var(--bm-xs, 16px); }
.g-botmark--sm { --bm-size: var(--bm-sm, 26px); }
.g-botmark--md { --bm-size: var(--bm-md, 44px); }
.g-botmark--lg { --bm-size: var(--bm-lg, 72px); }
.g-botmark--xl { --bm-size: var(--bm-xl, 128px); }
.g-botmark__sprite {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 153.333333%;
  height: 153.333333%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.g-botmark__sprite > svg { display: block; width: 100%; height: 100%; }
</style>
