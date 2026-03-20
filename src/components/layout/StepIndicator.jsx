import { useLocation } from 'react-router-dom'

const steps = [
  { path: '/idea', label: 'Idea Discovery', step: 1 },
  { path: '/prd', label: 'PRD Writer', step: 2 },
  { path: '/zone', label: 'Zone Map', step: 3 },
]

export default function StepIndicator() {
  const { pathname } = useLocation()
  const currentStep = steps.find((s) => pathname.startsWith(s.path))?.step ?? 0

  return (
    <div className="flex h-14 items-center gap-8 border-b border-gray-200 bg-white px-6">
      {steps.map(({ label, step }) => {
        const isActive = step === currentStep
        const isDone = step < currentStep

        return (
          <div key={step} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                isActive
                  ? 'bg-primary text-white'
                  : isDone
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {isDone ? '✓' : step}
            </span>
            <span
              className={`text-sm font-medium ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`}
            >
              {label}
            </span>
            {step < 3 && (
              <span className="ml-4 h-px w-12 bg-gray-300" />
            )}
          </div>
        )
      })}
    </div>
  )
}
