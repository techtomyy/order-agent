import React, { useState, useEffect } from 'react'
import { useRestaurant } from '../contexts/RestaurantContext'
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  MessageCircle,
  Clock,
  User,
  MapPin,
  ShoppingBag,
  CheckCircle,
  AlertCircle,
  Loader,
  Zap,
  Headphones
} from 'lucide-react'

const PhoneCallInterface = () => {
  const { restaurantName } = useRestaurant()
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)
  const [customerInfo, setCustomerInfo] = useState(null)
  const [aiResponse, setAiResponse] = useState('')
  const [isAiProcessing, setIsAiProcessing] = useState(false)
  const [callTranscript, setCallTranscript] = useState([])
  const [orderDetails, setOrderDetails] = useState(null)

  // Debug: Log restaurant name
  console.log('PhoneCallInterface - Restaurant Name:', restaurantName)

  // Mock customer data
  const mockCustomer = {
    name: 'John Doe',
    phone: '+92 300 1234567',
    address: '123 Main Street, Karachi',
    previousOrders: 12,
    lastOrder: '2024-01-15',
    preferences: ['Spicy', 'No Onions']
  }

  // Mock AI conversation flow
  const aiConversation = [
    { type: 'ai', message: `Hello! Thank you for calling ${restaurantName}. How can I help you today?` },
    { type: 'customer', message: 'Hi, I\'d like to place an order for delivery.' },
    { type: 'ai', message: 'Great! I\'d be happy to help you with that. What would you like to order today?' },
    { type: 'customer', message: 'I want 2 chicken biryani and 1 naan bread.' },
    { type: 'ai', message: 'Perfect! I have 2 chicken biryani and 1 naan bread. Would you like anything else?' },
    { type: 'customer', message: 'That\'s all for now.' },
    { type: 'ai', message: 'Excellent! Your total comes to PKR 850. What\'s your delivery address?' },
    { type: 'customer', message: '123 Main Street, Karachi.' },
    { type: 'ai', message: 'Perfect! Your order will be delivered in 30-45 minutes. You\'ll receive a confirmation on WhatsApp. Thank you!' }
  ]

  useEffect(() => {
    let interval
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isCallActive])

  useEffect(() => {
    if (isCallActive) {
      // Simulate AI processing
      setIsAiProcessing(true)
      setTimeout(() => {
        setCustomerInfo(mockCustomer)
        setIsAiProcessing(false)
      }, 2000)

      // Simulate conversation flow
      let messageIndex = 0
      const conversationInterval = setInterval(() => {
        if (messageIndex < aiConversation.length) {
          setCallTranscript(prev => [...prev, aiConversation[messageIndex]])
          messageIndex++
        } else {
          clearInterval(conversationInterval)
          // Generate order details
          setOrderDetails({
            id: 'ORD-001',
            items: [
              { name: 'Chicken Biryani', quantity: 2, price: 400 },
              { name: 'Naan Bread', quantity: 1, price: 50 }
            ],
            total: 850,
            deliveryAddress: '123 Main Street, Karachi',
            estimatedTime: '30-45 minutes'
          })
        }
      }, 3000)
    }
  }, [isCallActive])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleCallToggle = () => {
    setIsCallActive(!isCallActive)
    if (!isCallActive) {
      setCallDuration(0)
      setCallTranscript([])
      setOrderDetails(null)
    }
  }

  return (
    <div className="h-full bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Phone Call Interface</h1>
              <p className="text-gray-600">Twilio Voice API Integration with OpenAI</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Twilio Connected</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">OpenAI Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Call Control Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Call Control</h3>
                <p className="text-sm text-gray-600">Manage active calls</p>
              </div>

              {/* Call Status */}
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {isCallActive ? formatTime(callDuration) : '00:00'}
                </div>
                <div className={`text-sm font-medium ${
                  isCallActive ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {isCallActive ? 'Call in Progress' : 'No Active Call'}
                </div>
              </div>

              {/* Call Controls */}
              <div className="space-y-4">
                <button
                  onClick={handleCallToggle}
                  className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 ${
                    isCallActive
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isCallActive ? (
                    <>
                      <PhoneOff className="w-5 h-5" />
                      <span>End Call</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-5 h-5" />
                      <span>Start Call</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`py-3 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                      isMuted
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                  </button>

                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`py-3 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                      isSpeakerOn
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSpeakerOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    <span>Speaker</span>
                  </button>
                </div>
              </div>

              {/* AI Processing Status */}
              {isAiProcessing && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Loader className="w-4 h-4 text-blue-600 animate-spin" />
                    <span className="text-sm text-blue-700">AI Processing...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Customer Information & Transcript */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Customer Info */}
              {customerInfo && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{customerInfo.name}</div>
                        <div className="text-sm text-gray-600">{customerInfo.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Address</div>
                        <div className="text-sm text-gray-600">{customerInfo.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ShoppingBag className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Previous Orders</div>
                        <div className="text-sm text-gray-600">{customerInfo.previousOrders} orders</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Last Order</div>
                        <div className="text-sm text-gray-600">{customerInfo.lastOrder}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Call Transcript */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Transcript</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {callTranscript.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'ai'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="text-xs font-medium mb-1">
                          {message.type === 'ai' ? restaurantName : 'Customer'}
                        </div>
                        <div className="text-sm">{message.message}</div>
                      </div>
                    </div>
                  ))}
                  {isAiProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-blue-100 text-blue-900 max-w-xs px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Loader className="w-4 h-4 animate-spin" />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Details */}
              {orderDetails && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Order ID:</span>
                      <span className="text-gray-600">{orderDetails.id}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 mb-2">Items:</div>
                      {orderDetails.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm text-gray-600">
                          <span>{item.quantity}x {item.name}</span>
                          <span>PKR {item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold text-gray-900">
                        <span>Total:</span>
                        <span>PKR {orderDetails.total}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Delivery Address:</span>
                      <span className="text-gray-600">{orderDetails.deliveryAddress}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Estimated Time:</span>
                      <span className="text-gray-600">{orderDetails.estimatedTime}</span>
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700">
                        Confirm Order
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200">
                        Send to WhatsApp
                      </button>
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
}

export default PhoneCallInterface
