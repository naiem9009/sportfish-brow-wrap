"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Send, Sparkles, Star, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { InfinityButton } from "@/components/ui/infinity-button"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormLoading(true)
    setFormSuccess(false)

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

      if (result?.success) {
        setFormSuccess(true)
        toast({
          title: "Success!",
          description: result?.message,
          variant: "default",
          style: {
            position: "fixed",
            bottom: "1rem",
            left: "50%",
            transform: "translateX(-50%)",
          },
        })
        form.reset()

        // Reset success state after 3 seconds
        setTimeout(() => setFormSuccess(false), 3000)
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
          },
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

  return (
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
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-sky-600/10 to-blue-600/10"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-sky-400/30 rounded-full"
                    animate={{
                      x: [0, 100, 0],
                      y: [0, -50, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-8"
                >
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Sparkles className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-sky-400">Get Your Custom Quote</h3>
                </motion.div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="relative group">
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-sky-300">
                        First Name *
                      </label>
                      <div className="relative">
                        <Input
                          id="firstName"
                          name="firstName"
                          disabled={formLoading}
                          onFocus={() => setFocusedField("firstName")}
                          onBlur={() => setFocusedField(null)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50 pl-4 pr-10"
                          placeholder="Enter your first name"
                          required
                        />
                        <motion.div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          animate={{
                            scale: focusedField === "firstName" ? 1 : 0,
                            opacity: focusedField === "firstName" ? 1 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sparkles className="h-4 w-4 text-sky-400" />
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="relative group">
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-sky-300">
                        Last Name *
                      </label>
                      <div className="relative">
                        <Input
                          id="lastName"
                          name="lastName"
                          disabled={formLoading}
                          onFocus={() => setFocusedField("lastName")}
                          onBlur={() => setFocusedField(null)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50 pl-4 pr-10"
                          placeholder="Enter your last name"
                          required
                        />
                        <motion.div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          animate={{
                            scale: focusedField === "lastName" ? 1 : 0,
                            opacity: focusedField === "lastName" ? 1 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sparkles className="h-4 w-4 text-sky-400" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="relative group">
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-sky-300">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        disabled={formLoading}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50 pl-4 pr-10"
                        placeholder="example@email.com"
                        required
                      />
                      <motion.div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        animate={{
                          scale: focusedField === "email" ? 1 : 0,
                          opacity: focusedField === "email" ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Mail className="h-4 w-4 text-sky-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="relative group">
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-sky-300">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        disabled={formLoading}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50 pl-4 pr-10"
                        placeholder="+1 (555) 123-4567"
                      />
                      <motion.div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        animate={{
                          scale: focusedField === "phone" ? 1 : 0,
                          opacity: focusedField === "phone" ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Phone className="h-4 w-4 text-sky-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="relative group">
                    <label htmlFor="location" className="block text-sm font-medium mb-2 text-sky-300">
                      Marina Location *
                    </label>
                    <div className="relative">
                      <Input
                        id="location"
                        name="location"
                        disabled={formLoading}
                        onFocus={() => setFocusedField("location")}
                        onBlur={() => setFocusedField(null)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50 pl-4 pr-10"
                        placeholder="Stuart, FL"
                        required
                      />
                      <motion.div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        animate={{
                          scale: focusedField === "location" ? 1 : 0,
                          opacity: focusedField === "location" ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <MapPin className="h-4 w-4 text-sky-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="relative group">
                    <label htmlFor="boatDetails" className="block text-sm font-medium mb-2 text-sky-300">
                      Boat Details *
                    </label>
                    <div className="relative">
                      <Input
                        id="boatDetails"
                        name="boatDetails"
                        placeholder="2025 Viking 68"
                        disabled={formLoading}
                        onFocus={() => setFocusedField("boatDetails")}
                        onBlur={() => setFocusedField(null)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 disabled:opacity-50 pl-4 pr-10"
                        required
                      />
                      <motion.div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        animate={{
                          scale: focusedField === "boatDetails" ? 1 : 0,
                          opacity: focusedField === "boatDetails" ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sparkles className="h-4 w-4 text-sky-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="relative group">
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-sky-300">
                      Additional Details
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      disabled={formLoading}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-sky-400 transition-all duration-300 resize-none disabled:opacity-50"
                      placeholder="Tell us about your project, timeline, or any specific requirements..."
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <InfinityButton
                      type="submit"
                      disabled={formLoading}
                      loading={formLoading}
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      {formSuccess ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          Message Sent Successfully!
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send My Quote Request
                          <Sparkles className="w-5 h-5" />
                        </>
                      )}
                    </InfinityButton>
                  </div>
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
                  Our team of certified marine specialists ensures flawless installation every time. We're committed to
                  exceeding your expectations with unmatched attention to detail.
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
                  href: "tel:+15613712388",
                },
                {
                  icon: <Mail className="h-6 w-6" />,
                  title: "Email Us",
                  content: "oceanwraps@gmail.com",
                  subtitle: "Quick response guaranteed",
                  href: "mailto:oceanwraps@gmail.com",
                },
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: "Service Areas",
                  content: "Port St. Lucie to Miami",
                  subtitle: "Serving all of South Florida",
                  href: "#locations",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <a
                    href={contact.href}
                    className="flex items-center gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <motion.div
                      className="p-3 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-white">{contact.icon}</div>
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-sky-400 mb-1 group-hover:text-sky-300 transition-colors">
                        {contact.title}
                      </h4>
                      <p className="text-white font-medium">{contact.content}</p>
                      <p className="text-white/60 text-sm">{contact.subtitle}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
