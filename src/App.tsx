import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import IndexPage from './pages/IndexPage'
import RegistrasiPage from './pages/RegistrasiPage'
import AgreementPage from './pages/AgreementPage'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg text-text">
        <Navbar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/registrasi" element={<RegistrasiPage />} />
          <Route path="/agreement" element={<AgreementPage />} />
        </Routes>
      </div>
    </Router>
  )
}
