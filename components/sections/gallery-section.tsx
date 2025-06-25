"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function GallerySection() {
  const projects = [
    { image: "/images/3.jpeg" },
    { image: "/images/4.jpeg" },
    { image: "/images/5.jpeg" },
    { image: "/images/6.jpeg" },
    { image: "/images/7.jpeg" },
    { image: "/images/8.jpeg" },
    { image: "/images/9.jpeg" },
    { image: "/images/10.jpeg" },
    { image: "/images/11.jpeg" },
    { image: "/images/12.jpeg" },
    { image: "/images/13.jpeg" },
    { image: "/images/14.jpeg" },
  ]

  return (
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
          {projects.map((project, index) => (
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
                  alt={`Boat Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
