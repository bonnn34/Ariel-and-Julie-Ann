import type { CSSProperties } from "react"

/** Coastal sunset palette — peach, dusty rose, muted teal, blue-gray, lavender-blue */
export const coastalPalette = {
  peach: "#9CC5E5",
  lavenderBlue: "#F2F6FB",
  blueGray: "#9AADE0",
  dustyRose: "#9AADE0",
  teal: "#739ACD",
  body: "#172C4C",
  title: "#172C4C",
  deep: "#172C4C",
  cream: "#FAF6EE",
} as const

export const displayScript: CSSProperties = {
  fontFamily: "'Brightwall', cursive",
  fontWeight: 400,
}

export const coastalLightBg = coastalPalette.lavenderBlue
export const coastalDarkBg = coastalPalette.teal

export const coastalLightGradient = coastalLightBg
export const coastalDarkGradient = coastalDarkBg

export const coastalCardShadow = `0 16px 48px color-mix(in srgb, ${coastalPalette.teal} 14%, transparent), inset 0 1px 0 rgba(250, 246, 238, 0.72)`

export const coastalTitleShadow =
  "0 2px 4px rgba(250, 246, 238, 0.85), 0 0 16px rgba(154, 173, 224, 0.45)"
