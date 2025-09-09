import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { RestaurantProvider } from './contexts/RestaurantContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PricingPage from './pages/PricingPage'
import Home from './pages/Home'
import OnboardingWizard from './pages/OnboardingWizard'
import OrdersDashboard from './pages/OrdersDashboard'
import OrderDetail from './pages/OrderDetail'
import DeliveryAssignment from './pages/DeliveryAssignment'
import AnalyticsDashboard from './pages/AnalyticsDashboard'
import NumberManagement from './pages/NumberManagement'
import PhoneCallInterface from './pages/PhoneCallInterface'
import WhatsAppInterface from './pages/WhatsAppInterface'
import DeliveryTeamInterface from './pages/DeliveryTeamInterface'
import SystemMonitoring from './pages/SystemMonitoring'
import SetupWizard from './pages/SetupWizard'
import DemoPage from './pages/DemoPage'

function App() {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <Router>
          <div className="min-h-screen bg-slate-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/demo" element={<DemoPage />} />
              
              {/* Protected Routes */}
              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <OnboardingWizard />
                </ProtectedRoute>
              } />
              <Route path="/setup" element={
                <ProtectedRoute>
                  <SetupWizard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Home />} />
                <Route path="orders" element={<OrdersDashboard />} />
                <Route path="orders/:id" element={<OrderDetail />} />
                <Route path="delivery" element={<DeliveryAssignment />} />
                <Route path="analytics" element={<AnalyticsDashboard />} />
                <Route path="settings" element={<NumberManagement />} />
                <Route path="phone" element={<PhoneCallInterface />} />
                <Route path="whatsapp" element={<WhatsAppInterface />} />
                <Route path="delivery-team" element={<DeliveryTeamInterface />} />
                <Route path="monitoring" element={<SystemMonitoring />} />
                <Route path="insights" element={<AnalyticsDashboard />} />
                <Route path="design" element={<NumberManagement />} />
                <Route path="operations" element={<SystemMonitoring />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </RestaurantProvider>
    </AuthProvider>
  )
}

export default App
