import type { CSSProperties } from "react"

/** Coastal sunset palette — peach, dusty rose, muted teal, blue-gray, lavender-blue */
export const coastalPalette = {
  peach: "#F2D087",
  lavenderBlue: "#F5EDDF",
  blueGray: "#ABAEB0",
  dustyRose: "#ABAEB0",
  teal: "#4F6373",
  body: "#101D3A",
  title: "#4F6373",
  deep: "#4F6373",
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
  "0 2px 4px rgba(250, 246, 238, 0.85), 0 0 16px rgba(171, 174, 176, 0.45)"
