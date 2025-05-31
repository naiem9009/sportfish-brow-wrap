/**
 * Developed by Md Naim Hossen
 * Full Stack Developer
 *
 * WhatsApp: +880 1776-556776
 * Email: developernaim83@gmail.com
 */

"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  Anchor,
  Shield,
  Droplets,
  Sun,
  Send,
  Star,
  Play,
  ArrowDown,
  Sparkles,
  Zap,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin,
  X,
  CheckCircle,
  Ship,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ParticleBackground } from "@/components/particle-background"
import { FloatingElements } from "@/components/floating-elements"
import { InteractiveCursor } from "@/components/interactive-cursor"
import { LoadingScreen } from "@/components/loading-screen"
import { SEOContent } from "@/components/seo-content"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentVideo, setCurrentVideo] = useState("")
  const heroRef = useRef(null)
  const [formLoading, setFormLoading] = useState(false)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const { toast } = useToast()

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      const data = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        location: formData.get("location") as string,
        boatDetails: formData.get("boatDetails") as string,
        message: formData.get("message") as string,
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      console.log(result);
      

      if (result?.success) {
        toast({
          title: "Success!",
          description: result?.message,
          variant: "default",
          style: {
              position: "fixed",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
          }
        })
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
          style: {
              position: "fixed",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
          }
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setFormLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <InteractiveCursor />
      <ParticleBackground />

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-video mx-4 bg-black rounded-xl overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={closeVideoModal}
                aria-label="Close video modal"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Video Element */}
              <video
                src={currentVideo}
                className="w-full h-full object-cover"
                muted
                autoPlay
                playsInline
                preload="auto"
              >
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <Image src={"/images/logo.jpeg"} alt="Browwraps Logo" width={60} height={60} className="rounded-md" />
            {/* <span className="text-xl font-bold text-white">Browwraps</span> */}
            <Badge variant="secondary" className="ml-1 bg-sky-500/20 text-sky-300 border-sky-400/30">
              South Florida
            </Badge>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href={"/#contact"}>
                <Button className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg hover:shadow-sky-500/25 transition-all duration-300 text-white">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Quote
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.button
            className="md:hidden text-white relative z-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={isMenuOpen ? { rotate: 45 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </motion.div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                {["About", "Benefits", "Locations", "Gallery", "Contact"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-white hover:text-sky-400 transition-colors py-2 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Link href={"/#contact"}>
                    <Button className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 w-full text-white">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Quote
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

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
              <Badge className="bg-sky-500/20 text-sky-300 border-sky-400/30 mb-4">
                <Zap className="mr-1 h-3 w-3" />
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
              <Link href={"/#contact"}>
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
                onClick={() => openVideoModal("/videos/v1.mp4")}
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

      <section id="about" className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/20 to-black" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-400/30 mb-6">
              <Anchor className="mr-1 h-3 w-3" />
              What We Do
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              What is a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                Boat Brow Wrap?
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-sky-600 to-blue-600 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-white/80 leading-relaxed">
              A boat brow wrap is a premium gloss black film applied to the brow area of a sportfishing yacht. Designed
              to simulate the sleek, tinted look of extended glass, this high-end wrap transforms the otherwise blank
              white space above your windows into a striking gloss black panel that seamlessly integrates with your
              existing windows.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                {/* Video Container */}
                <video src="/videos/v2.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline>
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                <motion.div className="absolute inset-0 bg-gradient-to-r from-sky-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold mb-3">Premium Marine-Grade Film</h3>
                    <p className="text-white/80">
                      Crafted from the highest quality gloss black paint protection film, engineered specifically for
                      harsh South Florida marine environments.
                    </p>
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold mb-6 text-sky-400">High-Performance Protection with Style</h3>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Our brow wraps aren't just about aesthetics—they're engineered for performance in South Florida's
                  harsh marine conditions. Using premium gloss black paint protection film, not standard vinyl, we
                  deliver unmatched durability and style.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: <Shield className="h-6 w-6" />,
                    title: "7-10 Year Durability",
                    description:
                      "Marine-grade film engineered to withstand harsh UV, salt, and spray conditions of South Florida waters.",
                    color: "from-emerald-500 to-green-500",
                  },
                  {
                    icon: <Droplets className="h-6 w-6" />,
                    title: "Hydrophobic Surface",
                    description:
                      "Advanced water-repelling technology keeps your brow pristine with minimal maintenance.",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: <Sun className="h-6 w-6" />,
                    title: "Self-Healing Technology",
                    description: "Revolutionary film that repairs minor scratches and swirls automatically with heat.",
                    color: "from-orange-500 to-yellow-500",
                  },
                  {
                    icon: <Zap className="h-6 w-6" />,
                    title: "Anti-Adhesive Properties",
                    description: "Dirt, salt, and grime struggle to stick, maintaining that showroom finish longer.",
                    color: "from-purple-500 to-pink-500",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300 flex items-center`}
                      >
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2 text-sky-400 group-hover:text-sky-300 transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-white/80 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="benefits"
        className="bg-gradient-to-b from-black via-sky-950/30 to-black text-white py-24 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 50%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-400/30 mb-6">
              <Award className="mr-1 h-3 w-3" />
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Why Choose a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                Brow Wrap?
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-sky-600 to-blue-600 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-white/80 leading-relaxed">
              Transform your yacht's appearance while protecting your investment with our premium brow wrap service,
              trusted by yacht owners throughout South Florida.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                title: "Enhanced Aesthetics",
                description: "Instantly elevate your boat's visual appeal with a sleek, continuous design line.",
                icon: <Sparkles className="h-8 w-8" />,
                gradient: "from-pink-500 to-rose-500",
              },
              {
                title: "Cost-Effective",
                description: "Premium alternative to expensive painting or glass replacement solutions.",
                icon: <Award className="h-8 w-8" />,
                gradient: "from-emerald-500 to-green-500",
              },
              {
                title: "UV Protection",
                description: "Shield your vessel's brow from Florida's intense sun damage and oxidation.",
                icon: <Shield className="h-8 w-8" />,
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Easy Maintenance",
                description: "Effortless upkeep with just soap and water - no waxing required.",
                icon: <Droplets className="h-8 w-8" />,
                gradient: "from-purple-500 to-indigo-500",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-white">{benefit.icon}</div>
                  </motion.div>

                  <h3 className="text-xl font-bold mb-4 group-hover:text-sky-400 transition-colors">{benefit.title}</h3>
                  <p className="text-white/80 leading-relaxed">{benefit.description}</p>

                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-sky-900/30 to-blue-900/30 rounded-3xl p-12 backdrop-blur-sm border border-sky-500/20"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-sky-400">Fast, On-Water Installation</h3>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                No need to haul your boat or disrupt your schedule. Our expert installation takes just 1-2 days with
                your yacht remaining in the water at your South Florida marina. We use precision templates and
                professional-grade tools to ensure a seamless fit that follows your vessel's natural lines perfectly.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: <Clock className="h-6 w-6" />, text: "1-2 Day Installation" },
                  { icon: <Anchor className="h-6 w-6" />, text: "On-Water Service" },
                  { icon: <Award className="h-6 w-6" />, text: "Professional Grade" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 justify-center"
                  >
                    <div className="text-sky-400">{item.icon}</div>
                    <span className="text-white font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="locations" className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/10 to-black/80" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-400/30 mb-6">
              <MapPin className="mr-1 h-3 w-3" />
              Service Areas
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Serving All of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                South Florida
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-sky-600 to-blue-600 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-white/80 leading-relaxed">
              From Port St. Lucie to Miami, our mobile installation team brings premium brow wrap services directly to
              your marina or dock.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold mb-6 text-sky-400">Our Service Locations</h3>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Whether you're docked in Port St. Lucie, cruising through Jupiter, or based in Fort Lauderdale, we
                  proudly offer mobile installation services along the entire South Florida coastline.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  "Port St. Lucie",
                  "Fort Pierce",
                  "Vero Beach",
                  "Stuart",
                  "Jupiter",
                  "West Palm Beach",
                  "Boca Raton",
                  "Fort Lauderdale",
                  "Miami",
                  "Palm Beach",
                  "Pompano Beach",
                  "Hollywood",
                ].map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-sky-400 flex-shrink-0" />
                    <span className="text-white">{location}</span>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-r from-sky-900/30 to-blue-900/30 rounded-xl border border-sky-500/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-sky-500/20 text-sky-400">
                    <Ship className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-sky-400 mb-2">Our Hometown: Stuart, FL</h4>
                    <p className="text-white/80">
                      Based in Stuart, we're centrally located to service the entire South Florida coastline with quick
                      response times and local expertise.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[600px] rounded-2xl overflow-hidden border border-gray-400">
                <Image
                  src="/images/dark.jpg"
                  alt="Map of South Florida service areas for boat brow wraps"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                {/* Location markers */}
                {[
                  { name: "Port St. Lucie", top: "15%", left: "50%" },
                  { name: "Stuart", top: "25%", left: "55%" },
                  { name: "Jupiter", top: "35%", left: "60%" },
                  { name: "West Palm Beach", top: "45%", left: "65%" },
                  { name: "Boca Raton", top: "55%", left: "70%" },
                  { name: "Fort Lauderdale", top: "65%", left: "75%" },
                  { name: "Miami", top: "75%", left: "80%" },
                ].map((marker, index) => (
                  <motion.div
                    key={index}
                    className="absolute z-10"
                    style={{ top: marker.top, left: marker.left }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <div className="w-4 h-4 bg-sky-400 rounded-full">
                        <motion.div
                          className="absolute inset-0 bg-sky-400/50 rounded-full"
                          animate={{ scale: [1, 1.8, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                      </div>
                      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/70 px-2 py-1 rounded text-xs">
                        {marker.name}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="gallery"
        className="bg-gradient-to-b from-black to-sky-950/30 text-white py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-400/30 mb-6">
              <Star className="mr-1 h-3 w-3" />
              Our Work
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Projects</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-sky-600 to-blue-600 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-white/80 leading-relaxed">
              Browse our portfolio of premium brow wrap installations on sportfish throughout South Florida.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: "/images/3.jpeg" },
              { image: "/images/4.jpeg" },
              { image: "/images/5.jpeg" },
              { image: "/images/6.jpeg" },
              { image: "/images/7.jpeg" },
              { image: "/images/8.jpeg" },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative h-80 rounded-xl overflow-hidden">
                  <Image
                    src={project.image || ""}
                    alt={`Boat Image`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SEOContent />

      <section
        id="contact"
        className="bg-gradient-to-b from-sky-950/30 to-black text-white py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-400/30 mb-6">
              <Send className="mr-1 h-3 w-3" />
              Get Started
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                Upgrade Your Look?
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-sky-600 to-blue-600 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-white/80 leading-relaxed">
              Transform your yacht with a custom-installed boat brow wrap. Contact us today for a quote and give your
              vessel the bold, sophisticated look it deserves.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-sky-600/10 to-blue-600/10"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-8 text-sky-400">Get Your Custom Quote</h3>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-sky-300">
                          First Name *
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          disabled={formLoading}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50"
                          placeholder="Naim"
                          required
                        />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-sky-300">
                          Last Name *
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          disabled={formLoading}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50"
                          placeholder="Hossen"
                          required
                        />
                      </motion.div>
                    </div>

                    <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-sky-300">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        disabled={formLoading}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50"
                        placeholder="naim@example.com"
                        required
                      />
                    </motion.div>

                    <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2 text-sky-300">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        disabled={formLoading}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50"
                        placeholder="+1 (555) 123-4567"
                      />
                    </motion.div>

                    <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="location" className="block text-sm font-medium mb-2 text-sky-300">
                        Marina Location *
                      </label>
                      <Input
                        id="location"
                        name="location"
                        disabled={formLoading}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50"
                        placeholder="Stuart, FL"
                        required
                      />
                    </motion.div>

                    <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="boatDetails" className="block text-sm font-medium mb-2 text-sky-300">
                        Boat Details *
                      </label>
                      <Input
                        id="boatDetails"
                        name="boatDetails"
                        placeholder="2025 Viking 68"
                        disabled={formLoading}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50"
                        required
                      />
                    </motion.div>

                    <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-sky-300">
                        Additional Details
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        disabled={formLoading}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 resize-none disabled:opacity-50"
                        placeholder="Tell us about your project, timeline, or any specific requirements..."
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: formLoading ? 1 : 1.02 }}
                      whileTap={{ scale: formLoading ? 1 : 0.98 }}
                    >
                      <Button
                        disabled={formLoading}
                        type="submit"
                        className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-2xl hover:shadow-sky-500/25 transition-all duration-300 py-6 text-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        {formLoading ? "Sending..." : "Send My Quote Request"}
                        <Sparkles className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden group">
                <Image
                  src="/images/2.jpeg"
                  alt="Premium sportfish yacht with black brow wrap in South Florida"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-sky-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold mb-4">Premium Service Excellence</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Our team of certified marine specialists ensures flawless installation every time. We're committed
                    to exceeding your expectations with unmatched attention to detail.
                  </p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: star * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                    <span className="ml-3 text-white/80 font-medium">
                      Trusted by yacht owners throughout South Florida
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    icon: <Phone className="h-6 w-6" />,
                    title: "Call Us",
                    content: "+1 (561) 371-2388",
                    subtitle: "Available 7 days a week",
                  },
                  {
                    icon: <Mail className="h-6 w-6" />,
                    title: "Email Us",
                    content: "oceanwraps@gmail.com",
                    subtitle: "Quick response guaranteed",
                  },
                  {
                    icon: <MapPin className="h-6 w-6" />,
                    title: "Service Areas",
                    content: "Port St. Lucie to Miami",
                    subtitle: "Serving all of South Florida",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">{contact.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sky-400 mb-1">{contact.title}</h4>
                      <p className="text-white font-medium">{contact.content}</p>
                      <p className="text-white/60 text-sm">{contact.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <Image src={"/images/logo.jpeg"} alt="Browwraps Logo" width={80} height={80} className="rounded=md" />
                  <motion.div
                    className="absolute inset-0 bg-sky-400/20 rounded-full blur-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <div>
                  <span className="text-2xl font-bold">Browwraps</span>
                  <Badge className="ml-2 bg-sky-500/20 text-sky-300 border-sky-400/30">South Florida</Badge>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed max-w-md">
                Transforming sportfish with premium brow wraps from Port St. Lucie to Miami. Where marine
                craftsmanship meets cutting-edge protection technology for South Florida's finest vessels.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-sky-400 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["About", "Benefits", "Locations", "Gallery", "Contact"].map((link) => (
                  <li key={link}>
                    <Link
                      href={`#${link.toLowerCase()}`}
                      className="text-white/80 hover:text-sky-400 transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-sky-400 mb-4">Service Areas</h4>
              <ul className="space-y-2 text-white/80">
                <li>Port St. Lucie</li>
                <li>Stuart (Our hometown!)</li>
                <li>Jupiter</li>
                <li>West Palm Beach</li>
                <li>Fort Lauderdale</li>
                <li>Miami</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center place-self-center"
          >
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Browwraps. All rights reserved. Serving South Florida from Port St. Lucie to
              Miami.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "BrowWraps.com",
            description:
              "Custom boat brow wraps for sportfish in South Florida. Premium gloss black marine-grade film installation from Port St. Lucie to Miami.",
            url: "https://browwraps.com",
            telephone: "+1-555-BROW-WRAP",
            email: "info@browwraps.com",
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
            openingHours: ["Mo-Su 09:00-17:00"],
            sameAs: ["https://www.facebook.com/BrowWraps", "https://www.instagram.com/BrowWraps"],
          }),
        }}
      />
    </>
  )
}
