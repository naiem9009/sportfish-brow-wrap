/**
 * Developed by Md Naim Hossen
 * Full Stack Developer
 *
 * WhatsApp: +880 1776-556776
 * Email: developernaim83@gmail.com
 */


"use client"

import { motion } from "framer-motion"
import { Anchor, Droplets, Shield, Sparkles, Star, Zap } from "lucide-react"

export function FloatingElements() {
  const elements = [
    { icon: Anchor, delay: 0, duration: 6 },
    { icon: Droplets, delay: 1, duration: 8 },
    { icon: Shield, delay: 2, duration: 7 },
    { icon: Sparkles, delay: 3, duration: 9 },
    { icon: Star, delay: 4, duration: 5 },
    { icon: Zap, delay: 5, duration: 6 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((Element, index) => (
        <motion.div
          key={index}
          className="absolute text-sky-400/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 0,
            scale: 0.5,
          }}
          animate={{
            y: -100,
            rotate: 360,
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Element.duration,
            delay: Element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            left: `${10 + index * 15}%`,
          }}
        >
          <Element.icon className="h-8 w-8" />
        </motion.div>
      ))}
    </div>
  )
}
