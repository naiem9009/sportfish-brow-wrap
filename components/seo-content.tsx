/**
 * Developed by Md Naim Hossen
 * Full Stack Developer
 *
 * WhatsApp: +880 1776-556776
 * Email: developernaim83@gmail.com
 */


"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MapPin, Star, Award } from "lucide-react"

export function SEOContent() {
  const locations = [
    "Port St. Lucie",
    "Vero Beach",
    "Fort Pierce",
    "Stuart",
    "Jupiter",
    "West Palm Beach",
    "Boca Raton",
    "Fort Lauderdale",
    "Miami",
    "Palm Beach",
    "Pompano Beach",
    "Hollywood",
  ]

  const services = [
    "Boat Brow Wraps in Stuart",
    "Yacht Brow Wraps Jupiter FL",
    "Sportfish Window Wraps Fort Lauderdale",
    "Faux Brow Mask Miami Boats",
    "Gloss Black Yacht Wrap West Palm Beach",
  ]

  return (
    <section className="bg-black/50 text-white py-16 relative">
      <div className="container mx-auto px-4">
        {/* Hidden SEO content for search engines */}
        <div className="sr-only">
          <h2>Custom Boat Brow Wraps in South Florida - From Port St. Lucie to Miami</h2>
          <p>
            Looking to upgrade the sleek look of your sportfish yacht? At BrowWraps.com, we specialize in custom boat
            brow wraps that give your vessel a high-end, polished look. Whether you're docked in Port St. Lucie,
            cruising through Jupiter, or based in Fort Lauderdale, we proudly offer mobile installation services along
            the South Florida coastline.
          </p>

          <h3>Why South Florida Yacht Owners Choose Us</h3>
          <p>
            From Jupiter Inlet to the Miami marinas, yacht owners trust our team for expert-level service and durable,
            long-lasting results. Our brow wraps feature 7-10 Year Marine-Grade Film, Hydrophobic Surface where water
            beads off effortlessly, Self-Healing Technology where light scratches vanish in the sun, Low Maintenance
            with no need for waxing, and On-Water Installation with no haul-outs needed.
          </p>

          <h3>Professional Brow Wrap Installation Without the Hassle</h3>
          <p>
            Our brow wrap process typically takes 1-2 days, and your sportfish yacht stays in the water the entire time.
            We use precision-cut templates and install every wrap with the care and quality your vessel deserves.
          </p>

          <ul>
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>

          <h3>Service Locations</h3>
          <ul>
            {locations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </div>

        {/* Visible content with location keywords */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Badge className="bg-sky-500/20 text-sky-300 border-sky-400/30 mb-6">
            <MapPin className="mr-1 h-3 w-3" />
            Serving All of South Florida
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Professional Brow Wrap Installation{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
              Without the Hassle
            </span>
          </h2>

          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            From Jupiter Inlet to the Miami marinas, yacht owners throughout South Florida trust our team for
            expert-level service and durable, long-lasting results. Our mobile installation team brings premium brow
            wrap services directly to your marina or dock.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Award className="h-6 w-6" />, text: "7-10 Year Marine-Grade Film" },
              { icon: <CheckCircle className="h-6 w-6" />, text: "Hydrophobic Surface" },
              { icon: <Star className="h-6 w-6" />, text: "Self-Healing Technology" },
              { icon: <MapPin className="h-6 w-6" />, text: "On-Water Installation" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="text-sky-400">{feature.icon}</div>
                <span className="text-white text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
