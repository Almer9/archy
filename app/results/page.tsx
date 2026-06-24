"use client"

import { ResultsView } from "@/components/psychotype/results-view"

export default function ResultsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-pt-bg">
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

      <ResultsView
        shareUrl="https://psychotype.app/r/visionary-94"
        onRetake={() => {
          window.location.href = "/"
        }}
      />
    </main>
  )
}
