"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { ResultsContent } from "./results-view"
import { type AnalysisResult, sampleResult } from "@/lib/analysis"

/* -------------------------------------------------------------------------- */
/*  VIRAL BANNER (sticky top)                                                 */
/* -------------------------------------------------------------------------- */

function ViralBanner() {
  return (
    <div className="pt-gradient sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-[640px] flex-col items-center justify-center gap-1.5 px-5 sm:h-12 sm:flex-row sm:justify-between sm:gap-3">
        <p className="flex items-center gap-1.5 text-center text-sm font-medium text-white">
          <Sparkles className="size-4 shrink-0" aria-hidden="true" />
          Someone shared their result with you
        </p>
        <a
          href="/quiz"
          className="flex w-full items-center justify-center gap-1.5 rounded-full border border-white/40 bg-transparent px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 active:scale-95 sm:w-auto"
        >
          Discover yours
          <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  BOTTOM STICKY CTA (mobile only)                                           */
/* -------------------------------------------------------------------------- */

function BottomStickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="/quiz"
          aria-label="Take the test"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          whileTap={{ scale: 0.95 }}
          className="pt-gradient fixed bottom-6 right-5 z-50 flex h-12 items-center gap-1.5 rounded-full px-5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.5)] sm:hidden"
        >
          Take the test
          <ArrowRight className="size-4" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}

/* -------------------------------------------------------------------------- */
/*  SHARE PAGE CLIENT                                                         */
/* -------------------------------------------------------------------------- */

export function SharePageClient({
  result = sampleResult,
}: {
  result?: AnalysisResult
}) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  function handleCopy() {
    if (!shareUrl) return
    void navigator.clipboard?.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-pt-bg">
      <ViralBanner />

      {/* Ambient glow accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-[15%] -z-10 size-[420px] rounded-full opacity-[0.15] blur-3xl"
        style={{ background: "var(--pt-purple)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-[60%] -z-10 size-[420px] rounded-full opacity-[0.15] blur-3xl"
        style={{ background: "var(--pt-blue)" }}
      />

      {/* Shared result label */}
      <p className="mx-auto max-w-[640px] px-5 pt-8 text-center text-xs font-medium uppercase tracking-wide text-pt-muted sm:pt-12">
        Shared result
      </p>

      <ResultsContent
        result={result}
        shareUrl={shareUrl}
        copied={copied}
        onCopy={handleCopy}
        hideShareSection
      />

      {/* Final conversion CTA */}
      <section className="mx-auto max-w-[640px] px-5 pb-24 sm:pb-28">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-pretty text-2xl font-bold text-pt-text sm:text-3xl">
            Ready to discover your own type?
          </h2>
          <a
            href="/quiz"
            className="pt-gradient mt-6 flex h-12 w-full max-w-[400px] items-center justify-center gap-2 rounded-full px-6 text-base font-semibold text-white shadow-[0_12px_40px_-12px_rgba(139,92,246,0.7)] transition-transform hover:scale-[1.02] active:scale-95"
          >
            {"Take the test — it's free"}
            <ArrowRight className="size-5" />
          </a>
          <p className="mt-4 text-sm font-medium text-pt-muted">
            Free · No account needed · 2 min
          </p>
        </div>
      </section>

      <BottomStickyCta />
    </main>
  )
}
