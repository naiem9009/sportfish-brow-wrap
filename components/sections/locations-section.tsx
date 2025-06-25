"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, CheckCircle, Ship } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function LocationsSection() {
  const locations = [
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
  ]

  const mapMarkers = [
    { name: "Port St. Lucie", top: "15%", left: "50%" },
    { name: "Stuart", top: "25%", left: "55%" },
    { name: "Jupiter", top: "35%", left: "60%" },
    { name: "West Palm Beach", top: "45%", left: "65%" },
    { name: "Boca Raton", top: "55%", left: "70%" },
    { name: "Fort Lauderdale", top: "65%", left: "75%" },
    { name: "Miami", top: "75%", left: "80%" },
  ]

  return (
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
              {locations.map((location, index) => (
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

              {mapMarkers.map((marker, index) => (
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
  )
}
