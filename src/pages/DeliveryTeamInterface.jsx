import React, { useState, useEffect } from 'react'
import { 
  Truck, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  CheckCircle, 
  AlertCircle,
  Navigation,
  Package,
  MessageCircle,
  Bell,
  Zap,
  Bot,
  Loader,
  RefreshCw,
  Filter,
  Search
} from 'lucide-react'

const DeliveryTeamInterface = () => {
  const [deliveries, setDeliveries] = useState([])
  const [selectedDelivery, setSelectedDelivery] = useState(null)
  const [isConnected, setIsConnected] = useState(true)
  const [activeTab, setActiveTab] = useState('pending')

  // Mock delivery data
  const mockDeliveries = [
    {
      id: 'DEL-001',
      orderId: 'ORD-001',
      customer: {
        name: 'John Doe',
        phone: '+92 300 1234567',
        address: '123 Main Street, Karachi',
        coordinates: { lat: 24.8607, lng: 67.0011 }
      },
      items: [
        { name: 'Chicken Biryani', quantity: 2 },
        { name: 'Naan Bread', quantity: 1 }
      ],
      total: 850,
      status: 'pending',
      assignedTo: null,
      estimatedTime: '30-45 minutes',
      createdAt: new Date(Date.now() - 300000),
      priority: 'high'
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-002',
      customer: {
        name: 'Sarah Smith',
        phone: '+92 301 2345678',
        address: '456 Park Avenue, Karachi',
        coordinates: { lat: 24.8607, lng: 67.0011 }
      },
      items: [
        { name: 'Pizza Margherita', quantity: 1 }
      ],
      total: 650,
      status: 'assigned',
      assignedTo: 'Ahmed Khan',
      estimatedTime: '20-30 minutes',
      createdAt: new Date(Date.now() - 180000),
      priority: 'medium'
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-003',
      customer: {
        name: 'Mike Johnson',
        phone: '+92 302 3456789',
        address: '789 Garden Road, Karachi',
        coordinates: { lat: 24.8607, lng: 67.0011 }
      },
      items: [
        { name: 'Beef Karahi', quantity: 1 },
        { name: 'Rice', quantity: 2 }
      ],
      total: 1200,
      status: 'in-progress',
      assignedTo: 'Ali Hassan',
      estimatedTime: '15-20 minutes',
      createdAt: new Date(Date.now() - 600000),
      priority: 'low'
    }
  ]

  const deliveryTeam = [
    { id: 1, name: 'Ahmed Khan', phone: '+92 300 1111111', status: 'busy', currentDelivery: 'DEL-002' },
    { id: 2, name: 'Ali Hassan', phone: '+92 300 2222222', status: 'available', currentDelivery: null },
    { id: 3, name: 'Usman Ali', phone: '+92 300 3333333', status: 'offline', currentDelivery: null },
    { id: 4, name: 'Hassan Raza', phone: '+92 300 4444444', status: 'available', currentDelivery: null }
  ]

  useEffect(() => {
    setDeliveries(mockDeliveries)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'assigned': return 'bg-blue-100 text-blue-800'
      case 'in-progress': return 'bg-orange-100 text-orange-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAssignDelivery = (deliveryId, teamMemberId) => {
    const teamMember = deliveryTeam.find(member => member.id === teamMemberId)
    setDeliveries(prev => prev.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, status: 'assigned', assignedTo: teamMember.name }
        : delivery
    ))
  }

  const handleStatusUpdate = (deliveryId, newStatus) => {
    setDeliveries(prev => prev.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, status: newStatus }
        : delivery
    ))
  }

  const filteredDeliveries = deliveries.filter(delivery => {
    if (activeTab === 'pending') return delivery.status === 'pending'
    if (activeTab === 'assigned') return delivery.status === 'assigned'
    if (activeTab === 'in-progress') return delivery.status === 'in-progress'
    if (activeTab === 'delivered') return delivery.status === 'delivered'
    return true
  })

  return (
    <div className="h-full bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Delivery Team Dashboard</h1>
              <p className="text-gray-600">Slack/Telegram Integration for Delivery Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Slack Connected</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Telegram Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Delivery List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'pending', label: 'Pending', count: deliveries.filter(d => d.status === 'pending').length },
                    { id: 'assigned', label: 'Assigned', count: deliveries.filter(d => d.status === 'assigned').length },
                    { id: 'in-progress', label: 'In Progress', count: deliveries.filter(d => d.status === 'in-progress').length },
                    { id: 'delivered', label: 'Delivered', count: deliveries.filter(d => d.status === 'delivered').length }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </nav>
              </div>

              {/* Delivery Items */}
              <div className="divide-y divide-gray-200">
                {filteredDeliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="p-6 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedDelivery(delivery)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="font-semibold text-gray-900">{delivery.id}</div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                            {delivery.status.replace('-', ' ')}
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(delivery.priority)}`}>
                            {delivery.priority}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{delivery.customer.name}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Phone className="w-4 h-4" />
                              <span>{delivery.customer.phone}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{delivery.customer.address}</span>
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {delivery.items.map(item => `${item.quantity}x ${item.name}`).join(', ')} • PKR {delivery.total}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {delivery.assignedTo || 'Unassigned'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {delivery.estimatedTime}
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          {delivery.status === 'pending' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleAssignDelivery(delivery.id, 2)
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                            >
                              <User className="w-4 h-4" />
                            </button>
                          )}
                          {delivery.status === 'assigned' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStatusUpdate(delivery.id, 'in-progress')
                              }}
                              className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg"
                            >
                              <Truck className="w-4 h-4" />
                            </button>
                          )}
                          {delivery.status === 'in-progress' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStatusUpdate(delivery.id, 'delivered')
                              }}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Members & Details */}
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Team</h3>
              <div className="space-y-3">
                {deliveryTeam.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        member.status === 'available' ? 'bg-green-500' :
                        member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.phone}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {member.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Delivery Details */}
            {selectedDelivery && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Customer</div>
                    <div className="text-sm text-gray-600">{selectedDelivery.customer.name}</div>
                    <div className="text-sm text-gray-600">{selectedDelivery.customer.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Address</div>
                    <div className="text-sm text-gray-600">{selectedDelivery.customer.address}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Items</div>
                    {selectedDelivery.items.map((item, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Total</div>
                    <div className="text-sm text-gray-600">PKR {selectedDelivery.total}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700">
                      <Navigation className="w-4 h-4 inline mr-2" />
                      Navigate
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryTeamInterface
