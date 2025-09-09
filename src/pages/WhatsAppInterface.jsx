import React, { useState, useEffect, useRef } from 'react'
import { useRestaurant } from '../contexts/RestaurantContext'
import { 
  MessageCircle, 
  Send, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ShoppingBag,
  User,
  Camera,
  Paperclip,
  Smile,
  MoreVertical,
  Zap,
  Bot,
  Loader
} from 'lucide-react'

const WhatsAppInterface = () => {
  const { restaurantName } = useRestaurant()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [customerInfo, setCustomerInfo] = useState(null)
  const [isConnected, setIsConnected] = useState(true)
  const messagesEndRef = useRef(null)

  // Debug: Log restaurant name
  console.log('WhatsAppInterface - Restaurant Name:', restaurantName)

  // Mock customer data
  const mockCustomer = {
    name: 'John Doe',
    phone: '+92 300 1234567',
    avatar: 'https://via.placeholder.com/40',
    status: 'online',
    lastSeen: '2 minutes ago'
  }

  // Mock initial messages
  const initialMessages = [
    {
      id: 1,
      type: 'ai',
      message: `Hello! 👋 Thank you for calling ${restaurantName}. I've received your order for 2 Chicken Biryani and 1 Naan Bread. Your total is PKR 850.`,
      timestamp: new Date(Date.now() - 300000),
      isRead: true
    },
    {
      id: 2,
      type: 'customer',
      message: 'Perfect! When will it be delivered?',
      timestamp: new Date(Date.now() - 240000),
      isRead: true
    },
    {
      id: 3,
      type: 'ai',
      message: 'Your order will be delivered in 30-45 minutes to 123 Main Street, Karachi. You\'ll receive a tracking link shortly! 🚚',
      timestamp: new Date(Date.now() - 180000),
      isRead: true
    },
    {
      id: 4,
      type: 'customer',
      message: 'Great! Can I add a drink to my order?',
      timestamp: new Date(Date.now() - 120000),
      isRead: true
    },
    {
      id: 5,
      type: 'ai',
      message: 'Of course! What would you like to add? We have Coke, Sprite, and fresh juices available.',
      timestamp: new Date(Date.now() - 60000),
      isRead: true
    }
  ]

  useEffect(() => {
    setMessages(initialMessages)
    setCustomerInfo(mockCustomer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        type: 'customer',
        message: newMessage,
        timestamp: new Date(),
        isRead: false
      }
      setMessages(prev => [...prev, message])
      setNewMessage('')
      
      // Simulate AI response
      setIsTyping(true)
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          message: 'Thank you for your message! I\'m processing your request...',
          timestamp: new Date(),
          isRead: false
        }
        setMessages(prev => [...prev, aiResponse])
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const quickReplies = [
    'Track my order',
    'Add more items',
    'Cancel order',
    'Contact support'
  ]

  return (
    <div className="h-full bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">WhatsApp Business</h2>
              <p className="text-sm text-gray-600">Meta Cloud API</p>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Active Conversations
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="relative">
                  <img
                    src={customerInfo?.avatar}
                    alt={customerInfo?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {customerInfo?.name}
                    </p>
                    <p className="text-xs text-gray-500">{customerInfo?.lastSeen}</p>
                  </div>
                  <p className="text-xs text-gray-600 truncate">
                    {customerInfo?.phone}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Connected to Meta Cloud API</span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={customerInfo?.avatar}
                  alt={customerInfo?.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{customerInfo?.name}</h3>
                <p className="text-sm text-gray-600">{customerInfo?.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${message.type === 'ai' ? 'mr-12' : 'ml-12'}`}>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.type === 'ai'
                      ? 'bg-white border border-gray-200'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="flex items-center space-x-2 mb-1">
                      <Bot className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-medium text-blue-600">{restaurantName}</span>
                    </div>
                  )}
                  <p className="text-sm">{message.message}</p>
                  <div className={`flex items-center justify-between mt-1 ${
                    message.type === 'ai' ? 'text-gray-500' : 'text-green-100'
                  }`}>
                    <span className="text-xs">{formatTime(message.timestamp)}</span>
                    {message.type === 'customer' && (
                      <div className="flex items-center space-x-1">
                        {message.isRead ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-white opacity-50"></div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium text-blue-600">{restaurantName}</span>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <Loader className="w-4 h-4 text-blue-500 animate-spin" />
                  <span className="text-sm text-gray-600">Typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2">
          <div className="flex space-x-2 overflow-x-auto">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => setNewMessage(reply)}
                className="flex-shrink-0 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Camera className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="1"
              />
              <button className="absolute right-2 top-2 p-1 text-gray-600 hover:text-gray-900">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatsAppInterface
