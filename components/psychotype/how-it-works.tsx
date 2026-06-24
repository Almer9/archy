"use client"

import { ListChecks, BrainCircuit, FileText } from "lucide-react"
import { Reveal } from "./reveal"

const steps = [
  {
    icon: ListChecks,
    step: "1",
    title: "Answer 10 questions",
    description: "An honest 1–5 scale. No right or wrong answers.",
  },
  {
    icon: BrainCircuit,
    step: "2",
    title: "AI analyzes your pattern",
    description: "Deep personality modeling across your full response set.",
  },
  {
    icon: FileText,
    step: "3",
    title: "Get your full profile",
    description: "Archetype, strengths, growth areas, and career directions.",
  },
]

export function HowItWorks() {
  return (
    <section className="px-5">
      <div className="mx-auto max-w-[760px]">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-pt-text sm:text-4xl">
            How it works
          </h2>
        </Reveal>

        <div className="relative mt-10">
          {/* connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-[26px] top-7 bottom-7 w-px bg-pt-border"
          />

          <ol className="flex flex-col gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <li className="flex items-start gap-5">
                  {/* prominent number badge */}
                  <span className="relative z-10 flex size-[52px] shrink-0 flex-col items-center justify-center rounded-2xl pt-gradient font-bold text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)]">
                    <span className="text-lg leading-none">{s.step}</span>
                  </span>

                  <div className="flex flex-1 items-start gap-4 rounded-3xl border border-pt-border bg-pt-card p-5">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-pt-text">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-pt-muted">
                        {s.description}
                      </p>
                    </div>
                    <s.icon className="size-6 shrink-0 text-pt-muted" />
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
