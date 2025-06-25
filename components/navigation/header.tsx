"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Phone, Menu, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { InfinityButton } from "@/components/ui/infinity-button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  // Close menu when clicking outside or on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-sky-400/20 rounded-full blur-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
          <Image src="/images/logo.jpeg" alt="Browwraps Logo" width={60} height={60} className="rounded-md" />
          <Badge
            variant="secondary"
            className="ml-1 bg-sky-500/20 text-sky-300 border-sky-400/30 hidden sm:inline-flex"
          >
            South Florida
          </Badge>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {["About", "Benefits", "Locations", "Gallery", "Contact"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-sky-400 transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Call Now Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a href="tel:+15613712388">
              <InfinityButton variant="outline" size="sm" className="group">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                >
                  <Phone className="w-4 h-4" />
                </motion.div>
                <span className="hidden sm:inline">Call Now</span>
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              </InfinityButton>
            </a>
          </motion.div>

          {/* Get Quote Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/#contact">
              <InfinityButton variant="primary" size="sm">
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Get Quote</span>
              </InfinityButton>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white relative z-10 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-3">
                {["About", "Benefits", "Locations", "Gallery", "Contact"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="block text-white hover:text-sky-400 transition-colors py-2 text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <a href="tel:+15613712388" className="block">
                    <InfinityButton variant="outline" size="md" className="w-full justify-center">
                      <Phone className="w-5 h-5" />
                      Call Now - (561) 371-2388
                    </InfinityButton>
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="block">
                    <InfinityButton variant="primary" size="md" className="w-full justify-center">
                      <Sparkles className="w-5 h-5" />
                      Get Your Free Quote
                    </InfinityButton>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
