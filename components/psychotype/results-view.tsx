"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Check,
  Compass,
  Copy,
  Link2,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { CtaButton } from "./cta-button"
import { Reveal } from "./reveal"
import {
  type AnalysisResult,
  OCEAN_LABELS,
  OCEAN_ORDER,
} from "@/lib/analysis"
import { useAnalysisStream } from "@/lib/use-analysis-stream"

/* -------------------------------------------------------------------------- */
/*  LOADING STATE                                                             */
/* -------------------------------------------------------------------------- */

function LoadingState({
  progress,
  stepLabel,
  archetypeName,
  archetypeEmoji,
}: {
  progress: number
  stepLabel: string
  archetypeName: string | null
  archetypeEmoji: string
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5">
      <div className="flex w-full max-w-[420px] flex-col items-center text-center">
        <motion.span
          className="text-7xl"
          role="img"
          aria-label="your archetype"
          animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {archetypeEmoji}
        </motion.span>

        <div className="mt-8 h-8">
          {archetypeName && (
            <motion.h2
              key={archetypeName}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="pt-gradient-text text-2xl font-bold sm:text-3xl"
            >
              {archetypeName}
            </motion.h2>
          )}
        </div>

        <div
          className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="pt-gradient h-full rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        <motion.p
          key={stepLabel}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 text-sm font-medium text-pt-muted"
        >
          {stepLabel}
        </motion.p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  SHARED PRIMITIVES                                                         */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="text-xs font-semibold uppercase tracking-wide text-pt-muted">
        {children}
      </h3>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  OCEAN SCORES                                                              */
/* -------------------------------------------------------------------------- */

function OceanBar({
  label,
  value,
  index,
}: {
  label: string
  value: number
  index: number
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-pt-text">{label}</span>
        <span className="text-sm font-semibold tabular-nums text-pt-muted">
          {value}
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="pt-gradient h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.9,
            delay: 0.1 + index * 0.12,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  RESULT CONTENT (used standalone on share page)                            */
/* -------------------------------------------------------------------------- */

export function ResultsContent({
  result,
  shareUrl,
  copied,
  onCopy,
  onRetake,
}: {
  result: AnalysisResult
  shareUrl: string | null
  copied: boolean
  onCopy: () => void
  onRetake?: () => void
}) {
  const { archetype, ocean, strengths, growthAreas, careers } = result

  return (
    <div className="mx-auto flex max-w-[640px] flex-col gap-5 px-5 py-10 sm:py-16">
      {/* 1 — ARCHETYPE HERO */}
      <Reveal>
        <div className="pt-gradient-border relative rounded-2xl p-6 shadow-[0_20px_60px_-20px_rgba(139,92,246,0.7)] sm:p-8">
          <div className="flex flex-col items-center text-center">
            <span
              className="mb-2 text-6xl sm:text-7xl"
              role="img"
              aria-label={archetype.name}
            >
              {archetype.emoji}
            </span>
            <h1 className="pt-gradient-text mt-1 text-4xl font-bold sm:text-5xl">
              {archetype.name}
            </h1>
            <p className="mt-3 max-w-sm text-pretty text-base leading-relaxed text-pt-muted">
              {archetype.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full border border-pt-border bg-white/5 px-3 py-1.5 text-xs font-semibold text-pt-text">
                Top {archetype.topPercent}% globally
              </span>
              <span className="rounded-full border border-pt-border bg-white/5 px-3 py-1.5 text-xs font-semibold text-pt-text">
                {archetype.matchPercent}% profile match
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 2 — OCEAN SCORES */}
      <Reveal delay={0.1}>
        <div className="rounded-2xl border border-pt-border bg-pt-card p-6">
          <SectionHeader icon={<Sparkles className="size-4 text-pt-purple" />}>
            Your personality spectrum
          </SectionHeader>
          <div className="mt-5 flex flex-col gap-4">
            {OCEAN_ORDER.map((trait, i) => (
              <OceanBar
                key={trait}
                label={OCEAN_LABELS[trait]}
                value={ocean[trait]}
                index={i}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* 3 — STRENGTHS */}
      <Reveal delay={0.2}>
        <div className="rounded-2xl border border-pt-border bg-pt-card p-6">
          <SectionHeader icon={<Sparkles className="size-4 text-pt-purple" />}>
            Your Strengths
          </SectionHeader>
          <div className="mt-4 flex flex-col gap-3">
            {strengths.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-pt-border bg-white/[0.03] p-4"
              >
                <p className="text-base font-semibold text-pt-text">
                  {s.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-pt-muted">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 4 — GROWTH AREAS */}
      <Reveal delay={0.2}>
        <div className="rounded-2xl border border-pt-border bg-pt-card p-6">
          <SectionHeader icon={<TrendingUp className="size-4 text-pt-blue" />}>
            {`Growth Areas — ${growthAreas.length} identified`}
          </SectionHeader>

          <div className="relative mt-4">
            <div
              className="rounded-xl border border-pt-border bg-white/[0.03] p-4"
              style={{
                maskImage:
                  "linear-gradient(to bottom, #000 45%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 45%, transparent 100%)",
              }}
            >
              <p className="text-base font-semibold text-pt-text">
                {growthAreas[0]?.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-pt-muted">
                {growthAreas[0]?.description}
              </p>
            </div>
          </div>

          {/* soft paywall insert — feels like content */}
          <div className="mt-5 flex flex-col items-center gap-4 text-center">
            <div className="h-px w-full max-w-xs pt-gradient opacity-40" />
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-pt-text">
              {`You have ${growthAreas.length} growth areas holding you back. Find out exactly why — and what to do about it.`}
            </p>
            <CtaButton
              className="h-12 w-full max-w-[400px] text-sm"
              label="Unlock deep analysis — $2.99"
            />
          </div>
        </div>
      </Reveal>

      {/* 5 — CAREER DIRECTIONS */}
      <Reveal delay={0.2}>
        <div className="rounded-2xl border border-pt-border bg-pt-card p-6">
          <SectionHeader icon={<Compass className="size-4 text-pt-purple" />}>
            Career Directions
          </SectionHeader>

          <div className="mt-4 rounded-xl border border-pt-border bg-white/[0.03] p-4">
            <p className="text-base font-semibold text-pt-text">
              {careers[0]?.title}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-pt-muted">
              {careers[0]?.description}
            </p>
          </div>

          <div
            className="relative mt-3"
            style={{
              maskImage:
                "linear-gradient(to bottom, #000 0%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, transparent 85%)",
            }}
          >
            <div className="flex flex-col gap-3 blur-[5px]" aria-hidden="true">
              {careers.slice(1).map((c) => (
                <div
                  key={c.title}
                  className="pt-shimmer rounded-xl border border-pt-border bg-white/[0.03] p-4"
                >
                  <p className="text-base font-semibold text-pt-text">
                    {c.title}
                  </p>
                  <div className="mt-2 h-2.5 w-full rounded bg-white/10" />
                  <div className="mt-1.5 h-2.5 w-3/5 rounded bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* 6 — PREMIUM CTA */}
      <Reveal delay={0.2}>
        <div className="pt-gradient-border rounded-2xl p-6 shadow-[0_20px_60px_-30px_rgba(139,92,246,0.6)] sm:p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-pt-text">
              Unlock your full report
            </h3>
            <p className="mt-2 text-sm font-semibold text-pt-muted">
              $2.99 · One-time · No subscription
            </p>
          </div>
          <ul className="mx-auto mt-6 flex max-w-sm flex-col gap-3">
            {[
              "All 3 growth areas fully decoded",
              "All 5 career directions explained",
              "Famous people with your pattern",
              "PDF export of your profile",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <Check className="size-3.5 text-pt-purple" />
                </span>
                <span className="text-sm leading-relaxed text-pt-text">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <CtaButton
              className="h-12 w-full max-w-[400px] text-sm"
              label="Unlock Full Report — $2.99"
            />
          </div>
        </div>
      </Reveal>

      {/* 7 — SHARE */}
      <Reveal delay={0.2}>
        <div className="rounded-2xl border border-pt-border bg-pt-card p-6 text-center">
          <h3 className="text-lg font-bold text-pt-text">Share your result</h3>
          <p className="mt-1 text-sm text-pt-muted">
            Show your friends what you discovered
          </p>

          <button
            type="button"
            onClick={onCopy}
            className="mt-5 flex w-full items-center gap-3 rounded-xl border border-pt-border bg-white/[0.03] px-4 py-3 text-left transition-colors hover:bg-white/[0.06]"
          >
            <Link2 className="size-4 shrink-0 text-pt-muted" />
            <span className="min-w-0 flex-1 truncate text-sm text-pt-muted">
              {shareUrl ?? "Generating link..."}
            </span>
            <span
              className={
                copied
                  ? "flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-400"
                  : "flex shrink-0 items-center gap-1 text-xs font-semibold text-pt-text"
              }
            >
              {copied ? (
                <>
                  <Check className="size-3.5" /> copied!
                </>
              ) : (
                <>
                  <Copy className="size-3.5" /> Copy link
                </>
              )}
            </span>
          </button>

          {onRetake && (
            <button
              type="button"
              onClick={onRetake}
              className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-pt-border text-sm font-semibold text-pt-text transition-colors hover:bg-white/5"
            >
              <RotateCcw className="size-4" />
              Retake the test
            </button>
          )}
        </div>
      </Reveal>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  RESULTS VIEW (loading state + hook)                                       */
/* -------------------------------------------------------------------------- */

export function ResultsView({
  source,
  shareUrl = null,
  onRetake,
}: {
  source?: AnalysisResult
  shareUrl?: string | null
  onRetake?: () => void
}) {
  const stream = useAnalysisStream(source)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    if (!shareUrl) return
    void navigator.clipboard?.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (stream.isLoading || !stream.result) {
    return (
      <LoadingState
        progress={stream.progress}
        stepLabel={stream.stepLabel}
        archetypeName={stream.archetypeName}
        archetypeEmoji={stream.archetypeEmoji}
      />
    )
  }

  return (
    <ResultsContent
      result={stream.result}
      shareUrl={shareUrl}
      copied={copied}
      onCopy={handleCopy}
      onRetake={onRetake}
    />
  )
}
