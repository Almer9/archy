import { Hero } from "@/components/psychotype/hero"
import { SocialProof } from "@/components/psychotype/social-proof"
import { Archetypes } from "@/components/psychotype/archetypes"
import { HowItWorks } from "@/components/psychotype/how-it-works"
import { ResultPreview } from "@/components/psychotype/result-preview"
import { Testimonials } from "@/components/psychotype/testimonials"
import { BottomCta } from "@/components/psychotype/bottom-cta"
import { StickyStart } from "@/components/psychotype/sticky-start"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-pt-bg">
      {/* ambient gradient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-[20%] -z-10 size-[420px] rounded-full opacity-[0.15] blur-3xl"
        style={{ background: "var(--pt-purple)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-[55%] -z-10 size-[420px] rounded-full opacity-[0.15] blur-3xl"
        style={{ background: "var(--pt-blue)" }}
      />

      <Hero />

      <div className="flex flex-col gap-20 pb-24 pt-4 sm:gap-28 sm:pb-32">
        <SocialProof />
        <Archetypes />
        <HowItWorks />
        <ResultPreview />
        <Testimonials />
        <BottomCta />
      </div>

      <StickyStart />
    </main>
  )
}
