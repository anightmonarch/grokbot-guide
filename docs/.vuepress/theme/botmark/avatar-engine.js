import { createMotion, createDirector, renderSvg, updateSvg, pointerGaze } from './official-core.js'

// Keep the site's public shape names; use the corresponding official bodies.
const bodies = { blob: 'sphere', circle: 'sphere', drop: 'teardrop', pill: 'capsule' }
const appearance = (color, eyes) => ({
  ink: [0, 0, 0], spot: [0, 0, 0], cutout: false,
  inkPaint: color, spotPaint: eyes,
})

export function createAvatar({ shape = 'blob', color = '#0A0A0A', eyes = '#FFFFFF', size = 44, seed = 1 } = {}) {
  const motion = createMotion({ body: bodies[shape] ?? shape })
  const director = createDirector(motion, 'idle', { seed, isCompact: size < 48 })
  const paint = appearance(color, eyes)
  return {
    advance(seconds) {
      director.advance(seconds)
      motion.advance(seconds)
    },
    svg(id) {
      // The official engine draws a 60% body inside its sprite. The host uses
      // 0.92 / 0.6 = 153.333% so the visible body fills 92% of its avatar box.
      return renderSvg(motion.frame(), paint, 160, id, { extent: '100%', displaySize: size })
    },
    rest() {
      director.setResting(true)
      motion.pause()
      motion.seek(0)
      for (let i = 0; i < 60; i++) motion.advance(0.1)
    },
    gaze(point) { motion.setGaze(point) },
    compact(value) { director.setCompact(value) },
  }
}

const resting = new Map()
export function restingSvg(shape, color, eyes, id = 'grok-rest') {
  const key = JSON.stringify([shape, color, eyes])
  if (!resting.has(key)) {
    const avatar = createAvatar({ shape, color, eyes })
    avatar.rest()
    resting.set(key, avatar.svg('grok-rest'))
  }
  return resting.get(key).replaceAll('grok-rest', id)
}

export { updateSvg, pointerGaze }
