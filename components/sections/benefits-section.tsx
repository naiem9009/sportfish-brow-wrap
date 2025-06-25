"use client"

import { motion } from "framer-motion"
import { Award, Sparkles, Shield, Droplets, Clock, Anchor } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function BenefitsSection() {
  return (
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Brow Wrap?</span>
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
              No need to haul your boat or disrupt your schedule. Our expert installation takes just 1-2 days with your
              yacht remaining in the water at your South Florida marina. We use precision templates and
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
  )
}
