"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function StickyStart() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#"
          aria-label="Start free analysis"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          whileTap={{ scale: 0.95 }}
          className="pt-gradient fixed bottom-5 right-5 z-50 flex h-12 items-center gap-1.5 rounded-full px-5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.5)] sm:hidden"
        >
          Start
          <ArrowRight className="size-4" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
