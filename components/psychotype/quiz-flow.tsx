"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*  TYPES + CONTENT                                                           */
/* -------------------------------------------------------------------------- */

type Language = "en" | "ua" | "ru"
type Screen = "language" | "questions" | "open" | "loading"

interface LanguageOption {
  code: Language
  flag: string
  name: string
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "ua", flag: "🇺🇦", name: "Українська" },
  { code: "ru", flag: "🇷🇺", name: "Русский" },
]

/** 10 scale questions, localized. */
const SCALE_QUESTIONS: Record<Language, string[]> = {
  en: [
    "I often lose track of time when exploring a new idea.",
    "I prefer finishing one task completely before starting another.",
    "I feel energized after spending time around lots of people.",
    "I instinctively put other people's needs before my own.",
    "Small setbacks can occupy my thoughts for the rest of the day.",
    "I enjoy questioning assumptions that everyone else takes for granted.",
    "I keep my space and schedule highly organized.",
    "I'd rather lead a conversation than listen quietly.",
    "I find it easy to forgive people who let me down.",
    "I notice subtle shifts in my own mood throughout the day.",
  ],
  ua: [
    "Я часто втрачаю відчуття часу, коли досліджую нову ідею.",
    "Я волію повністю завершити одну справу, перш ніж почати іншу.",
    "Я відчуваю приплив енергії після спілкування з багатьма людьми.",
    "Я інстинктивно ставлю потреби інших вище за власні.",
    "Дрібні невдачі можуть займати мої думки до кінця дня.",
    "Мені подобається ставити під сумнів те, що всі вважають очевидним.",
    "Я тримаю свій простір і розклад дуже організованими.",
    "Я радше вестиму розмову, ніж тихо слухатиму.",
    "Мені легко пробачати людей, які мене підвели.",
    "Я помічаю ледь вловимі зміни власного настрою протягом дня.",
  ],
  ru: [
    "Я часто теряю счёт времени, когда исследую новую идею.",
    "Я предпочитаю полностью завершить одно дело, прежде чем начать другое.",
    "Я чувствую прилив энергии после общения с большим количеством людей.",
    "Я инстинктивно ставлю потребности других выше своих.",
    "Мелкие неудачи могут занимать мои мысли до конца дня.",
    "Мне нравится подвергать сомнению то, что все считают очевидным.",
    "Я держу своё пространство и расписание очень организованными.",
    "Я скорее буду вести разговор, чем тихо слушать.",
    "Мне легко прощать людей, которые меня подвели.",
    "Я замечаю едва уловимые перемены своего настроения в течение дня.",
  ],
}

interface UIStrings {
  langTitle: string
  langSub: string
  start: string
  questionOf: (x: number, total: number) => string
  disagree: string
  agree: string
  back: string
  openQuestion: string
  openPlaceholder: string
  seeResults: string
  analyzing: string
  charsOver: string
  loadingTitle: string
}

const UI: Record<Language, UIStrings> = {
  en: {
    langTitle: "Choose your language",
    langSub: "Your results will be in this language",
    start: "Start",
    questionOf: (x, total) => `Question ${x} of ${total}`,
    disagree: "Strongly disagree",
    agree: "Strongly agree",
    back: "Go back",
    openQuestion: "When do you feel most like yourself?",
    openPlaceholder:
      "Describe a situation where you felt completely in your element...",
    seeResults: "See my results",
    analyzing: "Analyzing...",
    charsOver: "Too long",
    loadingTitle: "Analyzing your answers...",
  },
  ua: {
    langTitle: "Оберіть мову",
    langSub: "Ваші результати будуть цією мовою",
    start: "Почати",
    questionOf: (x, total) => `Питання ${x} з ${total}`,
    disagree: "Зовсім не згоден",
    agree: "Цілком згоден",
    back: "Назад",
    openQuestion: "Коли ви почуваєтеся справжнім собою?",
    openPlaceholder:
      "Опишіть ситуацію, коли ви почувалися повністю у своїй стихії...",
    seeResults: "Показати результати",
    analyzing: "Аналізуємо...",
    charsOver: "Занадто довго",
    loadingTitle: "Аналізуємо ваші відповіді...",
  },
  ru: {
    langTitle: "Выберите язык",
    langSub: "Ваши результаты будут на этом языке",
    start: "Начать",
    questionOf: (x, total) => `Вопрос ${x} из ${total}`,
    disagree: "Совсем не согласен",
    agree: "Полностью согласен",
    back: "Назад",
    openQuestion: "Когда вы чувствуете себя по-настоящему собой?",
    openPlaceholder:
      "Опишите ситуацию, в которой вы чувствовали себя полностью в своей стихии...",
    seeResults: "Показать результаты",
    analyzing: "Анализируем...",
    charsOver: "Слишком длинно",
    loadingTitle: "Анализируем ваши ответы...",
  },
}

const TOTAL_QUESTIONS = SCALE_QUESTIONS.en.length + 1 // 10 scale + 1 open = 11
const MAX_CHARS = 600
const WARN_CHARS = 500
const MIN_CHARS = 20

/* -------------------------------------------------------------------------- */
/*  SCREEN 0 — LANGUAGE SELECT                                                */
/* -------------------------------------------------------------------------- */

function LanguageScreen({
  selected,
  onSelect,
  onStart,
}: {
  selected: Language | null
  onSelect: (lang: Language) => void
  onStart: () => void
}) {
  const strings = UI[selected ?? "en"]

  return (
    <div className="flex min-h-screen flex-col px-5">
      {/* logo */}
      <div className="flex items-center gap-2 py-6">
        <span className="pt-gradient flex size-7 items-center justify-center rounded-lg">
          <Sparkles className="size-4 text-white" />
        </span>
        <span className="text-lg font-semibold tracking-tight text-pt-text">
          Psychotype
        </span>
      </div>

      {/* centered content */}
      <div className="flex flex-1 flex-col items-center justify-center pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-balance text-center text-3xl font-bold tracking-tight text-pt-text sm:text-4xl"
        >
          {strings.langTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-center text-sm text-pt-muted"
        >
          {strings.langSub}
        </motion.p>

        <div className="mt-8 flex w-full max-w-[340px] flex-col gap-3">
          {LANGUAGES.map((lang, i) => {
            const isSelected = selected === lang.code
            return (
              <motion.button
                key={lang.code}
                type="button"
                onClick={() => onSelect(lang.code)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex h-16 w-full items-center gap-4 rounded-2xl px-5 text-left transition-colors",
                  isSelected
                    ? "pt-gradient-border"
                    : "border border-pt-border bg-pt-card hover:bg-white/[0.06]",
                )}
                aria-pressed={isSelected}
              >
                <span className="text-2xl" aria-hidden="true">
                  {lang.flag}
                </span>
                <span
                  className={cn(
                    "text-lg font-semibold",
                    isSelected ? "pt-gradient-text" : "text-pt-text",
                  )}
                >
                  {lang.name}
                </span>
              </motion.button>
            )
          })}
        </div>

        <motion.button
          type="button"
          onClick={onStart}
          disabled={!selected}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
          whileTap={selected ? { scale: 0.98 } : undefined}
          className={cn(
            "pt-gradient mt-6 flex h-14 w-full max-w-[340px] items-center justify-center gap-2 rounded-full text-base font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.35)] transition-opacity",
            !selected && "cursor-not-allowed opacity-40",
          )}
        >
          {strings.start}
          <ArrowRight className="size-5" />
        </motion.button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  TOP BAR (progress)                                                        */
/* -------------------------------------------------------------------------- */

function TopBar({
  current,
  language,
  onBack,
  canGoBack,
}: {
  current: number // 1-based question index
  language: Language
  onBack: () => void
  canGoBack: boolean
}) {
  const strings = UI[language]
  const progress = (current / TOTAL_QUESTIONS) * 100

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-pt-bg/90 backdrop-blur-sm">
      {/* progress bar */}
      <div className="h-[3px] w-full bg-white/10">
        <motion.div
          className="pt-gradient h-full"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <div className="relative flex h-10 items-center justify-center">
        {canGoBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label={strings.back}
            className="absolute left-3 flex size-8 items-center justify-center rounded-full text-pt-muted transition-colors hover:bg-white/5 hover:text-pt-text"
          >
            <ArrowLeft className="size-4" />
          </button>
        )}
        <span className="text-[11px] font-medium text-pt-muted">
          {strings.questionOf(current, TOTAL_QUESTIONS)}
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  SCREEN 1-10 — SCALE QUESTION                                              */
/* -------------------------------------------------------------------------- */

const SCALE_VALUES = [1, 2, 3, 4, 5]

function ScaleQuestion({
  index,
  question,
  language,
  selected,
  onSelect,
}: {
  index: number // 0-based
  question: string
  language: Language
  selected: number | undefined
  onSelect: (value: number) => void
}) {
  const strings = UI[language]
  const number = String(index + 1).padStart(2, "0")

  return (
    <div className="flex w-full flex-col items-center">
      <span className="pt-gradient-text font-mono text-sm font-semibold">
        {number}
      </span>

      <h2 className="mt-4 max-w-[520px] text-balance text-center text-2xl font-bold leading-tight text-pt-text sm:text-3xl">
        {question}
      </h2>

      {/* scale buttons */}
      <div className="mt-10 flex items-center justify-center gap-3 sm:gap-4">
        {SCALE_VALUES.map((value) => {
          const isSelected = selected === value
          return (
            <motion.button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              animate={isSelected ? { scale: [0.9, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              whileTap={{ scale: 0.9 }}
              aria-label={`${value}`}
              aria-pressed={isSelected}
              className={cn(
                "flex size-[60px] items-center justify-center rounded-full text-lg font-semibold transition-colors sm:size-[72px] sm:text-xl",
                isSelected
                  ? "pt-gradient text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                  : "border border-pt-border bg-pt-card text-pt-text hover:border-pt-purple/40 hover:bg-white/10",
              )}
            >
              {value}
            </motion.button>
          )
        })}
      </div>

      {/* scale labels */}
      <div className="mt-5 flex w-full max-w-[360px] items-center justify-between px-1">
        <span className="text-[11px] text-pt-muted">{strings.disagree}</span>
        <span className="text-[11px] text-pt-muted">{strings.agree}</span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  SCREEN 11 — OPEN TEXT QUESTION                                            */
/* -------------------------------------------------------------------------- */

function OpenQuestion({
  language,
  value,
  onChange,
  onSubmit,
  isSubmitting,
}: {
  language: Language
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  isSubmitting: boolean
}) {
  const strings = UI[language]
  const count = value.length
  const over = count > WARN_CHARS
  const blocked = count > MAX_CHARS
  const canSubmit = count > MIN_CHARS && !blocked && !isSubmitting

  return (
    <div className="flex w-full flex-col items-center">
      <span className="pt-gradient-text font-mono text-sm font-semibold">
        11
      </span>

      <h2 className="mt-4 max-w-[520px] text-balance text-center text-2xl font-bold leading-tight text-pt-text sm:text-3xl">
        {strings.openQuestion}
      </h2>

      <div className="mt-8 flex w-full max-w-[520px] flex-col">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={strings.openPlaceholder}
          className="min-h-[140px] w-full resize-none rounded-2xl border border-pt-border bg-pt-card p-4 text-base leading-relaxed text-pt-text placeholder:text-pt-muted/60 focus:border-pt-purple/60 focus:outline-none focus:ring focus:ring-pt-purple/20"
        />
        <div className="mt-2 flex items-center justify-end">
          <span
            className={cn(
              "text-xs tabular-nums",
              over ? "font-semibold text-red-400" : "text-pt-muted",
            )}
          >
            {count} / {MAX_CHARS}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {count > MIN_CHARS && (
          <motion.button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            whileTap={canSubmit ? { scale: 0.98 } : undefined}
            className={cn(
              "pt-gradient mt-6 flex h-14 w-full max-w-[400px] items-center justify-center gap-2 rounded-full text-base font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.35)] transition-opacity",
              !canSubmit && "cursor-not-allowed opacity-50",
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                {strings.analyzing}
              </>
            ) : (
              <>
                {strings.seeResults}
                <ArrowRight className="size-5" />
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  LOADING OVERLAY                                                           */
/* -------------------------------------------------------------------------- */

function LoadingOverlay({ language }: { language: Language }) {
  const strings = UI[language]
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / 1500) * 100)
      setProgress(pct)
      if (pct < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[60] flex min-h-screen flex-col items-center justify-center bg-pt-bg px-5"
    >
      <div className="flex w-full max-w-[420px] flex-col items-center text-center">
        <motion.span
          className="text-7xl"
          role="img"
          aria-label="analyzing"
          animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          🔭
        </motion.span>

        <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="pt-gradient h-full rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        <p className="mt-4 text-sm font-medium text-pt-muted">
          {strings.loadingTitle}
        </p>
      </div>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*  MAIN — QUIZ FLOW                                                          */
/* -------------------------------------------------------------------------- */

export function QuizFlow() {
  const router = useRouter()

  const [screen, setScreen] = useState<Screen>("language")
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null,
  )
  const [language, setLanguage] = useState<Language>("en")
  const [questionIndex, setQuestionIndex] = useState(0) // 0-9 scale, 10 = open
  const [direction, setDirection] = useState<1 | -1>(1)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [openAnswer, setOpenAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const scaleCount = SCALE_QUESTIONS.en.length // 10

  const goToOpen = useCallback(() => {
    setDirection(1)
    setScreen("open")
  }, [])

  const handleSelectScale = useCallback(
    (value: number) => {
      setAnswers((prev) => ({ ...prev, [questionIndex]: value }))
      // advance after the spring animation reads nicely
      window.setTimeout(() => {
        setDirection(1)
        if (questionIndex < scaleCount - 1) {
          setQuestionIndex((i) => i + 1)
        } else {
          goToOpen()
        }
      }, 220)
    },
    [questionIndex, scaleCount, goToOpen],
  )

  const handleBack = useCallback(() => {
    setDirection(-1)
    if (screen === "open") {
      setScreen("questions")
      setQuestionIndex(scaleCount - 1)
      return
    }
    if (questionIndex > 0) {
      setQuestionIndex((i) => i - 1)
    } else {
      setScreen("language")
    }
  }, [screen, questionIndex, scaleCount])

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true)
    setScreen("loading")
    window.setTimeout(() => {
      router.push("/results")
    }, 1500)
  }, [router])

  /* keyboard support */
  useEffect(() => {
    if (screen !== "questions") return
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "5") {
        handleSelectScale(Number(e.key))
      } else if (e.key === "Backspace") {
        e.preventDefault()
        handleBack()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [screen, handleSelectScale, handleBack])

  function handleStart() {
    if (!selectedLanguage) return
    setLanguage(selectedLanguage)
    setDirection(1)
    setScreen("questions")
  }

  /* ----- LANGUAGE SCREEN ----- */
  if (screen === "language") {
    return (
      <LanguageScreen
        selected={selectedLanguage}
        onSelect={setSelectedLanguage}
        onStart={handleStart}
      />
    )
  }

  /* ----- LOADING SCREEN ----- */
  if (screen === "loading") {
    return <LoadingOverlay language={language} />
  }

  /* ----- QUESTION / OPEN SCREENS ----- */
  const currentNumber = screen === "open" ? TOTAL_QUESTIONS : questionIndex + 1
  const canGoBack = true // always able to go back from Q1 (returns to language) onward
  const animationKey = screen === "open" ? "open" : `q-${questionIndex}`

  return (
    <div className="relative min-h-screen">
      <TopBar
        current={currentNumber}
        language={language}
        onBack={handleBack}
        canGoBack={canGoBack}
      />

      <div className="flex min-h-screen items-center justify-center overflow-hidden px-5 pb-10 pt-16">
        <div className="mx-auto w-full max-w-[640px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={animationKey}
              custom={direction}
              initial={{ x: direction * 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {screen === "open" ? (
                <OpenQuestion
                  language={language}
                  value={openAnswer}
                  onChange={setOpenAnswer}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              ) : (
                <ScaleQuestion
                  index={questionIndex}
                  question={SCALE_QUESTIONS[language][questionIndex]}
                  language={language}
                  selected={answers[questionIndex]}
                  onSelect={handleSelectScale}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
