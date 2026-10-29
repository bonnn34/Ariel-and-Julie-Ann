"use client"

import { useSiteConfig } from "@/hooks/use-site-config"
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Church,
  Utensils,
  Phone,
  Mail,
  Users,
  Image as ImageIcon,
} from "lucide-react"

export function WeddingDetails() {
  const siteConfig = useSiteConfig()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#172C4C]">Wedding Details</h2>
      </div>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-[#739ACD] to-[#172C4C] rounded-2xl p-8 shadow-lg text-background">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-card/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Heart className="h-8 w-8 text-background" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold">
              {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}
            </h1>
            <p className="text-background/90 text-lg mt-1">{siteConfig.wedding.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-background/90">
          <Calendar className="h-5 w-5" />
          <span className="text-lg">{siteConfig.wedding.date}</span>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Couple Information */}
        <div className="bg-card rounded-xl shadow-sm border border-[#9AADE0] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FAF6EE] rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-[#172C4C]" />
            </div>
            <h3 className="text-xl font-bold text-[#172C4C]">The Couple</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#172C4C] block mb-1">Groom</label>
              <p className="text-lg font-semibold text-[#172C4C]">
                {siteConfig.couple.groom}
              </p>
              <p className="text-sm text-[#172C4C]">&quot;{siteConfig.couple.groomNickname}&quot;</p>
            </div>
            <div className="border-t border-[#9AADE0] pt-4">
              <label className="text-sm font-medium text-[#172C4C] block mb-1">Bride</label>
              <p className="text-lg font-semibold text-[#172C4C]">
                {siteConfig.couple.bride}
              </p>
              <p className="text-sm text-[#172C4C]">&quot;{siteConfig.couple.brideNickname}&quot;</p>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-card rounded-xl shadow-sm border border-[#9AADE0] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FAF6EE] rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#172C4C]" />
            </div>
            <h3 className="text-xl font-bold text-[#172C4C]">Event Details</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-[#172C4C] mt-0.5 flex-shrink-0" />
              <div>
                <label className="text-sm font-medium text-[#172C4C] block">Date</label>
                <p className="text-[#172C4C] font-medium">{siteConfig.wedding.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-[#172C4C] mt-0.5 flex-shrink-0" />
              <div>
                <label className="text-sm font-medium text-[#172C4C] block">Time</label>
                <p className="text-[#172C4C] font-medium">{siteConfig.ceremony.time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ceremony & Reception */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ceremony */}
        <div className="bg-card rounded-xl shadow-sm border border-[#9AADE0] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
              <Church className="h-5 w-5 text-foreground" />
            </div>
            <h3 className="text-xl font-bold text-[#172C4C]">Ceremony</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#172C4C] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#172C4C] font-medium">{siteConfig.ceremony.location}</p>
                <p className="text-sm text-[#172C4C] mt-1">{siteConfig.ceremony.venue}</p>
              </div>
            </div>
            {siteConfig.ceremony.map && (
              <a
                href={siteConfig.ceremony.map}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#172C4C] hover:text-[#172C4C]/80 font-medium transition-colors"
              >
                <MapPin className="h-4 w-4" />
                View on Google Maps
              </a>
            )}
          </div>
        </div>

        {/* Reception */}
        <div className="bg-card rounded-xl shadow-sm border border-[#9AADE0] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
              <Utensils className="h-5 w-5 text-floral-leaves" />
            </div>
            <h3 className="text-xl font-bold text-[#172C4C]">Reception</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#172C4C] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#172C4C] font-medium">{siteConfig.reception.location}</p>
                <p className="text-sm text-[#172C4C] mt-1">{siteConfig.reception.venue}</p>
              </div>
            </div>
            {siteConfig.reception.map && (
              <a
                href={siteConfig.reception.map}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#172C4C] hover:text-[#172C4C]/80 font-medium transition-colors"
              >
                <MapPin className="h-4 w-4" />
                View on Google Maps
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-card rounded-xl shadow-sm border border-[#9AADE0] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
            <Phone className="h-5 w-5 text-foreground" />
          </div>
          <h3 className="text-xl font-bold text-[#172C4C]">Contact Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteConfig.contact.groomPhone && (
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-[#172C4C] mt-0.5 flex-shrink-0" />
              <div>
                <label className="text-sm font-medium text-[#172C4C] block">
                  {siteConfig.couple.groomNickname}&apos;s Phone
                </label>
                <a
                  href={`tel:${siteConfig.contact.groomPhone}`}
                  className="text-[#172C4C] hover:text-[#172C4C]/80 font-medium transition-colors"
                >
                  {siteConfig.contact.groomPhone}
                </a>
              </div>
            </div>
          )}
          {siteConfig.contact.bridePhone && (
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-[#172C4C] mt-0.5 flex-shrink-0" />
              <div>
                <label className="text-sm font-medium text-[#172C4C] block">
                  {siteConfig.couple.brideNickname}&apos;s Phone
                </label>
                <a
                  href={`tel:${siteConfig.contact.bridePhone}`}
                  className="text-[#172C4C] hover:text-[#172C4C]/80 font-medium transition-colors"
                >
                  {siteConfig.contact.bridePhone}
                </a>
              </div>
            </div>
          )}
          {siteConfig.contact.email && (
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-[#172C4C] mt-0.5 flex-shrink-0" />
              <div>
                <label className="text-sm font-medium text-[#172C4C] block">Email</label>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-[#172C4C] hover:text-[#172C4C]/80 font-medium transition-colors break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gradient-to-br from-[#FAF6EE] to-[#F2F6FB] rounded-xl border border-[#9AADE0] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#739ACD] to-[#172C4C] rounded-lg flex items-center justify-center">
            <ImageIcon className="h-5 w-5 text-background" />
          </div>
          <h3 className="text-xl font-bold text-[#172C4C]">Quick Info</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card/60 rounded-lg p-4 backdrop-blur-sm">
            <label className="text-sm font-medium text-[#172C4C] block mb-1">Theme</label>
            <p className="text-[#172C4C] font-semibold">{siteConfig.wedding.theme}</p>
          </div>
          <div className="bg-card/60 rounded-lg p-4 backdrop-blur-sm">
            <label className="text-sm font-medium text-[#172C4C] block mb-1">Dress Code</label>
            <p className="text-[#172C4C] font-semibold">{siteConfig.dressCode.theme}</p>
          </div>
          <div className="bg-card/60 rounded-lg p-4 backdrop-blur-sm">
            <label className="text-sm font-medium text-[#172C4C] block mb-1">Hashtag</label>
            <p className="text-[#172C4C] font-semibold">{siteConfig.snapShare.hashtag[0]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
