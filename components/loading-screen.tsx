/**
 * Developed by Md Naim Hossen
 * Full Stack Developer
 *
 * WhatsApp: +880 1776-556776
 * Email: developernaim83@gmail.com
 */


"use client"

import { motion } from "framer-motion"
import { Anchor, Waves } from "lucide-react"
import Image from "next/image"

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="relative mb-8"
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Image src={"/images/logo.jpeg"} alt="Browwraps Logo" width={80} height={80} className="rounded-md flex items-center justify-center place-self-center" />
          <motion.div
            className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        <motion.h1
          className="text-2xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Browwraps
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-2 text-sky-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Waves className="h-5 w-5" />
          <span>Loading Premium Experience</span>
          <Waves className="h-5 w-5" />
        </motion.div>

        <motion.div
          className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-sky-600 to-blue-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
