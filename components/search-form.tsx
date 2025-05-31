/**
 * Developed by Md Naim Hossen
 * Full Stack Developer
 *
 * WhatsApp: +880 1776-556776
 * Email: developernaim83@gmail.com
 */


"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search..." className="pl-9 bg-white/10 border-white/20 text-white" />
    </div>
  )
}
