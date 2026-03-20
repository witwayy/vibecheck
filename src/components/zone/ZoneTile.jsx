const CATEGORY_COLORS = {
  WHY: 'border-l-red-500 bg-red-50',
  WHO: 'border-l-orange-500 bg-orange-50',
  WHAT: 'border-l-yellow-500 bg-yellow-50',
  WHEN: 'border-l-green-500 bg-green-50',
  WHERE: 'border-l-blue-500 bg-blue-50',
  HOW: 'border-l-violet-500 bg-violet-50',
}

export default function ZoneTile({ zone, onClick }) {
  const colorClass = CATEGORY_COLORS[zone.category] || 'border-l-gray-400 bg-gray-50'

  return (
    <button
      onClick={onClick}
      className={`rounded-lg border border-l-4 p-3 text-left transition hover:shadow-md ${colorClass}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400">#{zone.id}</span>
        <span className="rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
          {zone.category}
        </span>
      </div>
      <div className="mt-1.5 text-sm font-semibold text-gray-800">
        {zone.name}
      </div>
      {zone.deps.length > 0 && (
        <div className="mt-2 text-[10px] text-gray-400">
          의존: {zone.deps.map((d) => `#${d}`).join(', ')}
        </div>
      )}
    </button>
  )
}
