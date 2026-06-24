"use client"

import { Reveal } from "./reveal"

const testimonials = [
  {
    quote:
      "It called me 'The Architect' and then described my exact habit of redesigning systems nobody asked me to fix. Slightly attacked, mostly seen.",
    name: "Jordan M.",
    archetype: "The Architect 🏛",
    from: "#8b5cf6",
    to: "#3b82f6",
  },
  {
    quote:
      "I've taken a dozen personality tests. This is the first one that named a blind spot I've been avoiding for years instead of just flattering me.",
    name: "Amara K.",
    archetype: "The Visionary 🔭",
    from: "#3b82f6",
    to: "#06b6d4",
  },
  {
    quote:
      "The career directions were scarily accurate — it suggested the exact pivot I made last year. Sent it to my whole team within an hour.",
    name: "Riley T.",
    archetype: "The Connector 🤝",
    from: "#8b5cf6",
    to: "#ec4899",
  },
]

export function Testimonials() {
  return (
    <section className="px-5">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-pt-text sm:text-4xl">
            People meeting themselves
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border border-pt-border bg-pt-card p-6">
                <blockquote className="flex-1 text-sm leading-relaxed text-pt-text">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    className="flex size-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                    }}
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-pt-text">
                      {t.name}
                    </div>
                    <div className="text-xs text-pt-muted">{t.archetype}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
