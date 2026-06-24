"use client"

import { useEffect, useRef, useState } from "react"
import { type AnalysisResult, sampleResult } from "./analysis"

export type AnalysisStep =
  | "start"
  | "answers"
  | "archetype"
  | "strengths"
  | "growth"
  | "careers"
  | "done"

interface Stage {
  at: number
  step: AnalysisStep
  label: string
}

/** Progress thresholds → step label shown beneath the progress bar. */
const STAGES: Stage[] = [
  { at: 15, step: "answers", label: "Analyzing your answers..." },
  { at: 30, step: "archetype", label: "Finding your archetype..." },
  { at: 50, step: "strengths", label: "Identifying your strengths..." },
  { at: 70, step: "growth", label: "Mapping your growth areas..." },
  { at: 85, step: "careers", label: "Exploring career directions..." },
]

function stageFor(progress: number): Stage {
  let current = STAGES[0]
  for (const stage of STAGES) {
    if (progress >= stage.at) current = stage
  }
  return current
}

export interface AnalysisStream {
  /** Full result, available only once the analysis completes. */
  result: AnalysisResult | null
  /** 0–100 progress for the loading bar. */
  progress: number
  /** Current pipeline step. */
  step: AnalysisStep
  /** Human label shown beneath the bar. */
  stepLabel: string
  /** Archetype name + emoji, revealed early (once step === "archetype"). */
  archetypeName: string | null
  archetypeEmoji: string
  isLoading: boolean
}

/**
 * Simulates a streaming AI analysis. Progress climbs smoothly to 100%,
 * the archetype name is revealed partway through, and the full result
 * resolves once the bar fills.
 */
export function useAnalysisStream(
  source: AnalysisResult = sampleResult,
): AnalysisStream {
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const duration = 4200 // ms, feels deliberate not cheap
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      // ease-out so it slows gracefully near the end
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = Math.round(eased * 100)
      setProgress(next)

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setResult(source)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [source])

  const stage = stageFor(progress)
  const archetypeRevealed = progress >= 30

  return {
    result,
    progress,
    step: result ? "done" : stage.step,
    stepLabel: stage.label,
    archetypeName: archetypeRevealed ? source.archetype.name : null,
    archetypeEmoji: source.archetype.emoji,
    isLoading: result == null,
  }
}
