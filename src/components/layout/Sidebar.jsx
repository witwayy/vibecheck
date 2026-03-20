import { NavLink } from 'react-router-dom'
import { FiHome, FiZap, FiFileText, FiGrid } from 'react-icons/fi'

const navItems = [
  { to: '/', icon: FiHome, label: 'Home' },
  { to: '/idea', icon: FiZap, label: 'Idea Discovery' },
  { to: '/prd', icon: FiFileText, label: 'PRD Writer' },
  { to: '/zone', icon: FiGrid, label: 'Zone Map' },
]

export default function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center px-6">
        <span className="text-xl font-bold text-primary">VibeCheck</span>
      </div>
      <nav className="mt-4 flex-1 space-y-1 px-3">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <ModelSelector />
      </div>
    </aside>
  )
}

function ModelSelector() {
  const models = [
    { id: 'deepseek-v3', label: 'DeepSeek V3' },
    { id: 'llama-4', label: 'Llama 4' },
    { id: 'qwen-3', label: 'Qwen 3' },
    { id: 'gemini-flash', label: 'Gemini Flash' },
    { id: 'llama-70b', label: 'Llama 70B' },
  ]

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-500">
        AI Model
      </label>
      <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-primary focus:outline-none">
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  )
}
