import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LandingPage from './pages/Landing/LandingPage'
import IdeaDiscoveryPage from './pages/IdeaDiscovery/IdeaDiscoveryPage'
import PRDWriterPage from './pages/PRDWriter/PRDWriterPage'
import ZoneMapPage from './pages/ZoneMap/ZoneMapPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/idea" element={<IdeaDiscoveryPage />} />
          <Route path="/prd" element={<PRDWriterPage />} />
          <Route path="/zone" element={<ZoneMapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
