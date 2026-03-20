import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import StepIndicator from './StepIndicator'

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <StepIndicator />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
