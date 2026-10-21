import assert from 'node:assert/strict'
import test from 'node:test'
import { createAvatar, restingSvg } from '../docs/.vuepress/theme/botmark/avatar-engine.js'

test('every site avatar renders finite vector frames and moves independently', () => {
  for (const shape of ['blob', 'cloud', 'hex', 'circle', 'squircle', 'drop', 'pill']) {
    const a = createAvatar({ shape, color: '#EB4699', size: 72, seed: 1 })
    const b = createAvatar({ shape, color: '#EB4699', size: 72, seed: 2 })
    const initial = a.svg('avatar-a')
    assert.match(initial, /<svg/)
    assert.match(initial, /#EB4699/)
    const bBefore = b.svg('avatar-b')
    for (let i = 0; i < 720; i++) {
      a.advance(1 / 60)
      if (i % 30 === 0) assert.doesNotMatch(a.svg('avatar-a'), /NaN|Infinity|undefined/)
    }
    assert.notEqual(a.svg('avatar-a'), initial, `${shape} must animate`)
    assert.equal(b.svg('avatar-b'), bBefore, 'advancing one instance must not move another')
    assert.doesNotMatch(a.svg('avatar-a'), /NaN|Infinity|undefined/)
    for (let i = 0; i < 720; i++) b.advance(1 / 60)
    assert.notEqual(a.svg('same-id'), b.svg('same-id'), 'different seeds must have independent phases')
  }
})

test('resting frame is deterministic and scales without raster assets', () => {
  const a = restingSvg('cloud', '#EB4699', '#FFFFFF')
  assert.equal(a, restingSvg('cloud', '#EB4699', '#FFFFFF'))
  assert.match(a, /viewBox=/)
  assert.doesNotMatch(a, /<image|NaN|Infinity|<script/)
  const motion = createAvatar({ shape: 'cloud' })
  motion.rest()
  const still = motion.svg('reduced')
  for (let i = 0; i < 120; i++) motion.advance(1 / 60)
  assert.equal(motion.svg('reduced'), still, 'reduced-motion resting output must remain static')
  const first = restingSvg('cloud', '#EB4699', '#FFFFFF', 'first')
  const second = restingSvg('cloud', '#EB4699', '#FFFFFF', 'second')
  const ids = (svg) => [...svg.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])
  assert.equal(ids(first).some((id) => ids(second).includes(id)), false, 'repeated SSR avatars must not share SVG definition IDs')
})
