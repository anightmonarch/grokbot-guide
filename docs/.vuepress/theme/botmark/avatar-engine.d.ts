import type { BotShape } from './geometry'

export interface Avatar {
  advance(seconds: number): void
  svg(id: string): string
  rest(): void
  gaze(point: [number, number] | null): void
  compact(value: boolean): void
}
export function createAvatar(options?: {
  shape?: BotShape
  color?: string
  eyes?: string
  size?: number
  seed?: number
}): Avatar
export function restingSvg(shape: BotShape, color: string, eyes: string, id?: string): string
export function updateSvg(host: HTMLElement, markup: string): void
export function pointerGaze(rect: DOMRect, pointer: { x: number; y: number }): [number, number]
