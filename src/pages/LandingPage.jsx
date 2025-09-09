import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  CheckCircle, 
  BarChart3, 
  Smartphone, 
  Headphones, 
  Zap,
  Users,
  Clock,
  Shield,
  MessageCircle,
  Star,
  Play,
  TrendingUp,
  Award,
  Globe,
  Bot,
  Database,
  Truck,
  Bell,
  Eye,
  Target,
  Lightbulb,
  Phone,
  Settings,
  BarChart2,
  Copy,
  RefreshCw,
  RotateCcw
} from 'lucide-react'

const InteractiveDemoCard = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCalling, setIsCalling] = useState(false)
  const [isOrdering, setIsOrdering] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [phoneNumber] = useState('+92 300 1234567')

  const steps = [
    { id: 1, title: 'Call Our Number', description: 'Call the demo number to speak with our AI', icon: Phone },
    { id: 2, title: 'Place Your Order', description: 'Tell our AI what you want to order', icon: MessageCircle },
    { id: 3, title: 'WhatsApp Verification', description: 'Get order confirmation via WhatsApp', icon: CheckCircle },
    { id: 4, title: 'Kitchen Processing', description: 'Order sent to kitchen and delivery team', icon: Truck }
  ]

  const handleCall = async () => {
    setIsCalling(true)
    setCurrentStep(1)
    
    // Simulate call duration
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsCalling(false)
    setCurrentStep(2)
  }

  const handleOrder = async () => {
    setIsOrdering(true)
    setCurrentStep(2)
    
    // Simulate ordering process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsOrdering(false)
    setCurrentStep(3)
  }

  const handleVerify = async () => {
    setIsVerifying(true)
    setCurrentStep(3)
    
    // Simulate WhatsApp verification
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsVerifying(false)
    setCurrentStep(4)
  }

  const handleProcess = async () => {
    setIsProcessing(true)
    setCurrentStep(4)
    
    // Simulate kitchen processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setOrderComplete(true)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsCalling(false)
    setIsOrdering(false)
    setIsVerifying(false)
    setIsProcessing(false)
    setOrderComplete(false)
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Live Demo</h3>
          <p className="text-blue-100">Experience our AI order system in action</p>
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-8 overflow-hidden">
        {/* Phone Number Display */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-gray-100 rounded-2xl px-6 py-4 mb-4">
            <Phone className="w-6 h-6 text-blue-600 mr-3" />
            <span className="text-2xl font-bold text-gray-900">{phoneNumber}</span>
            <button 
              onClick={() => navigator.clipboard.writeText(phoneNumber)}
              className="ml-3 p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600">Call this number to start the demo</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="relative flex justify-between items-start mb-6 max-w-full">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep >= step.id
              const isCurrent = currentStep === step.id
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1 relative min-w-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 relative z-10 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  } ${isCurrent ? 'ring-4 ring-blue-200' : ''}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-center px-1 sm:px-2">
                    <h4 className={`text-xs sm:text-sm font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 hidden sm:block">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`absolute top-5 sm:top-6 left-1/2 h-0.5 -z-10 ${
                      isActive ? 'bg-blue-600' : 'bg-gray-200'
                    }`} style={{ 
                      transform: 'translateX(50%)',
                      width: 'calc(100% - 2.5rem)',
                      left: 'calc(50% + 1.25rem)'
                    }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {currentStep === 0 && (
            <button
              onClick={handleCall}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span>Call {phoneNumber}</span>
            </button>
          )}

          {currentStep === 1 && (
            <div className="text-center">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
                <CheckCircle className="w-5 h-5 mr-2" />
                Call Connected!
              </div>
              <button
                onClick={handleOrder}
                disabled={isOrdering}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50"
              >
                {isOrdering ? (
                  <RefreshCw className="w-6 h-6 animate-spin" />
                ) : (
                  <MessageCircle className="w-6 h-6" />
                )}
                <span>{isOrdering ? 'Placing Order...' : 'Place Your Order'}</span>
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
                <CheckCircle className="w-5 h-5 mr-2" />
                Order Placed!
              </div>
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50"
              >
                {isVerifying ? (
                  <RefreshCw className="w-6 h-6 animate-spin" />
                ) : (
                  <CheckCircle className="w-6 h-6" />
                )}
                <span>{isVerifying ? 'Sending WhatsApp...' : 'Get WhatsApp Verification'}</span>
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
                <CheckCircle className="w-5 h-5 mr-2" />
                WhatsApp Sent!
              </div>
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50"
              >
                {isProcessing ? (
                  <RefreshCw className="w-6 h-6 animate-spin" />
                ) : (
                  <Truck className="w-6 h-6" />
                )}
                <span>{isProcessing ? 'Processing...' : 'Send to Kitchen'}</span>
              </button>
            </div>
          )}

          {orderComplete && (
            <div className="text-center">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full mb-6">
                <CheckCircle className="w-6 h-6 mr-2" />
                Order Complete! 🎉
              </div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-mono">#ORD-2024-001</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span>2x Pizza Margherita, 1x Coke</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-semibold">$24.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600 font-semibold">Sent to Kitchen</span>
                  </div>
                </div>
              </div>
              <button
                onClick={resetDemo}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3"
              >
                <RotateCcw className="w-6 h-6" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>

        {/* Live Status */}
        {currentStep > 0 && !orderComplete && (
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-800">Live Demo in Progress</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              This simulates the real-time order processing system
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section')
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Order Taking",
      description: "Advanced AI that understands natural language, handles complex orders, and never gets tired",
      color: "blue",
      stats: "99.5% accuracy"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive insights, sales trends, and performance metrics updated in real-time",
      color: "green",
      stats: "50+ metrics"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Integration",
      description: "Seamless customer communication with automated responses and order confirmations",
      color: "purple",
      stats: "2B+ users"
    },
    {
      icon: Phone,
      title: "Phone Call Handling",
      description: "AI handles phone orders with human-like conversation and perfect memory",
      color: "orange",
      stats: "24/7 available"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Orders processed, confirmed, and sent to kitchen in under 30 seconds",
      color: "yellow",
      stats: "<30 seconds"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Coordinate kitchen staff, delivery teams, and managers with smart notifications",
      color: "indigo",
      stats: "Unlimited users"
    }
  ]

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "500+", label: "Restaurants" },
    { number: "1M+", label: "Orders Processed" },
    { number: "4.9/5", label: "Customer Rating" }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Owner, Bella Vista Restaurant",
      content: "Agentic AI has revolutionized our order management. Orders are processed 3x faster!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Manager, Golden Dragon",
      content: "The WhatsApp integration is seamless. Our customers love the instant responses.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "CEO, Cloud Kitchen Co.",
      content: "Analytics dashboard gives us insights we never had before. Highly recommended!",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Agentic AI</span>
            </div>
                              <div className="flex items-center space-x-4">
                    <button 
                      onClick={scrollToDemo}
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Demo</span>
                    </button>
                    <Link to="/pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Pricing
                    </Link>
                    <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Sign In
                    </Link>
                    <Link to="/signup" className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Get Started
                    </Link>
                  </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Restaurant Management
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                AI-Powered Order Management
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  for Restaurants
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your restaurant operations with intelligent order processing, 
                real-time analytics, and seamless customer communication.
                <span className="block mt-2 font-semibold text-gray-900">Increase revenue by 40% while reducing operational costs.</span>
              </p>
            </div>
                              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/signup"
                      className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
              <Link to="/demo" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your restaurant operations
            </p>
          </div>

          {/* Interactive Feature Showcase */}
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const isActive = activeFeature === index
                return (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`p-4 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-50 border-2 border-blue-200 shadow-lg' 
                        : 'bg-white hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                      isActive ? 'bg-blue-100' : 'bg-gray-200'
                    }`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                    </div>
                    <h3 className={`text-sm font-semibold ${isActive ? 'text-blue-900' : 'text-gray-700'}`}>
                      {feature.title}
                    </h3>
                  </button>
                )
              })}
            </div>

            {/* Active Feature Display */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      {React.createElement(features[activeFeature].icon, { className: "w-6 h-6 text-blue-600" })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {features[activeFeature].title}
                      </h3>
                      <div className="flex items-center text-blue-600 font-semibold">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {features[activeFeature].stats}
                      </div>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {features[activeFeature].description}
                  </p>
                </div>
                <div className="hidden md:block ml-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    {React.createElement(features[activeFeature].icon, { className: "w-16 h-16 text-blue-600" })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    feature.color === 'blue' ? 'bg-blue-100' :
                    feature.color === 'green' ? 'bg-green-100' :
                    feature.color === 'purple' ? 'bg-purple-100' :
                    feature.color === 'orange' ? 'bg-orange-100' :
                    feature.color === 'yellow' ? 'bg-yellow-100' :
                    'bg-indigo-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      feature.color === 'blue' ? 'text-blue-600' :
                      feature.color === 'green' ? 'text-green-600' :
                      feature.color === 'purple' ? 'text-purple-600' :
                      feature.color === 'orange' ? 'text-orange-600' :
                      feature.color === 'yellow' ? 'text-yellow-600' :
                      'text-indigo-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-gray-500">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {feature.stats}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in minutes with our simple setup process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600">
                Link your WhatsApp and phone number to our AI system
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Configure</h3>
              <p className="text-gray-600">
                Set up your menu, pricing, and business rules
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Launch</h3>
              <p className="text-gray-600">
                Start processing orders automatically with AI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo-section" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Try It Live
            </h2>
            <p className="text-xl text-gray-600">
              Experience the complete order flow in real-time
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <InteractiveDemoCard />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4 mr-2" />
              Trusted by 500+ Restaurants
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of restaurants already using Agentic AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="ml-auto">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-gray-700">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-8">Trusted by leading restaurant chains</p>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <div className="text-2xl font-bold text-gray-400">McDonald's</div>
              <div className="text-2xl font-bold text-gray-400">KFC</div>
              <div className="text-2xl font-bold text-gray-400">Pizza Hut</div>
              <div className="text-2xl font-bold text-gray-400">Subway</div>
              <div className="text-2xl font-bold text-gray-400">Domino's</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your restaurant. Start free, scale as you grow.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$29<span className="text-lg text-gray-500">/month</span></div>
              <p className="text-gray-600 mb-4">Perfect for small restaurants</p>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li>• Up to 100 orders/month</li>
                <li>• Basic AI processing</li>
                <li>• WhatsApp integration</li>
                <li>• Email support</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$79<span className="text-lg text-gray-500">/month</span></div>
              <p className="text-gray-600 mb-4">Ideal for growing restaurants</p>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li>• Up to 500 orders/month</li>
                <li>• Advanced AI features</li>
                <li>• Multiple integrations</li>
                <li>• Priority support</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$199<span className="text-lg text-gray-500">/month</span></div>
              <p className="text-gray-600 mb-4">For large restaurant chains</p>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li>• Unlimited orders</li>
                <li>• Custom AI training</li>
                <li>• White-label options</li>
                <li>• 24/7 support</li>
              </ul>
            </div>
          </div>
          
          <Link
            to="/pricing"
            className="inline-flex items-center bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            View All Plans
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2" />
            Start Your Free Trial Today
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of restaurants already using Agentic AI to streamline their operations.
            <span className="block mt-2 text-white font-semibold">No credit card required. Start free today.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/signup"
              className="group bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/contact" 
              className="group border-2 border-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
            >
              Contact Sales
              <Phone className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold">Agentic AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered order management for modern restaurants
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Agentic AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
