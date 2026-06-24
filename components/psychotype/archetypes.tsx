"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Reveal } from "./reveal"

const archetypes = [
  {
    emoji: "🏛",
    name: "The Architect",
    description: "Builds systems others can't see yet. Quietly relentless.",
    percent: "8% of people",
  },
  {
    emoji: "🔭",
    name: "The Visionary",
    description: "Lives three steps ahead. Allergic to the status quo.",
    percent: "5% of people",
  },
  {
    emoji: "🤝",
    name: "The Connector",
    description: "Reads the room instantly. Turns strangers into allies.",
    percent: "12% of people",
  },
]

export function Archetypes() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / archetypes.length
    setActive(Math.round(el.scrollLeft / cardWidth))
  }

  function scrollTo(index: number) {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / archetypes.length
    el.scrollTo({ left: cardWidth * index, behavior: "smooth" })
  }

  return (
    <section className="px-5">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-pt-text sm:text-4xl">
            Which one are you?
          </h2>
        </Reveal>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {archetypes.map((a, i) => (
            <Reveal
              key={a.name}
              delay={i * 0.1}
              className="min-w-[66%] snap-start sm:min-w-0"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="pt-gradient-border group h-full rounded-3xl p-6 shadow-[0_0_0_rgba(139,92,246,0)] transition-shadow hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.45)]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl" aria-hidden="true">
                    {a.emoji}
                  </span>
                  <span className="rounded-full border border-pt-border bg-pt-bg/50 px-3 py-1 text-xs font-medium text-pt-muted">
                    {a.percent}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-pt-text">
                  {a.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pt-muted">
                  {a.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* scroll indicator dots — mobile only */}
        <div className="mt-5 flex items-center justify-center gap-2 sm:hidden">
          {archetypes.map((a, i) => (
            <button
              key={a.name}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to ${a.name}`}
              aria-current={active === i}
              className={
                active === i
                  ? "h-2 w-6 rounded-full pt-gradient transition-all"
                  : "size-2 rounded-full bg-pt-border transition-all"
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
