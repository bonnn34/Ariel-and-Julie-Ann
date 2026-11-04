"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import localFont from "next/font/local"
import { useSiteConfig } from "@/hooks/use-site-config"
import { parseWeddingDate } from "@/lib/wedding-date"
import { CoverPhotoSlideshow } from "@/components/loader/InviteCover"
import { siteConfig as defaultSiteConfig } from "@/content/site"
import "@/components/loader/invite-cover.css"
import "./hero.css"

// Classic Roman capitals for every line of small type (Font/Cinzel)
const cinzel = localFont({
  src: [
    { path: "../../Font/Cinzel/Cinzel-Regular.otf", weight: "400", style: "normal" },
    { path: "../../Font/Cinzel/Cinzel-Bold.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
})

// Brush script for the couple's names
const playlistScript = localFont({
  src: "../../Font/playlist-script/Playlist Script.otf",
  display: "swap",
})

const entryEase = [0.22, 1, 0.36, 1] as const

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

/** true below 768px; null until measured so neither photo set loads before we know */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return isMobile
}

/**
 * Main page hero: full-screen couple photos cross-fading behind the invitation
 * wording — names in script, the date row, venue, a closing line and an RSVP button.
 */
export function Hero() {
  const siteConfig = useSiteConfig()
  const homeHero = siteConfig.homeHero ?? defaultSiteConfig.homeHero
  const defaults = defaultSiteConfig.homeHero
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 40)
    return () => window.clearTimeout(id)
  }, [])

  const photos = useMemo(() => {
    const mobile = homeHero.backgroundPhotos ?? defaults.backgroundPhotos ?? []
    const desktop = homeHero.backgroundPhotosDesktop ?? defaults.backgroundPhotosDesktop ?? []
    return {
      mobile: mobile.map((src) => encodeURI(src)),
      desktop: (desktop.length > 0 ? desktop : mobile).map((src) => encodeURI(src)),
    }
  }, [homeHero.backgroundPhotos, homeHero.backgroundPhotosDesktop, defaults])

  const parsedDate = useMemo(
    () => parseWeddingDate(siteConfig.ceremony.date ?? siteConfig.wedding.date),
    [siteConfig.ceremony.date, siteConfig.wedding.date],
  )

  const groomName = siteConfig.couple.groomNickname
  const brideName = siteConfig.couple.brideNickname
  const ceremonyTime = (siteConfig.ceremony.time ?? siteConfig.wedding.time ?? "").toUpperCase()
  const venue = siteConfig.ceremony.location || siteConfig.wedding.venue
  const inviteLine = homeHero.inviteLine ?? defaults.inviteLine
  const closingLine = homeHero.closingLine ?? defaults.closingLine
  const rsvpText = homeHero.rsvpButtonText ?? defaults.rsvpButtonText
  const rsvpHref = homeHero.rsvpHref ?? defaults.rsvpHref

  const fadeUp = (delay: number) => {
    if (reduceMotion) {
      return { initial: false as const, animate: { opacity: 1, y: 0 } }
    }
    return {
      initial: { opacity: 0, y: 18 },
      animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
      transition: { duration: 1, delay, ease: entryEase },
    }
  }

  return (
    <section
      id="home"
      className={`${cinzel.className} home-hero-photo relative -mt-12 flex min-h-[100dvh] w-full flex-col overflow-hidden sm:-mt-14 md:-mt-16`}
    >
      <div className="home-hero-photo__bg" aria-hidden="true">
        {isMobile !== null && (
          <CoverPhotoSlideshow
            key={isMobile ? "mobile" : "desktop"}
            photos={isMobile ? photos.mobile : photos.desktop}
            paused={false}
            reduceMotion={reduceMotion}
          />
        )}
      </div>
      <div className="home-hero-photo__shade" aria-hidden="true" />

      <div className="home-hero-photo__content">
        {/* Top: opening line under the navbar, over the soft top shade */}
        <div className="home-hero-photo__top">
          {inviteLine && (
            <motion.p className="home-hero-photo__invite" {...fadeUp(0.1)}>
              {inviteLine}
            </motion.p>
          )}
        </div>

        {/* Bottom: everything else sits low over the navy fade, leaving the couple's faces clear */}
        <div className="home-hero-photo__bottom">

        <motion.h1
          className="home-hero-photo__names"
          aria-label={`${groomName} and ${brideName}`}
          {...fadeUp(0.25)}
        >
          <span className={`${playlistScript.className} home-hero-photo__name`} aria-hidden="true">
            {groomName}
          </span>
          <span className="home-hero-photo__plus" aria-hidden="true">
            +
          </span>
          <span className={`${playlistScript.className} home-hero-photo__name`} aria-hidden="true">
            {brideName}
          </span>
        </motion.h1>

        <motion.div
          className="home-hero-photo__date"
          {...fadeUp(0.42)}
          aria-label={`${parsedDate.dayOfWeek}, ${parsedDate.month} ${parsedDate.day}, ${parsedDate.year}${ceremonyTime ? ` at ${ceremonyTime}` : ""}`}
        >
          <span className="home-hero-photo__date-side" aria-hidden="true">
            {parsedDate.dayOfWeek}
          </span>
          <span className="home-hero-photo__date-center" aria-hidden="true">
            <span className="home-hero-photo__date-month">{parsedDate.month}</span>
            <span className="home-hero-photo__date-day">{pad2(Number(parsedDate.day))}</span>
            <span className="home-hero-photo__date-year">{parsedDate.year}</span>
          </span>
          <span className="home-hero-photo__date-side" aria-hidden="true">
            {ceremonyTime}
          </span>
        </motion.div>

        {venue && (
          <motion.p className="home-hero-photo__venue" {...fadeUp(0.56)}>
            {venue}
          </motion.p>
        )}

        {closingLine && (
          <motion.p className="home-hero-photo__closing" {...fadeUp(0.66)}>
            {closingLine}
          </motion.p>
        )}

        {rsvpText && (
          <motion.a href={rsvpHref} className="home-hero-photo__rsvp" {...fadeUp(0.78)}>
            {rsvpText}
          </motion.a>
        )}
        </div>
      </div>
    </section>
  )
}
