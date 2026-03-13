import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RegistrasiPage from './pages/RegistrasiPage'
import AgreementPage from './pages/AgreementPage'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userRole = localStorage.getItem('userRole')
  const allowedRoles = ['admin', 'manager', 'supervisor']
  
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="*" element={
          <div className="min-h-screen bg-bg text-text">
            <Navbar />
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/registrasi" element={<RegistrasiPage />} />
              <Route path="/agreement" element={<AgreementPage />} />
            </Routes>
          </div>
        } />
      </Routes>
    </Router>
  )
}
