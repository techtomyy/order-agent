import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  Star,
  DollarSign,
  ShoppingBag,
  Calendar,
  Filter,
  Download,
  Eye,
  RefreshCw,
  MoreVertical,
  Target,
  Zap,
  Award,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Play,
  Pause
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, Scatter, ScatterChart, RadialBarChart, RadialBar } from 'recharts'

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [chartType, setChartType] = useState('orders')
  const [isLive, setIsLive] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  // Enhanced mock data
  const salesData = [
    { name: 'Mon', orders: 45, revenue: 12500, customers: 38, avgOrder: 329 },
    { name: 'Tue', orders: 52, revenue: 14200, customers: 44, avgOrder: 273 },
    { name: 'Wed', orders: 38, revenue: 9800, customers: 32, avgOrder: 258 },
    { name: 'Thu', orders: 61, revenue: 16800, customers: 51, avgOrder: 275 },
    { name: 'Fri', orders: 78, revenue: 22100, customers: 65, avgOrder: 283 },
    { name: 'Sat', orders: 89, revenue: 25600, customers: 72, avgOrder: 288 },
    { name: 'Sun', orders: 67, revenue: 18900, customers: 58, avgOrder: 282 }
  ]

  const hourlyData = [
    { hour: '6 AM', orders: 2, revenue: 400 },
    { hour: '7 AM', orders: 8, revenue: 1200 },
    { hour: '8 AM', orders: 15, revenue: 2400 },
    { hour: '9 AM', orders: 22, revenue: 3600 },
    { hour: '10 AM', orders: 18, revenue: 2900 },
    { hour: '11 AM', orders: 25, revenue: 4200 },
    { hour: '12 PM', orders: 45, revenue: 7200 },
    { hour: '1 PM', orders: 52, revenue: 8400 },
    { hour: '2 PM', orders: 38, revenue: 6100 },
    { hour: '3 PM', orders: 28, revenue: 4500 },
    { hour: '4 PM', orders: 32, revenue: 5100 },
    { hour: '5 PM', orders: 41, revenue: 6600 },
    { hour: '6 PM', orders: 58, revenue: 9300 },
    { hour: '7 PM', orders: 72, revenue: 11500 },
    { hour: '8 PM', orders: 68, revenue: 10900 },
    { hour: '9 PM', orders: 45, revenue: 7200 },
    { hour: '10 PM', orders: 28, revenue: 4500 },
    { hour: '11 PM', orders: 15, revenue: 2400 }
  ]

  const performanceData = [
    { name: 'Order Accuracy', value: 96, color: '#22c55e' },
    { name: 'Delivery Time', value: 88, color: '#3b82f6' },
    { name: 'Customer Satisfaction', value: 94, color: '#f59e0b' },
    { name: 'Repeat Orders', value: 78, color: '#8b5cf6' }
  ]

  const topItems = [
    { name: 'Chicken Biryani', orders: 156, revenue: 124800, growth: 12.5 },
    { name: 'Pizza Margherita', orders: 134, revenue: 160800, growth: 8.3 },
    { name: 'Beef Karahi', orders: 98, revenue: 147000, growth: 15.2 },
    { name: 'Chicken Tikka', orders: 87, revenue: 87000, growth: -2.1 },
    { name: 'Fish Curry', orders: 76, revenue: 136800, growth: 5.7 }
  ]

  const deliveryPerformance = [
    { name: 'On Time', value: 78, color: '#22c55e' },
    { name: 'Late', value: 15, color: '#f59e0b' },
    { name: 'Very Late', value: 7, color: '#ef4444' }
  ]

  const customerSatisfaction = [
    { name: '5 Stars', value: 65, color: '#22c55e' },
    { name: '4 Stars', value: 20, color: '#84cc16' },
    { name: '3 Stars', value: 10, color: '#eab308' },
    { name: '2 Stars', value: 3, color: '#f59e0b' },
    { name: '1 Star', value: 2, color: '#ef4444' }
  ]

  const recentOrders = [
    { id: 'ORD-001', customer: 'Ahmed Ali', amount: 1200, status: 'delivered', time: '2h ago' },
    { id: 'ORD-002', customer: 'Sara Khan', amount: 800, status: 'out_for_delivery', time: '1h ago' },
    { id: 'ORD-003', customer: 'Muhammad Hassan', amount: 1500, status: 'confirmed', time: '30m ago' },
    { id: 'ORD-004', customer: 'Fatima Sheikh', amount: 900, status: 'delivered', time: '45m ago' },
    { id: 'ORD-005', customer: 'Ali Raza', amount: 1100, status: 'pending', time: '15m ago' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100'
      case 'out_for_delivery':
        return 'text-blue-600 bg-blue-100'
      case 'confirmed':
        return 'text-yellow-600 bg-yellow-100'
      case 'pending':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your business performance and insights</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          
          <button className="btn-primary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card hover:shadow-medium transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">PKR 1.2M</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-semibold text-green-600">+12.5%</span>
                </div>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center ml-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-medium transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">2,847</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-semibold text-green-600">+8.3%</span>
                </div>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full" style={{width: '72%'}}></div>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center ml-4">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-medium transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
                <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">PKR 421</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-semibold text-green-600">+5.2%</span>
                </div>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full" style={{width: '68%'}}></div>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center ml-4">
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-medium transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">Customer Rating</p>
                <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center mb-2">
                <p className="text-3xl font-bold text-gray-900 mr-2">4.7</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">1,234 reviews</span>
                <div className="flex items-center">
                  <Activity className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+2.1%</span>
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-1.5 rounded-full" style={{width: '94%'}}></div>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center ml-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Sales Trend</h2>
              <p className="text-sm text-gray-600">Performance over time</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setChartType('orders')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  chartType === 'orders' 
                    ? 'bg-primary-500 text-white shadow-soft' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Orders
              </button>
              <button 
                onClick={() => setChartType('revenue')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  chartType === 'revenue' 
                    ? 'bg-primary-500 text-white shadow-soft' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Revenue
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey={chartType === 'orders' ? 'orders' : 'revenue'} 
                  stroke={chartType === 'orders' ? '#22c55e' : '#3b82f6'} 
                  strokeWidth={3}
                  fill={chartType === 'orders' ? 'url(#colorOrders)' : 'url(#colorRevenue)'}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enhanced Top Selling Items */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Top Selling Items</h2>
              <p className="text-sm text-gray-600">Best performing menu items</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {topItems.map((item, index) => (
              <div key={index} className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-600">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{item.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-gray-600">{item.orders} orders</p>
                        <p className="text-sm font-medium text-gray-900">PKR {item.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className={`flex items-center text-sm font-semibold ${
                        item.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.growth > 0 ? (
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(item.growth)}%
                      </div>
                      <div className="text-xs text-gray-500">vs last month</div>
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-1.5 rounded-full transition-all duration-500"
                        style={{width: `${(item.orders / topItems[0].orders) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all items →
            </button>
          </div>
        </div>
      </div>

      {/* Hourly Analytics */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Hourly Performance</h2>
            <p className="text-sm text-gray-600">Peak hours and activity patterns</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Target className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="orders" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Delivery Performance */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Delivery Performance</h2>
              <p className="text-sm text-gray-600">On-time delivery metrics</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Award className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={performanceData}>
                <RadialBar dataKey="value" cornerRadius={10} fill="#22c55e" />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold text-gray-900">
                  78%
                </text>
                <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="text-sm text-gray-600">
                  On Time
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {deliveryPerformance.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{width: `${item.value}%`, backgroundColor: item.color}}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Customer Satisfaction */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Customer Satisfaction</h2>
              <p className="text-sm text-gray-600">Rating distribution</p>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold text-gray-900">4.7</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerSatisfaction} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" stroke="#64748b" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="value" fill="#22c55e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">85%</p>
              <p className="text-xs text-green-700">5 & 4 Stars</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">15%</p>
              <p className="text-xs text-yellow-700">Below 4 Stars</p>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Orders */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <p className="text-sm text-gray-600">Latest order activity</p>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">PKR {order.amount}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-500">{order.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card hover:shadow-medium transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">New Customers</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+15.3%</span>
                </div>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="card hover:shadow-medium transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                <Clock className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Delivery Time</p>
                <p className="text-2xl font-bold text-gray-900">28m</p>
                <div className="flex items-center mt-1">
                  <ArrowDownRight className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">-5.2%</span>
                </div>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="card hover:shadow-medium transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Repeat Orders</p>
                <p className="text-2xl font-bold text-gray-900">68%</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+3.1%</span>
                </div>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="card hover:shadow-medium transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Peak Hours</p>
                <p className="text-2xl font-bold text-gray-900">7-9 PM</p>
                <p className="text-xs text-gray-500 mt-1">Most active time</p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
            <p className="text-gray-600">Key performance indicators and insights</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-primary-600 hover:text-primary-700 rounded-lg hover:bg-primary-100">
              <Target className="w-5 h-5" />
            </button>
            <button className="p-2 text-primary-600 hover:text-primary-700 rounded-lg hover:bg-primary-100">
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceData.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-xl shadow-soft">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: `${metric.color}20`}}>
                  <div className="w-6 h-6 rounded-full" style={{backgroundColor: metric.color}}></div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{metric.name}</h3>
              <p className="text-3xl font-bold mb-2" style={{color: metric.color}}>{metric.value}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-1000"
                  style={{width: `${metric.value}%`, backgroundColor: metric.color}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
