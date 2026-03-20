import { useNavigate } from 'react-router-dom'
import { FiZap, FiFileText, FiGrid, FiArrowRight } from 'react-icons/fi'

const steps = [
  {
    icon: FiZap,
    title: 'Idea Discovery',
    desc: '4가지 방법론으로 AI와 대화하며 아이디어를 구체화합니다.',
    color: 'bg-indigo-500',
  },
  {
    icon: FiFileText,
    title: 'PRD Writer',
    desc: '5W1H 프레임워크 기반 24개 항목 PRD를 AI가 자동 생성합니다.',
    color: 'bg-violet-500',
  },
  {
    icon: FiGrid,
    title: 'Zone Map',
    desc: 'PRD 기반 20개 작업 Zone과 의존성을 시각화합니다.',
    color: 'bg-cyan-500',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      {/* Hero */}
      <header className="flex flex-col items-center px-6 pt-24 pb-16 text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900">
          <span className="text-primary">Vibe</span>Check
        </h1>
        <p className="mb-2 max-w-xl text-lg text-gray-600">
          아이디어부터 PRD, 작업 분해까지 — AI가 함께하는 기획 워크플로우
        </p>
        <p className="mb-8 text-sm text-gray-400">
          Idea &rarr; PRD &rarr; Zone Map
        </p>
        <button
          onClick={() => navigate('/idea')}
          className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-primary-dark"
        >
          시작하기 <FiArrowRight />
        </button>
      </header>

      {/* 3-Step Workflow */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${color} text-white`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                Step {i + 1}
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        VibeCheck &mdash; AI Sprint-thon 2026
      </footer>
    </div>
  )
}
