"use client"

import { CtaButton, CtaMicroCopy } from "./cta-button"
import { Reveal } from "./reveal"

export function BottomCta() {
  return (
    <section className="relative overflow-hidden px-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[700px] max-w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--pt-blue) 0%, var(--pt-purple) 50%, transparent 70%)",
        }}
      />
      <Reveal className="mx-auto max-w-[760px]">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-pt-text sm:text-5xl">
            Ready to see your real profile?
          </h2>
          <div className="mt-10 flex w-full flex-col items-center gap-3">
            <CtaButton className="w-full sm:w-auto" />
            <CtaMicroCopy />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
