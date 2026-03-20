import { useState } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import { FiX } from 'react-icons/fi'

const AI_ACTIONS = [
  { id: 'detail', label: '구체화', desc: '작업 내용을 실무 수준 태스크로 세분화' },
  { id: 'gap', label: '갭 분석', desc: '5W1H 관점에서 빠진 항목 지적' },
  { id: 'output', label: '산출물', desc: '해당 Zone의 산출물 마크다운 템플릿 생성' },
  { id: 'deps', label: '의존성', desc: '선행/후속 Zone 관계 적절성 검토' },
]

export default function ZoneModal({ zone, onClose }) {
  const { updateZone } = useAppStore()
  const [activeAction, setActiveAction] = useState(null)
  const [detail, setDetail] = useState(zone.detail || '')

  const handleSave = () => {
    updateZone(zone.id, { detail })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400">
              Zone #{zone.id} &middot; {zone.category}
            </span>
            <h3 className="text-lg font-bold text-gray-900">{zone.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* AI Actions */}
        <div className="mb-4 flex gap-2">
          {AI_ACTIONS.map((a) => (
            <button
              key={a.id}
              onClick={() => setActiveAction(a.id)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                activeAction === a.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        {activeAction && (
          <div className="mb-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-500">
            {AI_ACTIONS.find((a) => a.id === activeAction)?.desc}
            {/* TODO: AI 호출 결과 표시 */}
          </div>
        )}

        {/* Detail editor */}
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          rows={6}
          className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          placeholder="Zone 상세 내용을 작성하세요..."
        />

        {/* Dependencies */}
        {zone.deps.length > 0 && (
          <div className="mb-4 text-xs text-gray-400">
            선행 Zone: {zone.deps.map((d) => `#${d}`).join(', ')}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
