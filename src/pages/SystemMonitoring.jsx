import React, { useState, useEffect } from 'react'
import { 
  Activity, 
  Server, 
  Database, 
  Zap, 
  MessageCircle, 
  Phone, 
  Bot, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  TrendingUp,
  Users,
  Globe,
  Shield,
  RefreshCw,
  Eye,
  Settings
} from 'lucide-react'

const SystemMonitoring = () => {
  const [systemStatus, setSystemStatus] = useState({})
  const [apiMetrics, setApiMetrics] = useState({})
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock system data
  const mockSystemStatus = {
    twilio: { status: 'online', latency: 45, uptime: 99.9 },
    openai: { status: 'online', latency: 120, uptime: 99.8 },
    whatsapp: { status: 'online', latency: 80, uptime: 99.7 },
    django: { status: 'online', latency: 25, uptime: 99.9 },
    postgresql: { status: 'online', latency: 15, uptime: 99.9 },
    redis: { status: 'online', latency: 5, uptime: 99.9 }
  }

  const mockApiMetrics = {
    totalCalls: 1247,
    totalMessages: 3421,
    activeOrders: 23,
    responseTime: 1.2,
    errorRate: 0.1,
    throughput: 156
  }

  const mockFlowData = [
    { step: 'Customer Call', status: 'active', count: 5, avgTime: '2.3s' },
    { step: 'Twilio Processing', status: 'active', count: 5, avgTime: '0.8s' },
    { step: 'OpenAI Analysis', status: 'active', count: 5, avgTime: '1.2s' },
    { step: 'Django Backend', status: 'active', count: 5, avgTime: '0.5s' },
    { step: 'Database Storage', status: 'active', count: 5, avgTime: '0.3s' },
    { step: 'WhatsApp Notification', status: 'active', count: 5, avgTime: '0.7s' },
    { step: 'Delivery Team Alert', status: 'active', count: 5, avgTime: '0.4s' }
  ]

  useEffect(() => {
    setSystemStatus(mockSystemStatus)
    setApiMetrics(mockApiMetrics)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertCircle className="w-4 h-4" />
      case 'error': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="h-full bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
              <p className="text-gray-600">Real-time monitoring of the complete system architecture</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Architecture Flow */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">System Architecture Flow</h3>
            <div className="flex items-center justify-between overflow-x-auto">
              {mockFlowData.map((step, index) => (
                <div key={index} className="flex flex-col items-center min-w-0 flex-1">
                  <div className="flex flex-col items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      step.status === 'active' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {index === 0 && <Phone className="w-6 h-6 text-blue-600" />}
                      {index === 1 && <MessageCircle className="w-6 h-6 text-blue-600" />}
                      {index === 2 && <Bot className="w-6 h-6 text-blue-600" />}
                      {index === 3 && <Server className="w-6 h-6 text-blue-600" />}
                      {index === 4 && <Database className="w-6 h-6 text-blue-600" />}
                      {index === 5 && <MessageCircle className="w-6 h-6 text-blue-600" />}
                      {index === 6 && <Users className="w-6 h-6 text-blue-600" />}
                    </div>
                    <div className="text-sm font-medium text-gray-900 text-center">{step.step}</div>
                    <div className="text-xs text-gray-500">Avg: {step.avgTime}</div>
                  </div>
                  {index < mockFlowData.length - 1 && (
                    <div className="w-full h-0.5 bg-gray-300 mb-6"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* API Services Status */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">API Services Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(systemStatus).map(([service, data]) => (
                  <div key={service} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          data.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <span className="font-medium text-gray-900 capitalize">{service}</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStatusColor(data.status)}`}>
                        {getStatusIcon(data.status)}
                        <span className="text-sm font-medium">{data.status}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Latency:</span>
                        <span className="font-medium">{data.latency}ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Uptime:</span>
                        <span className="font-medium">{data.uptime}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Total Calls</span>
                  </div>
                  <span className="font-semibold text-gray-900">{apiMetrics.totalCalls}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Messages Sent</span>
                  </div>
                  <span className="font-semibold text-gray-900">{apiMetrics.totalMessages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-gray-600">Active Orders</span>
                  </div>
                  <span className="font-semibold text-gray-900">{apiMetrics.activeOrders}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-600">Response Time</span>
                  </div>
                  <span className="font-semibold text-gray-900">{apiMetrics.responseTime}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-gray-600">Error Rate</span>
                  </div>
                  <span className="font-semibold text-gray-900">{apiMetrics.errorRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Throughput</span>
                  </div>
                  <span className="font-semibold text-gray-900">{apiMetrics.throughput}/min</span>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">CPU Usage</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Memory Usage</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Disk Usage</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { time: '2 minutes ago', event: 'New order received via phone call', type: 'success' },
                { time: '5 minutes ago', event: 'WhatsApp message sent to customer', type: 'info' },
                { time: '8 minutes ago', event: 'Delivery team notified via Slack', type: 'info' },
                { time: '12 minutes ago', event: 'Order completed and delivered', type: 'success' },
                { time: '15 minutes ago', event: 'OpenAI API response processed', type: 'info' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">{activity.event}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemMonitoring
