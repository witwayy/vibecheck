import { useEffect } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import ZoneTile from '@/components/zone/ZoneTile'
import ZoneModal from '@/components/zone/ZoneModal'
import { useState } from 'react'

const DEFAULT_ZONES = [
  // Row 1: Foundation (선행)
  { id: 1, name: '요구사항 분석', category: 'WHY', col: 0, row: 0, deps: [] },
  { id: 2, name: '사용자 리서치', category: 'WHO', col: 1, row: 0, deps: [1] },
  { id: 3, name: '경쟁 분석', category: 'WHY', col: 2, row: 0, deps: [1] },
  { id: 4, name: '기술 조사', category: 'HOW', col: 3, row: 0, deps: [1] },
  // Row 2: Design
  { id: 5, name: '기능 정의', category: 'WHAT', col: 0, row: 1, deps: [1, 2] },
  { id: 6, name: 'UX 설계', category: 'WHAT', col: 1, row: 1, deps: [2, 5] },
  { id: 7, name: '정보 구조 설계', category: 'WHAT', col: 2, row: 1, deps: [5] },
  { id: 8, name: 'API 스펙 정의', category: 'HOW', col: 3, row: 1, deps: [5, 4] },
  // Row 3: Build
  { id: 9, name: 'DB 스키마 설계', category: 'HOW', col: 0, row: 2, deps: [5, 8] },
  { id: 10, name: 'UI 컴포넌트 개발', category: 'HOW', col: 1, row: 2, deps: [6, 7] },
  { id: 11, name: '백엔드 개발', category: 'HOW', col: 2, row: 2, deps: [8, 9] },
  { id: 12, name: '인증/보안 구현', category: 'HOW', col: 3, row: 2, deps: [11] },
  // Row 4: Integrate
  { id: 13, name: 'API 연동', category: 'HOW', col: 0, row: 3, deps: [10, 11] },
  { id: 14, name: '데이터 파이프라인', category: 'HOW', col: 1, row: 3, deps: [9, 11] },
  { id: 15, name: '외부 서비스 연동', category: 'WHERE', col: 2, row: 3, deps: [11, 12] },
  { id: 16, name: '알림/모니터링', category: 'WHERE', col: 3, row: 3, deps: [11] },
  // Row 5: Deliver (후속)
  { id: 17, name: '통합 테스트', category: 'HOW', col: 0, row: 4, deps: [13, 14] },
  { id: 18, name: '성능 최적화', category: 'HOW', col: 1, row: 4, deps: [13, 17] },
  { id: 19, name: '배포 파이프라인', category: 'WHERE', col: 2, row: 4, deps: [17, 18] },
  { id: 20, name: '문서화/인수인계', category: 'WHEN', col: 3, row: 4, deps: [17, 19] },
]

export default function ZoneMapPage() {
  const { zones, setZones, prdData } = useAppStore()
  const [selectedZone, setSelectedZone] = useState(null)

  useEffect(() => {
    if (zones.length === 0) {
      setZones(DEFAULT_ZONES.map((z) => ({ ...z, detail: '', status: 'todo' })))
    }
  }, [zones.length, setZones])

  const handleGenerateFromPRD = () => {
    // TODO: PRD 데이터 기반 Zone 자동 생성/매핑
    console.log('Generate zones from PRD:', prdData)
  }

  return (
    <div className="h-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Zone Map</h2>
          <p className="text-sm text-gray-500">
            좌(선행) &rarr; 우(후속) 의존성 흐름
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleGenerateFromPRD}
            className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/5"
          >
            PRD에서 자동 생성
          </button>
          <button className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700">
            작업 목록 내보내기
          </button>
        </div>
      </div>

      {/* Zone Grid */}
      <div className="overflow-auto rounded-xl border border-gray-200 bg-white p-6">
        <div className="grid grid-cols-4 gap-4">
          {zones.map((zone) => (
            <ZoneTile
              key={zone.id}
              zone={zone}
              onClick={() => setSelectedZone(zone)}
            />
          ))}
        </div>
      </div>

      {/* Dependency arrows would be rendered via SVG overlay in production */}

      {selectedZone && (
        <ZoneModal
          zone={selectedZone}
          onClose={() => setSelectedZone(null)}
        />
      )}
    </div>
  )
}
