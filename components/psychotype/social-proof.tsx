"use client"

import { Star } from "lucide-react"
import { Reveal } from "./reveal"

const avatars = [
  { initials: "JM", from: "#8b5cf6", to: "#3b82f6" },
  { initials: "AK", from: "#3b82f6", to: "#06b6d4" },
  { initials: "RT", from: "#8b5cf6", to: "#ec4899" },
  { initials: "SL", from: "#6366f1", to: "#8b5cf6" },
  { initials: "DP", from: "#3b82f6", to: "#8b5cf6" },
]

export function SocialProof() {
  return (
    <section className="px-5">
      <Reveal className="mx-auto max-w-[1100px]">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center">
          <div className="flex -space-x-2">
            {avatars.map((a) => (
              <span
                key={a.initials}
                className="flex size-7 items-center justify-center rounded-full border-2 border-pt-bg text-[10px] font-semibold text-white"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                }}
              >
                {a.initials}
              </span>
            ))}
          </div>

          <p className="text-sm text-pt-muted">
            <span className="font-semibold text-pt-text">12,847 people</span>{" "}
            analyzed this week
          </p>

          <span aria-hidden="true" className="text-pt-muted">
            &middot;
          </span>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-pt-purple text-pt-purple"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-pt-text">4.9</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
