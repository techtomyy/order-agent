import React, { useState, useEffect } from 'react'
import { 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Edit, 
  Trash2, 
  Copy,
  RefreshCw,
  Shield,
  Settings,
  TestTube,
  Zap,
  Activity,
  TrendingUp,
  Clock,
  Users,
  BarChart3,
  Bell,
  Download,
  Upload,
  Eye,
  EyeOff,
  Play,
  Pause,
  RotateCcw,
  Wifi,
  WifiOff
} from 'lucide-react'

const NumberManagement = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('+92 300 1234567')
  const [callNumber, setCallNumber] = useState('+92 300 7654321')
  const [whatsappStatus, setWhatsappStatus] = useState('verified')
  const [callStatus, setCallStatus] = useState('active')
  const [showAddNumber, setShowAddNumber] = useState(false)
  const [newNumber, setNewNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [notifications, setNotifications] = useState({
    whatsapp: true,
    calls: true,
    errors: true,
    updates: false
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate data updates
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified'
      case 'active':
        return 'Active'
      case 'pending':
        return 'Pending Verification'
      case 'error':
        return 'Verification Failed'
      default:
        return 'Unknown'
    }
  }

  const handleCopyNumber = (number) => {
    navigator.clipboard.writeText(number)
    // You could add a toast notification here
  }

  const handleTestWhatsApp = async () => {
    setIsLoading(true)
    // Simulate test
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const handleTestCall = async () => {
    setIsLoading(true)
    // Simulate test
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const handleToggleNotifications = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'security', name: 'Security', icon: Shield }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewContent()
      case 'settings':
        return renderSettingsContent()
      case 'analytics':
        return renderAnalyticsContent()
      case 'security':
        return renderSecurityContent()
      default:
        return renderOverviewContent()
    }
  }

  const renderOverviewContent = () => (
    <div className="space-y-8">
      {/* WhatsApp Number Management */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">WhatsApp Business</h2>
                <p className="text-gray-600">Manage your WhatsApp messaging number</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Online</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Connected</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handleTestWhatsApp}
                disabled={isLoading}
                className="bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <TestTube className="w-4 h-4" />
                )}
                <span>Test</span>
              </button>
              <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-green-800 uppercase tracking-wide">Current Number</span>
                  <button 
                    onClick={() => handleCopyNumber(whatsappNumber)}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-all duration-200"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-3">{whatsappNumber}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(whatsappStatus)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(whatsappStatus)}`}>
                      {getStatusText(whatsappStatus)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-green-800">Webhook Connected</span>
                        <p className="text-xs text-green-600">Receiving messages in real-time</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-600">Active</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-green-800">API Integration</span>
                        <p className="text-xs text-green-600">Meta Business API connected</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-600">Working</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-yellow-800">Message Templates</span>
                        <p className="text-xs text-yellow-600">2 templates pending approval</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs font-medium text-yellow-600">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors duration-200">
                      <RefreshCw className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-green-800">Re-verify</p>
                  </div>
                </button>
                <button className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors duration-200">
                      <Edit className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-800">Change</p>
                  </div>
                </button>
                <button className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-purple-100 rounded-lg flex items-center justify-center transition-colors duration-200">
                      <TestTube className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-purple-800">Test Message</p>
                  </div>
                </button>
                <button className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-orange-100 rounded-lg flex items-center justify-center transition-colors duration-200">
                      <Settings className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-orange-800">Configure</p>
                  </div>
                </button>
              </div>

              {showStats && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-blue-900">Usage Statistics</h4>
                    <div className="flex items-center space-x-2 text-blue-600">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm font-medium">Live</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-800">Messages Sent Today</span>
                          <p className="text-xs text-blue-600">Real-time count</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-blue-900">247</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-800">Monthly Limit</span>
                          <p className="text-xs text-blue-600">Usage vs. limit</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-blue-900">8,247 / 10,000</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-800">Success Rate</span>
                          <p className="text-xs text-blue-600">Last 24 hours</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-green-600">98.5%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSettingsContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">{key.replace('_', ' ')}</h4>
                <p className="text-sm text-gray-600">
                  {key === 'whatsapp' && 'Get notified about WhatsApp message status'}
                  {key === 'calls' && 'Get notified about call activities'}
                  {key === 'errors' && 'Get notified about system errors'}
                  {key === 'updates' && 'Get notified about system updates'}
                </p>
              </div>
              <button
                onClick={() => handleToggleNotifications(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Number Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Call Number</label>
            <input
              type="tel"
              value={callNumber}
              onChange={(e) => setCallNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderAnalyticsContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Messages</h3>
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">2,847</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12% from last month
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Calls</h3>
            <Phone className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">1,234</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <TrendingUp className="w-4 h-4 mr-1" />
            +8% from last month
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Success Rate</h3>
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">96.8%</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <TrendingUp className="w-4 h-4 mr-1" />
            +2.1% from last month
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Usage Trends</h3>
        <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
          <p className="text-gray-500">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  )

  const renderSecurityContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Security Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-900">Data Encryption</h4>
            </div>
            <p className="text-sm text-green-700">All communications are encrypted using TLS 1.3</p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-900">GDPR Compliant</h4>
            </div>
            <p className="text-sm text-green-700">Full compliance with data protection regulations</p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-900">Secure Storage</h4>
            </div>
            <p className="text-sm text-green-700">Customer data stored securely with access controls</p>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-900">Two-Factor Auth</h4>
            </div>
            <p className="text-sm text-yellow-700">Enable 2FA for enhanced security</p>
            <button className="mt-2 text-sm text-yellow-800 hover:text-yellow-900 font-medium">
              Enable Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Number Management</h1>
                <p className="text-blue-100">Manage your WhatsApp and call numbers</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">2 Numbers Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span className="text-sm">All Systems Operational</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button 
              onClick={() => setShowAddNumber(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Number
            </button>
            <button 
              onClick={() => setShowStats(!showStats)}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
            >
              {showStats ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Add New Number Modal */}
      {showAddNumber && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Number</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="whatsapp">WhatsApp Business</option>
                  <option value="call">AI Call Number</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Verification Required</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      You'll need to verify this number through SMS or call verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddNumber(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium transition-colors">
                Add Number
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NumberManagement
