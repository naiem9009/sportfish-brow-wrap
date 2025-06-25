"use client"
import { motion } from "framer-motion"
import { Anchor, Shield, Droplets, Sun, Zap, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AboutSection() {
  return (
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
            A boat brow wrap is a premium gloss black film applied to the brow area of a sportfishing yacht. Designed to
            simulate the sleek, tinted look of extended glass, this high-end wrap transforms the otherwise blank white
            space above your windows into a striking gloss black panel that seamlessly integrates with your existing
            windows.
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
                Our brow wraps aren't just about aesthetics—they're engineered for performance in South Florida's harsh
                marine conditions. Using premium gloss black paint protection film, not standard vinyl, we deliver
                unmatched durability and style.
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
                  description: "Advanced water-repelling technology keeps your brow pristine with minimal maintenance.",
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
  )
}
