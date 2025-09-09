import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  MessageCircle, 
  Send, 
  CheckCircle,
  AlertCircle,
  Truck,
  Navigation,
  Star
} from 'lucide-react'

const DeliveryAssignment = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRider, setSelectedRider] = useState('')
  const [notificationMethod, setNotificationMethod] = useState('whatsapp')

  // Mock data
  const pendingOrders = [
    {
      id: 'ORD-001',
      customerName: 'Ahmed Ali',
      phone: '+92 300 1234567',
      address: 'House 123, Block A, DHA Phase 2, Lahore',
      items: ['Chicken Biryani x2', 'Raita x1'],
      total: 900,
      estimatedDelivery: '30-45 mins',
      priority: 'high',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 'ORD-002',
      customerName: 'Sara Khan',
      phone: '+92 301 2345678',
      address: 'Apartment 45, Gulberg 3, Lahore',
      items: ['Pizza Margherita x1', 'Coca Cola x2'],
      total: 1400,
      estimatedDelivery: '25-35 mins',
      priority: 'normal',
      createdAt: '2024-01-15T09:15:00Z'
    },
    {
      id: 'ORD-003',
      customerName: 'Muhammad Hassan',
      phone: '+92 302 3456789',
      address: 'Shop 12, Liberty Market, Lahore',
      items: ['Beef Karahi x1', 'Naan x4'],
      total: 1700,
      estimatedDelivery: '40-50 mins',
      priority: 'normal',
      createdAt: '2024-01-15T08:45:00Z'
    }
  ]

  const riders = [
    {
      id: 'R001',
      name: 'Ali Khan',
      phone: '+92 300 1111111',
      status: 'available',
      rating: 4.8,
      currentLocation: 'DHA Phase 2',
      completedDeliveries: 156,
      averageTime: '28 mins',
      vehicle: 'Motorcycle',
      photo: null
    },
    {
      id: 'R002',
      name: 'Hassan Ahmed',
      phone: '+92 300 2222222',
      status: 'busy',
      rating: 4.6,
      currentLocation: 'Gulberg',
      completedDeliveries: 89,
      averageTime: '32 mins',
      vehicle: 'Bicycle',
      photo: null
    },
    {
      id: 'R003',
      name: 'Usman Ali',
      phone: '+92 300 3333333',
      status: 'available',
      rating: 4.9,
      currentLocation: 'Liberty Market',
      completedDeliveries: 203,
      averageTime: '25 mins',
      vehicle: 'Motorcycle',
      photo: null
    },
    {
      id: 'R004',
      name: 'Saeed Khan',
      phone: '+92 300 4444444',
      status: 'offline',
      rating: 4.7,
      currentLocation: 'Model Town',
      completedDeliveries: 134,
      averageTime: '30 mins',
      vehicle: 'Motorcycle',
      photo: null
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'normal':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'busy':
        return 'bg-yellow-100 text-yellow-800'
      case 'offline':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const availableRiders = riders.filter(rider => rider.status === 'available')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Delivery Assignment</h1>
          <p className="text-gray-600 mt-1">Assign orders to delivery riders</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button className="btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
          <button className="btn-primary">
            <Send className="w-5 h-5 mr-2" />
            Bulk Assign
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available Riders</p>
              <p className="text-2xl font-bold text-gray-900">{availableRiders.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Deliveries</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Orders */}
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Pending Orders</h2>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                />
              </div>
            </div>

            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div key={order.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-soft transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                      {order.priority} priority
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {order.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {order.address}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      ETA: {order.estimatedDelivery}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Items: {order.items.join(', ')}</p>
                      <p className="font-semibold text-gray-900">PKR {order.total}</p>
                    </div>
                    <button className="btn-primary text-sm px-4 py-2">
                      Assign Rider
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Available Riders */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Riders</h2>

            <div className="space-y-4">
              {riders.map((rider) => (
                <div key={rider.id} className={`p-4 border rounded-xl transition-all duration-200 ${
                  selectedRider === rider.id 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:shadow-soft'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{rider.name}</h3>
                        <p className="text-sm text-gray-600">{rider.phone}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rider.status)}`}>
                      {rider.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-sm">
                      <p className="text-gray-600">Rating</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 font-semibold">{rider.rating}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600">Deliveries</p>
                      <p className="font-semibold">{rider.completedDeliveries}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600">Avg. Time</p>
                      <p className="font-semibold">{rider.averageTime}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600">Vehicle</p>
                      <p className="font-semibold">{rider.vehicle}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Navigation className="w-4 h-4 mr-2" />
                      {rider.currentLocation}
                    </div>
                    <button
                      onClick={() => setSelectedRider(selectedRider === rider.id ? '' : rider.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedRider === rider.id
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedRider === rider.id ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignment Panel */}
          {selectedRider && (
            <div className="card bg-primary-50 border-primary-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Method
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="whatsapp"
                        checked={notificationMethod === 'whatsapp'}
                        onChange={(e) => setNotificationMethod(e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">WhatsApp</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="slack"
                        checked={notificationMethod === 'slack'}
                        onChange={(e) => setNotificationMethod(e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Slack</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="telegram"
                        checked={notificationMethod === 'telegram'}
                        onChange={(e) => setNotificationMethod(e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Telegram</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-primary-200">
                  <h4 className="font-medium text-gray-900 mb-2">Selected Rider</h4>
                  <p className="text-sm text-gray-600">
                    {riders.find(r => r.id === selectedRider)?.name} - {riders.find(r => r.id === selectedRider)?.phone}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 btn-primary">
                    <Send className="w-4 h-4 mr-2" />
                    Send Assignment
                  </button>
                  <button 
                    onClick={() => setSelectedRider('')}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-green-900">Auto Assign</p>
                <p className="text-sm text-green-700">Assign orders automatically</p>
              </div>
            </div>
          </button>

          <button className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-blue-900">Route Optimization</p>
                <p className="text-sm text-blue-700">Optimize delivery routes</p>
              </div>
            </div>
          </button>

          <button className="p-4 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <div className="text-left">
                <p className="font-medium text-orange-900">Emergency Assign</p>
                <p className="text-sm text-orange-700">Handle urgent orders</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeliveryAssignment
