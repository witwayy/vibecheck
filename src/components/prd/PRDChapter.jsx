import { useAppStore } from '@/stores/useAppStore'
import { FiMessageSquare } from 'react-icons/fi'

const PRESETS_BY_CHAPTER = {
  why: [
    'SMART 기준으로 목표를 다듬어줘',
    '이 문제의 근본 원인을 분석해줘',
    'KPI를 측정 가능한 형태로 제안해줘',
  ],
  who: [
    '타겟 사용자의 페르소나를 구체화해줘',
    '이해관계자 맵을 그려줘',
    '사용자 여정의 Pain Point를 분석해줘',
  ],
  what: [
    'MoSCoW 우선순위로 기능을 분류해줘',
    'MVP에 포함할 최소 기능을 정의해줘',
    '기능 범위가 적절한지 검토해줘',
  ],
  when: [
    '2주 스프린트로 일정을 나눠줘',
    '마일스톤별 체크포인트를 제안해줘',
    '일정 리스크 요인을 분석해줘',
  ],
  where: [
    '적절한 배포 환경을 추천해줘',
    '인프라 요구사항을 정리해줘',
    '개발/스테이징/프로덕션 환경을 구분해줘',
  ],
  how: [
    '기술 스택 선택 근거를 정리해줘',
    'API 엔드포인트 목록을 생성해줘',
    '테스트 전략을 수립해줘',
  ],
}

export default function PRDChapter({ chapter }) {
  const { prdData, setPrdField } = useAppStore()
  const data = prdData[chapter.id]
  const presets = PRESETS_BY_CHAPTER[chapter.id] || []

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className={`h-4 w-4 rounded-full ${chapter.color}`} />
        <h3 className="text-xl font-bold text-gray-900">{chapter.label}</h3>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {chapter.fields.map(({ key, label }) => (
          <div key={key} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                <FiMessageSquare className="h-3 w-3" />
                AI 피드백
              </button>
            </div>
            <textarea
              value={data[key] || ''}
              onChange={(e) => setPrdField(chapter.id, key, e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              placeholder={`${label}을(를) 작성하세요...`}
            />
          </div>
        ))}
      </div>

      {/* Presets */}
      <div>
        <div className="mb-2 text-xs font-medium text-gray-400">
          AI 프리셋 질문
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition hover:border-primary hover:text-primary"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
