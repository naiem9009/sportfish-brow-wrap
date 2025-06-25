"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ChevronRight, Play, ArrowDown, Sparkles, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FloatingElements } from "@/components/floating-elements"

interface HeroSectionProps {
  onVideoPlay: (videoUrl: string) => void
}

export function HeroSection({ onVideoPlay }: HeroSectionProps) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <FloatingElements />

      <motion.div style={{ opacity, scale, y: springY }} className="absolute inset-0 z-0">
        <Image
          src="/images/2.jpeg"
          alt="Luxury sportfish yacht with premium black brow wrap in South Florida"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-sky-900/20 to-blue-900/20"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="bg-sky-500/20 text-sky-300 border-sky-400/30 mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              South Florida's Premier Marine Customization
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Transform Your{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Sportfish
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Elevate your vessel's presence with our{" "}
            <span className="text-sky-400 font-semibold">premium gloss black brow wraps</span> - serving all of South
            Florida from Port St. Lucie to Miami.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Link href="/#contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-2xl hover:shadow-sky-500/25 transition-all duration-300 group text-white"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Get Your Quote
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="text-white border-white/30 hover:bg-white/10 backdrop-blur-sm group"
              onClick={() => onVideoPlay("/videos/v1.mp4")}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Process
            </Button>
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center items-center gap-8 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-sky-400" />
              <span>7-10 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-sky-400" />
              <span>1-2 Day Install</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ArrowDown className="h-6 w-6 text-white/60" />
      </motion.div>

      <svg className="absolute bottom-0 left-0 right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <motion.path
          fill="#000"
          fillOpacity="1"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </svg>
    </section>
  )
}
