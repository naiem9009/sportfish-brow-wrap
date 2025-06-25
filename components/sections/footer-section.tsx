"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function FooterSection() {
  return (
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
                <Image src="/images/logo.jpeg" alt="Browwraps Logo" width={80} height={80} className="rounded-md" />
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
              Transforming sportfish with premium brow wraps from Port St. Lucie to Miami. Where marine craftsmanship
              meets cutting-edge protection technology for South Florida's finest vessels.
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
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Browwraps. All rights reserved. Serving South Florida from Port St. Lucie to
            Miami.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
