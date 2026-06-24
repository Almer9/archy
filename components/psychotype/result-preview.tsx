"use client"

import { Check, Sparkles, TrendingUp, Compass, ArrowRight } from "lucide-react"
import { Reveal } from "./reveal"
import { CtaButton } from "./cta-button"

const strengths = [
  {
    title: "Rare Depth of Focus",
    description:
      "When something captures your attention, you go further than almost anyone — turning curiosity into mastery.",
  },
  {
    title: "Systems Thinking",
    description:
      "You naturally see how pieces connect, spotting the structure behind problems others find chaotic.",
  },
  {
    title: "Honest Conviction",
    description:
      "You say what others hesitate to voice, which lets you push ideas forward when the room stays quiet.",
  },
]

const growthAreas = [
  {
    title: "Diplomatic Conflict Avoidance",
    description: "You tend to delay hard conversations.",
  },
  {
    title: "Perfectionism Paralysis",
    description: "High standards sometimes block progress.",
  },
  {
    title: "Isolation Under Stress",
    description: "You pull back when you need support most.",
  },
]

const lockedCareers = [
  "Product Strategist",
  "Research Scientist",
  "Founder / Builder",
  "Systems Architect",
]

const fullReportItems = [
  "Deep dive on all 3 growth areas",
  "All 5 career directions",
  "Famous people with your pattern",
  "PDF export",
]

const proItems = [
  "Everything in Full Report",
  "30-day growth plan",
  "Daily habit checklist",
  "Monthly re-analysis & progress",
]

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
      <h4 className="text-xs font-semibold uppercase tracking-wide text-pt-muted">
        {children}
      </h4>
    </div>
  )
}

export function ResultPreview() {
  return (
    <section className="px-5">
      <div className="mx-auto max-w-[640px]">
        <Reveal>
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-pt-text sm:text-4xl">
            Here&apos;s what your profile looks like
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-5">
          {/* ARCHETYPE HERO — fully visible, free */}
          <Reveal>
            <div className="pt-gradient-border relative rounded-2xl p-6 shadow-[0_20px_60px_-30px_rgba(139,92,246,0.6)] sm:p-8">
              <span className="absolute right-4 top-4 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                Free
              </span>

              <div className="flex flex-col items-center text-center">
                <span className="text-5xl" role="img" aria-label="telescope">
                  🔭
                </span>
                <h3 className="pt-gradient-text mt-3 text-3xl font-bold sm:text-4xl">
                  The Visionary
                </h3>
                <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-pt-muted">
                  You see the world as it could be, not as it is.
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <span className="rounded-full border border-pt-border bg-white/5 px-3 py-1.5 text-xs font-semibold text-pt-text">
                    Top 5% globally
                  </span>
                  <span className="rounded-full border border-pt-border bg-white/5 px-3 py-1.5 text-xs font-semibold text-pt-text">
                    94% profile match
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* STRENGTHS — all 3 visible */}
          <Reveal>
            <div className="rounded-2xl border border-pt-border bg-pt-card p-6">
              <SectionHeader
                icon={<Sparkles className="size-4 text-pt-purple" />}
              >
                Your Strengths
              </SectionHeader>

              <div className="mt-4 flex flex-col gap-3">
                {strengths.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-xl border border-pt-border bg-white/[0.03] p-4"
                  >
                    <p className="text-base font-semibold text-pt-text">
                      {s.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-pt-muted">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-center text-xs font-medium text-emerald-400">
                These are yours. Free, always.
              </p>
            </div>
          </Reveal>

          {/* GROWTH AREAS — names only, then soft paywall insert */}
          <Reveal>
            <div className="rounded-2xl border border-pt-border bg-pt-card p-6">
              <SectionHeader
                icon={<TrendingUp className="size-4 text-pt-blue" />}
              >
                Growth Areas — 3 identified
              </SectionHeader>

              <div className="relative mt-4">
                <div className="flex flex-col gap-3">
                  {growthAreas.map((g, i) => (
                    <div
                      key={g.title}
                      className="rounded-xl border border-pt-border bg-white/[0.03] p-4"
                      style={
                        i === growthAreas.length - 1
                          ? {
                              maskImage:
                                "linear-gradient(to bottom, #000 35%, transparent 100%)",
                              WebkitMaskImage:
                                "linear-gradient(to bottom, #000 35%, transparent 100%)",
                            }
                          : undefined
                      }
                    >
                      <p className="text-base font-semibold text-pt-text">
                        {g.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-pt-muted">
                        {g.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* soft paywall insert — feels like content */}
              <div className="mt-5 flex flex-col items-center gap-4 text-center">
                <div className="h-px w-full max-w-xs pt-gradient opacity-40" />
                <p className="max-w-sm text-pretty text-sm leading-relaxed text-pt-text">
                  You have 3 growth areas holding you back. Find out exactly
                  why — and what to do about it.
                </p>
                <CtaButton
                  className="h-12 w-full max-w-[400px] text-sm"
                  label="Unlock deep analysis — $2.99"
                />
              </div>
            </div>
          </Reveal>

          {/* CAREER DIRECTIONS — 1 visible, 4 blurred */}
          <Reveal>
            <div className="rounded-2xl border border-pt-border bg-pt-card p-6">
              <SectionHeader
                icon={<Compass className="size-4 text-pt-purple" />}
              >
                Career Directions
              </SectionHeader>

              <div className="mt-4 rounded-xl border border-pt-border bg-white/[0.03] p-4">
                <p className="text-base font-semibold text-pt-text">
                  UX Researcher
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-pt-muted">
                  Your pattern of deep focus and systems thinking makes you
                  exceptional at finding what others miss.
                </p>
              </div>

              <div
                className="mt-3 grid grid-cols-2 gap-3 blur-[5px]"
                aria-hidden="true"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, #000 0%, transparent 92%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 0%, transparent 92%)",
                }}
              >
                {lockedCareers.map((c) => (
                  <div
                    key={c}
                    className="pt-shimmer rounded-xl border border-pt-border bg-white/[0.03] p-4"
                  >
                    <p className="text-sm font-semibold text-pt-text">{c}</p>
                    <div className="mt-2 h-2.5 w-full rounded bg-white/10" />
                    <div className="mt-1.5 h-2.5 w-3/5 rounded bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* CHOOSE YOUR DEPTH — unified comparison */}
          <Reveal>
            <div className="mt-4">
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-pt-muted">
                Choose your depth
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {/* LEFT — Full Report (primary) */}
                <div className="pt-gradient-border relative flex flex-col rounded-2xl p-6">
                  <span className="inline-flex w-fit items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                    One-time
                  </span>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-pt-text">
                      $2.99
                    </span>
                    <p className="mt-1 text-xs text-pt-muted">
                      one-time · no subscription
                    </p>
                  </div>

                  <ul className="mt-5 flex flex-col gap-3">
                    {fullReportItems.map((item) => (
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

                  <CtaButton
                    className="mt-6 h-12 w-full"
                    label="Get Full Report"
                  />
                </div>

                {/* RIGHT — Pro (secondary) */}
                <div className="relative flex flex-col rounded-2xl border border-white/15 bg-white/[0.04] p-6">
                  <span className="inline-flex w-fit items-center rounded-full border border-pt-purple/40 bg-pt-purple/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-pt-purple">
                    Monthly
                  </span>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-pt-text">
                      $5.99
                      <span className="text-base font-medium text-pt-muted">
                        /mo
                      </span>
                    </span>
                  </div>

                  <ul className="mt-5 flex flex-col gap-3">
                    {proItems.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/5">
                          <Check className="size-3.5 text-pt-muted" />
                        </span>
                        <span className="text-sm leading-relaxed text-pt-text">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#"
                    className="mt-6 inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-full border border-pt-border text-sm font-semibold text-pt-text transition-colors hover:bg-white/5"
                  >
                    Explore Pro
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>

              <p className="mt-5 text-center text-xs leading-relaxed text-pt-muted">
                Or continue free — your archetype and strengths are always
                yours.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
