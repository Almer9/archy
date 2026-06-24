export type OceanTrait =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "neuroticism"

export type OceanScores = Record<OceanTrait, number>

export interface ArchetypeInfo {
  emoji: string
  name: string
  tagline: string
  topPercent: number
  matchPercent: number
}

export interface AnalysisItem {
  title: string
  description: string
  /** Premium items (deepDive, actionPlan) are blurred behind the paywall. */
  locked?: boolean
}

export interface CareerDirection {
  title: string
  description: string
}

export interface AnalysisResult {
  archetype: ArchetypeInfo
  ocean: OceanScores
  strengths: AnalysisItem[]
  growthAreas: AnalysisItem[]
  careers: CareerDirection[]
}

export const OCEAN_LABELS: Record<OceanTrait, string> = {
  openness: "Curious & Creative",
  conscientiousness: "Disciplined & Organized",
  extraversion: "Social Energy",
  agreeableness: "Empathy & Cooperation",
  neuroticism: "Emotional Sensitivity",
}

export const OCEAN_ORDER: OceanTrait[] = [
  "openness",
  "conscientiousness",
  "extraversion",
  "agreeableness",
  "neuroticism",
]

/** Sample result used to drive the streaming hook + share page demo. */
export const sampleResult: AnalysisResult = {
  archetype: {
    emoji: "🔭",
    name: "The Visionary",
    tagline: "You see the world as it could be, not as it is.",
    topPercent: 5,
    matchPercent: 94,
  },
  ocean: {
    openness: 92,
    conscientiousness: 74,
    extraversion: 48,
    agreeableness: 66,
    neuroticism: 39,
  },
  strengths: [
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
  ],
  growthAreas: [
    {
      title: "Diplomatic Conflict Avoidance",
      description:
        "You tend to delay hard conversations, letting small tensions compound until they're harder to resolve.",
    },
    {
      title: "Perfectionism Paralysis",
      description: "Your high standards sometimes block progress.",
      locked: true,
    },
    {
      title: "Isolation Under Stress",
      description: "You pull back when you need support most.",
      locked: true,
    },
  ],
  careers: [
    {
      title: "UX Researcher",
      description:
        "Your pattern of deep focus and systems thinking makes you exceptional at finding what others miss.",
    },
    {
      title: "Product Strategist",
      description:
        "Translating big-picture vision into the roadmap a team can actually execute.",
    },
    {
      title: "Research Scientist",
      description:
        "Following curiosity to the edge of what's known and pushing it further.",
    },
    {
      title: "Founder / Builder",
      description:
        "Turning a contrarian view of the future into something real.",
    },
    {
      title: "Systems Architect",
      description:
        "Designing the underlying structure that everything else depends on.",
    },
  ],
}
