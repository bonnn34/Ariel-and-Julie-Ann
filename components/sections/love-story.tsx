"use client"

import React, { useMemo } from "react"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import { motion, useReducedMotion } from "motion/react"
import { StorySection } from "@/components/StorySection"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"
import { useSiteConfig } from "@/hooks/use-site-config"
import { siteConfig as defaultSiteConfig } from "@/content/site"
import { parseWeddingDate } from "@/lib/wedding-date"
import { SkyBackdrop } from "@/components/sky-backdrop"
import "@/components/loader/loading-screen.css"
import { StoryGlyphText } from "@/lib/story-glyph-text"
import { PuhonText } from "@/components/puhon-closing"

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const aboveTheBeyond = localFont({
  src: "../../Font/above-the-beyond-script.otf",
  display: "swap",
  variable: "--font-above-beyond",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const revealEase = [0.22, 1, 0.36, 1] as const


// Soft white edge so text stays crisp over the sky backdrop
const onBgGlow = "0 1px 0 rgb(250 246 238 / 85%), 0 0 12px rgb(250 246 238 / 70%)"

function formatStoryParagraph(
  paragraph: string,
  groom: string,
  bride: string,
): string {
  return paragraph
    .replace(/\{groom\}/g, groom)
    .replace(/\{bride\}/g, bride)
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span
        className="h-px w-10 sm:w-16"
        style={{ background: "linear-gradient(to right, transparent, var(--color-motif-yellow))" }}
      />
      <span className="h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5" style={{ background: "var(--color-motif-accent)" }} aria-hidden />
      <span
        className="h-px w-10 sm:w-16"
        style={{ background: "linear-gradient(to left, transparent, var(--color-motif-yellow))" }}
      />
    </div>
  )
}

function LoveStoryTitle({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <h1
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block pb-1 uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: "var(--color-welcome-navy)",
          textShadow: onBgGlow,
        }}
      >
        <StoryGlyphText text={title} />
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto mt-2 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2.5 sm:leading-[0.9] md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: "var(--color-welcome-heading)",
          textShadow: onBgGlow,
        }}
      >
        <StoryGlyphText text={subtitle} />
      </span>
      <span className="sr-only">{subtitle}</span>
    </h1>
  )
}

// "Join us" invitation under the closing verse: date, venue, a line of wording and the RSVP button
function ClosingCta() {
  const siteConfig = useSiteConfig()
  const cta = siteConfig.loveStory.closingCta ?? defaultSiteConfig.loveStory.closingCta
  const { dayOfWeek, month, day, year } = parseWeddingDate(siteConfig.ceremony.date ?? siteConfig.wedding.date)
  const venue = siteConfig.ceremony.location || siteConfig.wedding.venue
  const deadline = siteConfig.details.rsvp.deadline?.trim()
  const navy = "var(--color-welcome-navy)"

  return (
    <div className="mt-12 flex flex-col items-center gap-3 sm:mt-14 sm:gap-4" style={{ color: navy }}>
      <p className={`${aboveTheBeyond.className} ${sectionType.script}`}>{cta.heading}</p>
      <div className={`${cinzel.className} ${sectionType.label} font-semibold uppercase tracking-[0.16em]`}>
        <p>{`${dayOfWeek}, ${month} ${day}, ${year}`}</p>
        {venue ? <p className="mt-1">{venue}</p> : null}
      </div>
      {cta.text ? (
        <p className={`font-goudy-italic max-w-md ${sectionType.textRelaxed}`}>
          <StoryGlyphText text={cta.text} />
        </p>
      ) : null}
      <a
        href={cta.href}
        className={`${cinzel.className} mt-2 inline-flex min-h-12 w-[min(80vw,19rem)] items-center justify-center rounded-full text-[0.8125rem] font-bold uppercase tracking-[0.32em] indent-[0.32em] no-underline transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-motif-teal)]`}
        style={{
          background: navy,
          color: "var(--color-welcome-bg)",
          boxShadow: "0 10px 24px color-mix(in srgb, var(--color-welcome-navy) 28%, transparent)",
        }}
      >
        {cta.buttonText}
      </a>
      {deadline ? (
        <p className={`font-goudy-italic ${sectionType.label}`}>Kindly RSVP by {deadline}</p>
      ) : null}
    </div>
  )
}

function chapterTextFromParagraphs(
  paragraphs: readonly string[],
  groom: string,
  bride: string,
) {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={
            paragraphs.length > 1 && index < paragraphs.length - 1 ? "mb-4" : undefined
          }
        >
          <StoryGlyphText text={formatStoryParagraph(paragraph, groom, bride)} />
        </p>
      ))}
    </>
  )
}

// skyBackdrop: false when a parent already paints one sky behind this and the previous section
export function LoveStory({ skyBackdrop = true }: { skyBackdrop?: boolean } = {}) {
  const siteConfig = useSiteConfig()
  const loveStory = siteConfig.loveStory ?? defaultSiteConfig.loveStory
  const intro = loveStory.intro ?? defaultSiteConfig.loveStory.intro
  const photoAlt = loveStory.photoAlt ?? defaultSiteConfig.loveStory.photoAlt
  const hasClosing = Boolean(
    loveStory.closingEyebrow ||
      loveStory.closingHashtag ||
      loveStory.closingQuoteLead ||
      loveStory.closingQuote ||
      loveStory.closingCta?.heading,
  )
  const reduceMotion = useReducedMotion()

  const groom =
    siteConfig.couple.groomNickname || siteConfig.couple.groom
  const bride =
    siteConfig.couple.brideNickname || siteConfig.couple.bride

  const chapters = useMemo(
    () => loveStory.chapters ?? defaultSiteConfig.loveStory.chapters,
    [loveStory.chapters],
  )

  return (
    <div
      id="love-story"
      // z-[2] + solid cream: the section sits above and hides the circle pattern (PlainBubbles, z-index 1)
      className={`love-story-root ${theSeasons.variable} ${aboveTheBeyond.variable} relative z-[2] min-h-screen w-full overflow-x-hidden pb-5 md:pb-10`}
      style={{ background: "var(--color-welcome-bg)" }}
    >
      {skyBackdrop && <SkyBackdrop haze />}
      <header
        className="love-story-header relative z-20 pb-6 pt-24 text-center sm:pb-12 sm:pt-36 md:pb-14 md:pt-44"
      >
        <motion.div
          className="relative mx-auto max-w-3xl @container/love-story"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: revealEase }}
        >
          <LoveStoryTitle title={loveStory.title} subtitle={loveStory.subtitle} />
          <div className="mt-4 sm:mt-5">
            <OrnamentalDivider />
          </div>
          {intro ? (
            <p className="love-story-intro mx-auto mt-5 max-w-xl sm:mt-6">
              <StoryGlyphText text={intro} />
            </p>
          ) : null}
        </motion.div>
      </header>

      {chapters.map((chapter, index) => (
        <StorySection
          key={`${chapter.image}-${index}`}
          title={chapter.title}
          // Sides (and cream/navy bands) alternate automatically; a chapter's layout overrides it
          theme={index % 2 ? "dark" : "light"}
          layout={chapter.layout ?? (index % 2 ? "image-right" : "image-left")}
          imageSrc={chapter.image}
          imageAlt={formatStoryParagraph(chapter.imageAlt || photoAlt, groom, bride)}
          imagePosition={chapter.imagePosition}
          subheader={chapter.subheader}
          caption={chapter.caption}
          text={chapterTextFromParagraphs(chapter.paragraphs, groom, bride)}
          chapterIndex={index}
          isFirst={index === 0}
          isLast={index === chapters.length - 1}
        />
      ))}

      {hasClosing && (
        <footer
          className="relative z-20 px-4 pb-16 pt-8 text-center sm:px-6 sm:pb-20 sm:pt-10 md:pb-24 md:px-8 md:pt-12"
        >
          <motion.div
            className="relative mx-auto max-w-xl px-2"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, delay: 0.08, ease: revealEase }}
          >
            <OrnamentalDivider />
            <PuhonText className="mt-6 sm:mt-8" />
            {loveStory.closingCta?.heading ? <ClosingCta /> : null}
          </motion.div>
        </footer>
      )}
    </div>
  )
}
