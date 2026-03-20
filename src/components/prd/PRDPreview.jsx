import { useAppStore } from '@/stores/useAppStore'
import { FiCopy } from 'react-icons/fi'

const FIELD_LABELS = {
  background: '배경', problem: '문제 정의', goal: '목표', kpi: 'KPI',
  targetUser: '타겟 사용자', stakeholder: '이해관계자', persona: '페르소나', userJourney: '사용자 여정',
  coreFeature: '핵심 기능', scope: '범위', priority: '우선순위', mvp: 'MVP 정의',
  timeline: '타임라인', milestone: '마일스톤', sprint: '스프린트 계획', deadline: '마감일',
  platform: '플랫폼', infrastructure: '인프라', deployment: '배포 환경', environment: '개발 환경',
  techStack: '기술 스택', architecture: '아키텍처', api: 'API 설계', testing: '테스트 전략',
}

export default function PRDPreview({ chapters }) {
  const { prdData } = useAppStore()

  const toMarkdown = () => {
    let md = '# PRD (Product Requirements Document)\n\n'
    for (const ch of chapters) {
      md += `## ${ch.label}\n\n`
      for (const f of ch.fields) {
        const val = prdData[ch.id][f.key]
        md += `### ${f.label}\n${val || '(미작성)'}\n\n`
      }
    }
    return md
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(toMarkdown())
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">PRD 미리보기</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50"
        >
          <FiCopy className="h-4 w-4" />
          마크다운 복사
        </button>
      </div>

      {chapters.map((ch) => (
        <div key={ch.id} className="rounded-lg border border-gray-200 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${ch.color}`} />
            <h4 className="font-bold text-gray-800">{ch.label}</h4>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {ch.fields.map(({ key }) => {
              const val = prdData[ch.id][key]
              return (
                <div key={key}>
                  <div className="text-xs font-medium text-gray-400">
                    {FIELD_LABELS[key]}
                  </div>
                  <div className="mt-0.5 text-sm text-gray-700 whitespace-pre-wrap">
                    {val || <span className="text-gray-300">(미작성)</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
