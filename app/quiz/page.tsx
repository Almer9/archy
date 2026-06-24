import { QuizFlow } from "@/components/psychotype/quiz-flow"

export default function QuizPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-pt-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-[15%] -z-10 size-[420px] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "var(--pt-purple)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-[60%] -z-10 size-[420px] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "var(--pt-blue)" }}
      />
      <QuizFlow />
    </main>
  )
}
