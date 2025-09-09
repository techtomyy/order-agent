import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'

const OrdersDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrders, setSelectedOrders] = useState([])

  // Mock data
  const orders = [
    {
      id: 'ORD-001',
      customerName: 'Ahmed Ali',
      phone: '+92 300 1234567',
      items: [
        { name: 'Chicken Biryani', quantity: 2, price: 800 },
        { name: 'Raita', quantity: 1, price: 100 }
      ],
      total: 900,
      status: 'pending_confirmation',
      createdAt: '2024-01-15T10:30:00Z',
      source: 'call',
      transcript: 'Customer called and ordered chicken biryani for 2 people...'
    },
    {
      id: 'ORD-002',
      customerName: 'Sara Khan',
      phone: '+92 301 2345678',
      items: [
        { name: 'Pizza Margherita', quantity: 1, price: 1200 },
        { name: 'Coca Cola', quantity: 2, price: 200 }
      ],
      total: 1400,
      status: 'confirmed',
      createdAt: '2024-01-15T09:15:00Z',
      source: 'whatsapp',
      transcript: 'WhatsApp order confirmed by customer...'
    },
    {
      id: 'ORD-003',
      customerName: 'Muhammad Hassan',
      phone: '+92 302 3456789',
      items: [
        { name: 'Beef Karahi', quantity: 1, price: 1500 },
        { name: 'Naan', quantity: 4, price: 200 }
      ],
      total: 1700,
      status: 'out_for_delivery',
      createdAt: '2024-01-15T08:45:00Z',
      source: 'call',
      transcript: 'Order is out for delivery with rider Ali...'
    },
    {
      id: 'ORD-004',
      customerName: 'Fatima Sheikh',
      phone: '+92 303 4567890',
      items: [
        { name: 'Chicken Tikka', quantity: 2, price: 1000 },
        { name: 'Rice', quantity: 2, price: 300 }
      ],
      total: 1300,
      status: 'delivered',
      createdAt: '2024-01-15T07:20:00Z',
      source: 'whatsapp',
      transcript: 'Order delivered successfully...'
    },
    {
      id: 'ORD-005',
      customerName: 'Ali Raza',
      phone: '+92 304 5678901',
      items: [
        { name: 'Fish Curry', quantity: 1, price: 1800 }
      ],
      total: 1800,
      status: 'cancelled',
      createdAt: '2024-01-15T06:30:00Z',
      source: 'call',
      transcript: 'Customer cancelled order due to delay...'
    }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'pending_confirmation', label: 'Pending', count: orders.filter(o => o.status === 'pending_confirmation').length },
    { value: 'confirmed', label: 'Confirmed', count: orders.filter(o => o.status === 'confirmed').length },
    { value: 'out_for_delivery', label: 'Out for Delivery', count: orders.filter(o => o.status === 'out_for_delivery').length },
    { value: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { value: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending_confirmation':
        return <Clock className="w-4 h-4" />
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />
      case 'out_for_delivery':
        return <Truck className="w-4 h-4" />
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    switch (status) {
      case 'pending_confirmation':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'out_for_delivery':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'delivered':
        return `${baseClasses} bg-primary-100 text-primary-800`
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getSourceIcon = (source) => {
    return source === 'call' ? <Phone className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.phone.includes(searchTerm) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and track all your orders</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'pending_confirmation').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out for Delivery</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'out_for_delivery').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'delivered').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-80"
              />
            </div>
            <button className="btn-secondary">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          <div className="flex space-x-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  statusFilter === option.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Order ID</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Items</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Total</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Source</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Time</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="text-gray-900">{item.name}</span>
                          <span className="text-gray-500 ml-2">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">PKR {order.total}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={getStatusBadge(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">
                        {order.status.replace('_', ' ')}
                      </span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-gray-600">
                      {getSourceIcon(order.source)}
                      <span className="ml-2 capitalize">{order.source}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-500">{formatTime(order.createdAt)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersDashboard
