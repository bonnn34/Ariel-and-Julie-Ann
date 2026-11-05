"use client"

import React from "react"
import localFont from "next/font/local"
import { motion, useReducedMotion } from "motion/react"
import { sectionType, storyChapterTitleSize } from "@/lib/section-typography"
import Image from "next/image"
import { TornPaperEdge } from "./TornPaperEdge"
import { StoryGlyphText } from "@/lib/story-glyph-text"

const theSeasons = localFont({
  src: "../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const lightBg = "var(--color-welcome-bg)"
const darkBg = "var(--color-welcome-green)"
const revealEase = [0.22, 1, 0.36, 1] as const

interface StorySectionProps {
  imageSrc?: string
  imageAlt?: string
  // Which part of the photo stays in frame (CSS object-position), e.g. "center 20%"
  imagePosition?: string
  // Place or name shown under the photo, inside its frame
  caption?: string
  title?: string
  // Small caps line under the title
  subheader?: string
  text: React.ReactNode
  layout: "image-left" | "image-right"
  theme: "dark" | "light"
  isFirst?: boolean
  isLast?: boolean
  chapterIndex?: number
}

/**
 * One love story chapter: a full-width cream or navy band with a tilted, framed
 * photo beside left-aligned text. Photo and text stay side by side at every width,
 * and light bands draw the zigzag edge where they meet a navy band.
 */
export const StorySection: React.FC<StorySectionProps> = ({
  imageSrc,
  imageAlt,
  imagePosition,
  caption,
  title,
  subheader,
  text,
  layout,
  theme,
  isFirst = false,
  isLast = false,
  chapterIndex = 0,
}) => {
  const reduceMotion = useReducedMotion()
  const isDark = theme === "dark"
  const photoLeft = layout === "image-left"
  const bandBg = isDark ? darkBg : lightBg
  const ink = isDark ? lightBg : "var(--color-welcome-navy)"
  const tilt = photoLeft ? -2 : 2

  const photoFrom = reduceMotion
    ? { opacity: 1, x: 0, rotate: tilt }
    : { opacity: 0, x: photoLeft ? -36 : 36, rotate: 0 }
  const textFrom = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }

  return (
    // Light bands stack above navy ones so their zigzag edges overlap the neighbouring band
    <div
      className={`${theSeasons.variable} relative ${isDark ? "z-[2]" : "z-[3]"}`}
      style={{ background: bandBg }}
    >
      {!isDark && !isFirst && (
        <div className="pointer-events-none absolute left-0 top-0 z-20 -mt-[8px] w-full md:-mt-[20px]">
          <TornPaperEdge flipped color={bandBg} />
        </div>
      )}
      {/* A navy band only needs its own edge when it closes the section */}
      {(!isDark || isLast) && (
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 -mb-[8px] w-full md:-mb-[20px]">
          <TornPaperEdge color={bandBg} />
        </div>
      )}

      <div
        className={`relative z-10 mx-auto flex max-w-5xl items-center gap-3 px-4 py-12 sm:gap-8 sm:px-8 sm:py-16 md:gap-16 md:px-10 md:py-24 ${
          photoLeft ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {imageSrc ? (
          <motion.div
            className="w-[45%] shrink-0 md:w-5/12"
            initial={photoFrom}
            whileInView={{ opacity: 1, x: 0, rotate: tilt }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.95, ease: revealEase }}
          >
            <figure
              className="m-0 w-full p-1.5 md:p-3"
              style={{
                background: isDark
                  ? "color-mix(in srgb, var(--color-motif-teal) 55%, var(--color-welcome-navy))"
                  : "#FFFFFF",
                boxShadow: isDark
                  ? "0 10px 28px rgb(0 0 0 / 28%)"
                  : "0 10px 26px color-mix(in srgb, var(--color-welcome-navy) 14%, transparent)",
              }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={encodeURI(imageSrc)}
                  alt={imageAlt ?? ""}
                  fill
                  sizes="(max-width: 768px) 45vw, 420px"
                  className="object-cover"
                  style={{ objectPosition: imagePosition || "center 30%" }}
                  quality={85}
                  priority={chapterIndex < 1}
                />
              </div>
              {caption ? (
                <figcaption
                  className="font-goudy-italic px-1 pt-1.5 text-center text-[0.6875rem] leading-snug sm:text-[0.8125rem] md:pt-2.5 md:text-[0.9375rem]"
                  style={{ color: isDark ? lightBg : "var(--color-welcome-navy)" }}
                >
                  {caption}
                </figcaption>
              ) : null}
            </figure>
          </motion.div>
        ) : null}

        <motion.div
          className="@container/story min-w-0 flex-1 text-left"
          style={{ color: ink }}
          initial={textFrom}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.85, delay: 0.15, ease: revealEase }}
        >
          {title ? (
            <h2
              className={`${theSeasons.className} mb-1.5 uppercase leading-tight tracking-[0.08em] sm:mb-2`}
              style={{ fontSize: storyChapterTitleSize, color: ink }}
            >
              <StoryGlyphText text={title} />
            </h2>
          ) : null}
          {subheader ? (
            <p
              className="story-open-date !mb-3 sm:!mb-4 md:!mb-5"
              style={{ color: ink, opacity: 0.8, letterSpacing: "0.16em" }}
            >
              <StoryGlyphText text={subheader} />
            </p>
          ) : null}
          <div className={`font-goudy-italic lg:leading-[1.7] ${sectionType.textRelaxed}`}>{text}</div>
        </motion.div>
      </div>
    </div>
  )
}
