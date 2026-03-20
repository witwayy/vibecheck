import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/useAppStore'
import ChatPanel from '@/components/common/ChatPanel'

const METHODS = [
  { id: 'pain-log', label: '불편 로그', desc: '일상의 불편함에서 아이디어를 발견합니다.' },
  { id: 'scamper', label: 'SCAMPER', desc: '기존 제품/서비스를 변형하여 새로운 아이디어를 만듭니다.' },
  { id: 'hmw', label: 'HMW', desc: '"How Might We..." 질문으로 문제를 재정의합니다.' },
  { id: 'trend', label: '트렌드 탐색', desc: '최신 트렌드에서 기회를 포착합니다.' },
]

const PRESETS = {
  'pain-log': [
    '최근 업무에서 가장 불편했던 순간은?',
    '반복적으로 시간을 낭비하는 작업은?',
    '동료들이 자주 불만을 표현하는 부분은?',
  ],
  scamper: [
    '기존 프로세스에서 제거할 수 있는 단계는?',
    '다른 산업의 방식을 적용하면 어떨까?',
    '기존 도구의 순서를 바꾸면?',
  ],
  hmw: [
    '어떻게 하면 신규 입사자가 더 빨리 적응할 수 있을까?',
    '어떻게 하면 회의 시간을 절반으로 줄일 수 있을까?',
    '어떻게 하면 반복 업무를 자동화할 수 있을까?',
  ],
  trend: [
    'AI 기반 업무 도구 중 주목할 만한 트렌드는?',
    '노코드/로우코드가 우리 업무에 미칠 영향은?',
    '최근 생산성 도구의 혁신 사례는?',
  ],
}

export default function IdeaDiscoveryPage() {
  const navigate = useNavigate()
  const { ideaData, setIdeaData } = useAppStore()
  const [activeMethod, setActiveMethod] = useState(ideaData.method)

  const handleMethodChange = (methodId) => {
    setActiveMethod(methodId)
    setIdeaData({ method: methodId })
  }

  const handleNext = () => {
    navigate('/prd')
  }

  return (
    <div className="flex h-full gap-6">
      {/* Left: Method tabs + presets */}
      <div className="w-80 shrink-0 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Idea Discovery</h2>
        <p className="text-sm text-gray-500">
          방법론을 선택하고 AI와 대화하며 아이디어를 구체화하세요.
        </p>

        <div className="space-y-2">
          {METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => handleMethodChange(m.id)}
              className={`w-full rounded-lg border p-3 text-left transition ${
                activeMethod === m.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-semibold text-gray-800">{m.label}</div>
              <div className="text-xs text-gray-500">{m.desc}</div>
            </button>
          ))}
        </div>

        <div className="pt-4">
          <div className="mb-2 text-xs font-medium text-gray-400">프리셋 질문</div>
          <div className="space-y-1.5">
            {PRESETS[activeMethod]?.map((q, i) => (
              <button
                key={i}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-left text-xs text-gray-600 transition hover:bg-gray-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          PRD Writer로 이동 &rarr;
        </button>
      </div>

      {/* Right: Chat */}
      <div className="flex-1">
        <ChatPanel
          systemPrompt={`당신은 아이디어 발견을 돕는 AI 코치입니다. 현재 방법론: ${activeMethod}. 사용자의 입력을 분석하여 구체적인 제품/서비스 아이디어를 도출해주세요.`}
        />
      </div>
    </div>
  )
}
