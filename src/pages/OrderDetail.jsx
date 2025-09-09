import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle,
  User,
  MapPin,
  CreditCard,
  MessageSquare,
  Send,
  UserCheck,
  AlertCircle
} from 'lucide-react'

const OrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showTranscript, setShowTranscript] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  // Mock data - in real app, this would come from API
  const order = {
    id: 'ORD-001',
    customerName: 'Ahmed Ali',
    phone: '+92 300 1234567',
    email: 'ahmed.ali@email.com',
    address: 'House 123, Block A, DHA Phase 2, Lahore',
    items: [
      { name: 'Chicken Biryani', quantity: 2, price: 800, notes: 'Extra spicy' },
      { name: 'Raita', quantity: 1, price: 100, notes: '' },
      { name: 'Coca Cola', quantity: 2, price: 200, notes: 'Cold' }
    ],
    total: 1100,
    deliveryFee: 100,
    grandTotal: 1200,
    status: 'pending_confirmation',
    source: 'call',
    createdAt: '2024-01-15T10:30:00Z',
    transcript: 'Customer called and said: "Hello, I would like to order chicken biryani for 2 people. Can you make it extra spicy? Also add raita and 2 cold cokes. My address is House 123, Block A, DHA Phase 2, Lahore. When will it be delivered?"',
    paymentMethod: 'Cash on Delivery',
    estimatedDelivery: '30-45 minutes',
    assignedRider: null,
    statusHistory: [
      { status: 'pending_confirmation', timestamp: '2024-01-15T10:30:00Z', note: 'Order received via phone call' },
      { status: 'confirmed', timestamp: '2024-01-15T10:35:00Z', note: 'Order confirmed by customer via WhatsApp' },
      { status: 'out_for_delivery', timestamp: '2024-01-15T11:00:00Z', note: 'Assigned to rider Ali Khan' },
      { status: 'delivered', timestamp: '2024-01-15T11:45:00Z', note: 'Order delivered successfully' }
    ]
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending_confirmation':
        return <Clock className="w-5 h-5" />
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />
      case 'out_for_delivery':
        return <Truck className="w-5 h-5" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />
      case 'cancelled':
        return <XCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_confirmation':
        return 'text-yellow-600 bg-yellow-100'
      case 'confirmed':
        return 'text-green-600 bg-green-100'
      case 'out_for_delivery':
        return 'text-blue-600 bg-blue-100'
      case 'delivered':
        return 'text-primary-600 bg-primary-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCurrentStatusIndex = () => {
    const statusOrder = ['pending_confirmation', 'confirmed', 'out_for_delivery', 'delivered']
    return statusOrder.indexOf(order.status)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/orders')}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order {order.id}</h1>
            <p className="text-gray-600">Order details and management</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <MessageSquare className="w-5 h-5 mr-2" />
            Send Message
          </button>
          <button className="btn-primary">
            <UserCheck className="w-5 h-5 mr-2" />
            Confirm Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-500">{order.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                    <p className="text-sm text-gray-600">{order.address}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    {order.source === 'call' ? <Phone className="w-5 h-5 text-orange-600" /> : <MessageCircle className="w-5 h-5 text-orange-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Order Source</p>
                    <p className="text-sm text-gray-500 capitalize">{order.source}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payment Method</p>
                    <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    {item.notes && (
                      <p className="text-sm text-gray-600 mt-1">Note: {item.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="font-semibold text-gray-900">PKR {item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">PKR {order.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">PKR {order.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">PKR {order.grandTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call Transcript */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Call Transcript</h2>
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {showTranscript ? 'Hide' : 'Show'} Transcript
              </button>
            </div>
            {showTranscript && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{order.transcript}</p>
              </div>
            )}
          </div>

          {/* Communication */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Message to Customer</h2>
            <div className="space-y-4">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={4}
              />
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Order Confirmed
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Out for Delivery
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Delivered
                  </button>
                </div>
                <button className="btn-primary">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Status */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Status</h2>
            <div className="space-y-4">
              <div className={`flex items-center space-x-3 p-3 rounded-xl ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-medium capitalize">{order.status.replace('_', ' ')}</p>
                  <p className="text-sm opacity-75">Current status</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Created: {formatTime(order.createdAt)}</p>
                <p>Estimated Delivery: {order.estimatedDelivery}</p>
                {order.assignedRider && (
                  <p>Rider: {order.assignedRider}</p>
                )}
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Timeline</h2>
            <div className="space-y-4">
              {['pending_confirmation', 'confirmed', 'out_for_delivery', 'delivered'].map((status, index) => {
                const isCompleted = index <= getCurrentStatusIndex()
                const isCurrent = order.status === status
                
                return (
                  <div key={status} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-primary-500 text-white' 
                        : isCurrent 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium capitalize ${
                        isCompleted ? 'text-gray-900' : isCurrent ? 'text-orange-600' : 'text-gray-500'
                      }`}>
                        {status.replace('_', ' ')}
                      </p>
                      {isCompleted && order.statusHistory[index] && (
                        <p className="text-sm text-gray-600">{order.statusHistory[index].note}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full btn-primary">
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Order
              </button>
              <button className="w-full btn-secondary">
                <Truck className="w-4 h-4 mr-2" />
                Assign Rider
              </button>
              <button className="w-full btn-secondary">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send WhatsApp
              </button>
              <button className="w-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Order
              </button>
            </div>
          </div>

          {/* Alerts */}
          <div className="card bg-yellow-50 border-yellow-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Action Required</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  This order is pending confirmation. Please contact the customer to confirm their order details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
