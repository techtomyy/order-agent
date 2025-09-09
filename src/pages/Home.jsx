import React, { useState } from 'react'
import { 
  Bell, 
  User, 
  ShoppingBag, 
  Target, 
  TrendingUp, 
  Clock,
  DollarSign,
  Users,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  BarChart3,
  MessageCircle,
  Phone,
  Eye,
  RefreshCw,
  Plus,
  Filter,
  Download
} from 'lucide-react'

const Home = () => {
  const [isLive, setIsLive] = useState(true)
  
  const stats = [
    {
      title: 'Total Revenue',
      value: 'PKR 1.2M',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green',
      progress: 75
    },
    {
      title: 'Total Orders',
      value: '2,847',
      change: '+8.3%',
      changeType: 'positive',
      icon: ShoppingBag,
      color: 'blue',
      progress: 60
    },
    {
      title: 'Avg. Order Value',
      value: 'PKR 421',
      change: '+5.2%',
      changeType: 'positive',
      icon: BarChart3,
      color: 'orange',
      progress: 45
    },
    {
      title: 'Customer Rating',
      value: '4.7',
      change: '+2.3%',
      changeType: 'positive',
      icon: Star,
      color: 'yellow',
      progress: 94
    }
  ]

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      items: ['Chicken Biryani', 'Naan'],
      total: 'PKR 850',
      status: 'confirmed',
      time: '2 min ago'
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Smith',
      items: ['Pizza Margherita'],
      total: 'PKR 650',
      status: 'preparing',
      time: '5 min ago'
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      items: ['Beef Karahi', 'Rice'],
      total: 'PKR 1,200',
      status: 'delivered',
      time: '15 min ago'
    }
  ]

  const topItems = [
    { name: 'Chicken Biryani', orders: 156, revenue: 'PKR 124,800', change: '+12.5%' },
    { name: 'Pizza Margherita', orders: 134, revenue: 'PKR 160,800', change: '+8.3%' },
    { name: 'Beef Karahi', orders: 98, revenue: 'PKR 147,000', change: '+15.2%' },
    { name: 'Chicken Tikka', orders: 87, revenue: 'PKR 87,000', change: '-2.1%' },
    { name: 'Fish Curry', orders: 76, revenue: 'PKR 136,800', change: '+5.7%' }
  ]

  const salesData = [
    { day: 'Mon', orders: 45, revenue: 12000 },
    { day: 'Tue', orders: 52, revenue: 15000 },
    { day: 'Wed', orders: 48, revenue: 13500 },
    { day: 'Thu', orders: 61, revenue: 18000 },
    { day: 'Fri', orders: 58, revenue: 16500 },
    { day: 'Sat', orders: 67, revenue: 19500 },
    { day: 'Sun', orders: 42, revenue: 11500 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'preparing': return 'bg-yellow-100 text-yellow-800'
      case 'delivered': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'preparing': return <Clock className="w-4 h-4" />
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="h-full bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your restaurant.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Last 7 days</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">View</span>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className={`flex items-center text-sm ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </div>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-${stat.color}-500 h-2 rounded-full`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Sales Trend</h3>
              <p className="text-sm text-gray-600">Performance over time</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                Orders
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium">
                Revenue
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end space-x-2">
            {salesData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${(item.revenue / 20000) * 200}px` }}
                ></div>
                <div className="text-xs text-gray-600 mt-2">{item.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Items */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Selling Items</h3>
              <p className="text-sm text-gray-600">Best performing menu items</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all items
            </button>
          </div>
          <div className="space-y-4">
            {topItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.orders} orders • {item.revenue}</div>
                </div>
                <div className={`text-sm font-medium ${
                  item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <p className="text-sm text-gray-600">Latest customer orders</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all orders
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="font-medium text-gray-900">{order.id}</div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {order.customer} • {order.items.join(', ')}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">{order.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{order.total}</div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home