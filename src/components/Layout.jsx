import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Home, 
  ShoppingBag, 
  Truck, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Bell,
  User,
  MessageCircle,
  CheckCircle,
  FileText,
  FileText as Reports,
  Lightbulb,
  PenTool,
  Shield,
  Cog,
  Sliders,
  LogOut,
  Phone,
  Activity
} from 'lucide-react'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const mainNavigation = [
    { name: 'Home', href: '/dashboard', icon: Home, current: location.pathname === '/dashboard' },
    { name: 'Orders', href: '/dashboard/orders', icon: BarChart3, current: location.pathname === '/dashboard/orders' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: CheckCircle, current: location.pathname === '/dashboard/analytics' },
    { name: 'Phone Calls', href: '/dashboard/phone', icon: Phone, current: location.pathname === '/dashboard/phone' },
    { name: 'WhatsApp', href: '/dashboard/whatsapp', icon: MessageCircle, current: location.pathname === '/dashboard/whatsapp' },
    { name: 'Delivery Team', href: '/dashboard/delivery-team', icon: Truck, current: location.pathname === '/dashboard/delivery-team' },
    { name: 'Monitoring', href: '/dashboard/monitoring', icon: Activity, current: location.pathname === '/dashboard/monitoring' },
  ]

  const teamsNavigation = [
    { name: 'Insights', href: '/dashboard/insights', icon: Lightbulb },
    { name: 'Design', href: '/dashboard/design', icon: PenTool },
    { name: 'Settings', href: '/dashboard/settings', icon: Shield },
    { name: 'Operations', href: '/dashboard/operations', icon: Cog },
  ]

  const bottomNavigation = [
    { name: 'Preferences', href: '/dashboard/settings', icon: Sliders },
    { name: 'Log out', href: '#', icon: LogOut, onClick: () => logout() },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar - Fixed position to prevent scrolling */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Agentic AI</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col h-full px-4 py-6 overflow-y-auto" style={{ height: 'calc(100vh - 4rem)' }}>
          {/* Main Navigation */}
          <div className="space-y-1 mb-8">
            {mainNavigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    console.log('Navigating to:', item.href)
                    navigate(item.href)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    item.current 
                      ? 'bg-black text-white' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              )
            })}
          </div>

          {/* Teams Section */}
          <div className="mb-8">
            <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">TEAMS</h3>
            <div className="space-y-1">
              {teamsNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      console.log('Teams navigation to:', item.href)
                      if (item.onClick) {
                        item.onClick()
                      } else {
                        navigate(item.href)
                      }
                      setSidebarOpen(false)
                    }}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* User Profile */}
          <div className="mt-auto mb-6">
            <div className="flex items-center px-3 py-3">
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-slate-300" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-400">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="space-y-1">
            {bottomNavigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    console.log('Bottom navigation:', item.name, item.href)
                    if (item.onClick) {
                      item.onClick()
                    } else {
                      navigate(item.href)
                    }
                    setSidebarOpen(false)
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 text-slate-300 hover:text-white hover:bg-slate-700"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen lg:ml-64">
        {/* Top bar */}
        <div className="bg-slate-800 px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-4">
              {/* Removed zoom control bar */}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
