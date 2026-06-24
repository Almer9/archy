"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function CtaButton({
  className,
  label = "Start free analysis",
}: {
  className?: string
  label?: string
}) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "pt-gradient group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.35)] transition-shadow hover:shadow-[0_8px_40px_rgba(139,92,246,0.55)]",
        className,
      )}
    >
      {label}
      <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
    </motion.a>
  )
}

export function CtaMicroCopy({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs text-pt-muted", className)}>
      Free · No account needed · 2 min
    </p>
  )
}
