import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/useAppStore'
import PRDChapter from '@/components/prd/PRDChapter'
import PRDPreview from '@/components/prd/PRDPreview'

const CHAPTERS = [
  {
    id: 'why',
    label: 'WHY',
    color: 'bg-red-500',
    fields: [
      { key: 'background', label: '배경' },
      { key: 'problem', label: '문제 정의' },
      { key: 'goal', label: '목표' },
      { key: 'kpi', label: 'KPI' },
    ],
  },
  {
    id: 'who',
    label: 'WHO',
    color: 'bg-orange-500',
    fields: [
      { key: 'targetUser', label: '타겟 사용자' },
      { key: 'stakeholder', label: '이해관계자' },
      { key: 'persona', label: '페르소나' },
      { key: 'userJourney', label: '사용자 여정' },
    ],
  },
  {
    id: 'what',
    label: 'WHAT',
    color: 'bg-yellow-500',
    fields: [
      { key: 'coreFeature', label: '핵심 기능' },
      { key: 'scope', label: '범위' },
      { key: 'priority', label: '우선순위' },
      { key: 'mvp', label: 'MVP 정의' },
    ],
  },
  {
    id: 'when',
    label: 'WHEN',
    color: 'bg-green-500',
    fields: [
      { key: 'timeline', label: '타임라인' },
      { key: 'milestone', label: '마일스톤' },
      { key: 'sprint', label: '스프린트 계획' },
      { key: 'deadline', label: '마감일' },
    ],
  },
  {
    id: 'where',
    label: 'WHERE',
    color: 'bg-blue-500',
    fields: [
      { key: 'platform', label: '플랫폼' },
      { key: 'infrastructure', label: '인프라' },
      { key: 'deployment', label: '배포 환경' },
      { key: 'environment', label: '개발 환경' },
    ],
  },
  {
    id: 'how',
    label: 'HOW',
    color: 'bg-violet-500',
    fields: [
      { key: 'techStack', label: '기술 스택' },
      { key: 'architecture', label: '아키텍처' },
      { key: 'api', label: 'API 설계' },
      { key: 'testing', label: '테스트 전략' },
    ],
  },
]

export default function PRDWriterPage() {
  const navigate = useNavigate()
  const [activeChapter, setActiveChapter] = useState('why')
  const [showPreview, setShowPreview] = useState(false)
  const { prdData, chatHistory } = useAppStore()

  const handleAutoGenerate = () => {
    // TODO: AI로 Idea Discovery 맥락 기반 24개 항목 초안 자동 생성
    console.log('Auto-generate PRD from idea context:', chatHistory)
  }

  return (
    <div className="flex h-full gap-6">
      {/* Left: Chapter tabs */}
      <div className="w-56 shrink-0 space-y-3">
        <h2 className="text-lg font-bold text-gray-900">PRD Writer</h2>
        <p className="text-xs text-gray-500">5W1H 프레임워크</p>

        <button
          onClick={handleAutoGenerate}
          className="w-full rounded-lg border-2 border-dashed border-primary/40 py-2 text-sm font-medium text-primary transition hover:bg-primary/5"
        >
          AI 자동 초안 생성
        </button>

        <div className="space-y-1.5">
          {CHAPTERS.map((ch) => {
            const filled = Object.values(prdData[ch.id]).filter(Boolean).length
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                  activeChapter === ch.id
                    ? 'bg-gray-100 font-semibold text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span
                  className={`h-3 w-3 rounded-full ${ch.color}`}
                />
                <span className="flex-1 text-sm">{ch.label}</span>
                <span className="text-xs text-gray-400">{filled}/4</span>
              </button>
            )
          })}
        </div>

        <div className="space-y-2 pt-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {showPreview ? '편집 모드' : 'PRD 미리보기'}
          </button>
          <button
            onClick={() => navigate('/zone')}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Zone Map으로 이동 &rarr;
          </button>
        </div>
      </div>

      {/* Right: Chapter content or preview */}
      <div className="flex-1 overflow-y-auto">
        {showPreview ? (
          <PRDPreview chapters={CHAPTERS} />
        ) : (
          <PRDChapter
            chapter={CHAPTERS.find((c) => c.id === activeChapter)}
          />
        )}
      </div>
    </div>
  )
}
