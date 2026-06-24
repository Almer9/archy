"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { CtaButton, CtaMicroCopy } from "./cta-button"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5">
      {/* radial glow from center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] max-w-[140vw] -translate-x-1/2 rounded-full opacity-[0.18] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--pt-purple) 0%, var(--pt-blue) 45%, transparent 70%)",
        }}
      />

      {/* nav */}
      <nav className="mx-auto flex max-w-[1100px] items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <span className="pt-gradient flex size-7 items-center justify-center rounded-lg">
            <Sparkles className="size-4 text-white" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-pt-text">
            Psychotype
          </span>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-pt-muted transition-colors hover:text-pt-text"
        >
          Sign in
        </a>
      </nav>

      {/* hero content */}
      <div className="mx-auto flex max-w-[760px] flex-col items-center pb-16 pt-12 text-center sm:pb-24 sm:pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-balance text-[2.75rem] font-bold leading-[1.05] tracking-tight text-pt-text sm:text-6xl"
        >
          Discover who you{" "}
          <span className="pt-gradient-text">actually</span> are
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-6 max-w-[34rem] text-pretty text-base leading-relaxed text-pt-muted sm:text-lg"
        >
          10 questions. Deep AI analysis. Your real strengths, blind spots, and
          career directions — in 90 seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-10 flex w-full flex-col items-center gap-3"
        >
          <CtaButton className="h-14 w-full max-w-[400px]" />
          <CtaMicroCopy />
        </motion.div>
      </div>
    </section>
  )
}
