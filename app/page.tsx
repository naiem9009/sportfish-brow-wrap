"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useScroll, useTransform } from "framer-motion"
import { ParticleBackground } from "@/components/particle-background"
import { InteractiveCursor } from "@/components/interactive-cursor"
import { LoadingScreen } from "@/components/loading-screen"
import { SEOContent } from "@/components/seo-content"
import { Header } from "@/components/navigation/header"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { LocationsSection } from "@/components/sections/locations-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FooterSection } from "@/components/sections/footer-section"
import { VideoModal } from "@/components/ui/video-modal"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentVideo, setCurrentVideo] = useState("")
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header")
      if (window.scrollY > 50) {
        header?.classList.add("bg-black/80", "backdrop-blur-xl", "border-b", "border-white/10")
        header?.classList.remove("bg-transparent")
      } else {
        header?.classList.remove("bg-black/80", "backdrop-blur-xl", "border-b", "border-white/10")
        header?.classList.add("bg-transparent")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openVideoModal = (videoUrl: string) => {
    setCurrentVideo(videoUrl)
    setShowVideoModal(true)
  }

  const closeVideoModal = () => {
    setShowVideoModal(false)
    setCurrentVideo("")
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <InteractiveCursor />
      <ParticleBackground />

      <VideoModal isOpen={showVideoModal} videoUrl={currentVideo} onClose={closeVideoModal} />

      <Header />
      <HeroSection onVideoPlay={openVideoModal} />
      <AboutSection />
      <BenefitsSection />
      <LocationsSection />
      <GallerySection />
      <SEOContent />
      <ContactSection />
      <FooterSection />

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Browwraps.com",
            description:
              "Custom boat brow wraps for sportfish in South Florida. Premium gloss black marine-grade film installation from Port St. Lucie to Miami.",
            url: "https://browwraps.com",
            telephone: "+1 (561) 371-2388",
            email: "oceanwraps@gmail.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Stuart",
              addressRegion: "FL",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "27.1973",
              longitude: "-80.2528",
            },
            areaServed: [
              {
                "@type": "City",
                name: "Port St. Lucie",
                addressRegion: "FL",
              },
              {
                "@type": "City",
                name: "Stuart",
                addressRegion: "FL",
              },
              {
                "@type": "City",
                name: "Jupiter",
                addressRegion: "FL",
              },
              {
                "@type": "City",
                name: "West Palm Beach",
                addressRegion: "FL",
              },
              {
                "@type": "City",
                name: "Boca Raton",
                addressRegion: "FL",
              },
              {
                "@type": "City",
                name: "Fort Lauderdale",
                addressRegion: "FL",
              },
              {
                "@type": "City",
                name: "Miami",
                addressRegion: "FL",
              },
            ],
            // openingHours: ["Mo-Su 09:00-17:00"],
            // sameAs: ["https://www.facebook.com/", "https://www.instagram.com/"],
          }),
        }}
      />
    </>
  )
}
