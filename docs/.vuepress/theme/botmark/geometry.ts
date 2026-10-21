/** Existing site slots; geometry and motion now come from the official engine. */
export type BotMarkSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export const BOTMARK_SIZES: Record<BotMarkSize, number> = { xs: 16, sm: 26, md: 44, lg: 72, xl: 128 }
export type BotShape = 'circle' | 'blob' | 'drop' | 'cloud' | 'hex' | 'pill' | 'squircle'
