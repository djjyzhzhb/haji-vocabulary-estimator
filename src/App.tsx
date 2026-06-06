import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { ToastContainer } from './components/common/Toast'
import Dashboard from './pages/Dashboard'
import Parameters from './pages/Parameters'
import Results from './pages/Results'
import Sensitivity from './pages/Sensitivity'
import History from './pages/History'
import Report from './pages/Report'

function App() {
  return (
    <BrowserRouter basename="/haji-vocabulary-estimator">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/parameters" element={<Parameters />} />
          <Route path="/results" element={<Results />} />
          <Route path="/sensitivity" element={<Sensitivity />} />
          <Route path="/history" element={<History />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
