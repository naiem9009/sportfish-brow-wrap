/**
 * Developed by Md Naim Hossen
 * Full Stack Developer
 *
 * WhatsApp: +880 1776-556776
 * Email: developernaim83@gmail.com
 */


"use client"

import { useEffect, useRef } from "react"

interface WaveAnimationProps {
  className?: string
}

export function WaveAnimation({ className }: WaveAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = canvas.width
    let height = canvas.height

    const resizeCanvas = () => {
      const { width: newWidth, height: newHeight } = canvas.getBoundingClientRect()
      canvas.width = newWidth * window.devicePixelRatio
      canvas.height = newHeight * window.devicePixelRatio
      width = canvas.width
      height = canvas.height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Wave properties
    const waves = [
      { y: height * 0.65, length: 0.01, amplitude: 20, speed: 0.002 },
      { y: height * 0.68, length: 0.02, amplitude: 15, speed: 0.003 },
      { y: height * 0.71, length: 0.03, amplitude: 10, speed: 0.004 },
    ]

    let time = 0

    const drawWave = (y: number, length: number, amplitude: number, time: number) => {
      ctx.beginPath()

      for (let x = 0; x <= width; x++) {
        const dx = x * length
        const dy = Math.sin(dx + time) * amplitude

        if (x === 0) {
          ctx.moveTo(x, y + dy)
        } else {
          ctx.lineTo(x, y + dy)
        }
      }

      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, "rgba(7, 89, 133, 0.8)")
      gradient.addColorStop(1, "rgba(12, 74, 110, 0.4)")

      // Draw waves from back to front
      for (let i = 0; i < waves.length; i++) {
        const wave = waves[i]
        ctx.fillStyle = `rgba(7, 89, 133, ${0.3 + i * 0.2})`
        drawWave(wave.y, wave.length, wave.amplitude, time * wave.speed)
        ctx.fill()
      }

      time += 1
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className={cn("w-full h-full", className)} />
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
