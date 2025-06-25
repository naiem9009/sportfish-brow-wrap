"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface InfinityButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  type?: "button" | "submit" | "reset"
}

export function InfinityButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  className,
  type = "button",
}: InfinityButtonProps) {
  const baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 group"

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-lg hover:shadow-sky-500/25",
    secondary:
      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25",
    outline: "border-2 border-sky-400/50 text-sky-400 hover:text-white bg-transparent hover:bg-sky-500/20",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {/* Infinity background animation */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            variant === "primary"
              ? "linear-gradient(45deg, #0ea5e9, #3b82f6, #0ea5e9, #3b82f6)"
              : variant === "secondary"
                ? "linear-gradient(45deg, #9333ea, #ec4899, #9333ea, #ec4899)"
                : "linear-gradient(45deg, #0ea5e9, transparent, #0ea5e9, transparent)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Infinity symbol animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-8 h-4 opacity-20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 100 50" className="w-full h-full fill-current">
            <path d="M25 25c0-13.8 11.2-25 25-25s25 11.2 25 25-11.2 25-25 25-25-11.2-25-25zm50 0c0 13.8-11.2 25-25 25s-25-11.2-25-25 11.2-25 25-25 25 11.2 25 25z" />
          </svg>
        </motion.div>
      </div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />

      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${40 + Math.sin(i) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            variant === "primary"
              ? "radial-gradient(circle at center, rgba(14, 165, 233, 0.3) 0%, transparent 70%)"
              : variant === "secondary"
                ? "radial-gradient(circle at center, rgba(147, 51, 234, 0.3) 0%, transparent 70%)"
                : "radial-gradient(circle at center, rgba(14, 165, 233, 0.2) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />
    </motion.button>
  )
}
