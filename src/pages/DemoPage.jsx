import React, { useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  Phone,
  MessageCircle,
  Bot,
  Server,
  Database,
  Users,
  CheckCircle,
  Clock,
  ArrowRight,
  X
} from 'lucide-react'

const DemoPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const demoSteps = [
    {
      id: 1,
      title: 'Customer Calls Restaurant',
      description: 'Customer dials the restaurant number to place an order',
      icon: Phone,
      color: 'blue',
      duration: 3000,
      details: {
        customer: 'John Doe',
        phone: '+92 300 1234567',
        action: 'Dialing restaurant number...'
      }
    },
    {
      id: 2,
      title: 'Twilio Processes Call',
      description: 'Twilio Voice API receives and processes the incoming call',
      icon: MessageCircle,
      color: 'green',
      duration: 2000,
      details: {
        service: 'Twilio Voice API',
        status: 'Connected',
        latency: '45ms'
      }
    },
    {
      id: 3,
      title: 'AI Analyzes Request',
      description: 'OpenAI processes the customer request and understands the order',
      icon: Bot,
      color: 'purple',
      duration: 4000,
      details: {
        service: 'OpenAI GPT-4',
        analysis: 'Processing natural language...',
        confidence: '98%'
      }
    },
    {
      id: 4,
      title: 'Django Backend Processes',
      description: 'Django backend processes the order and stores in database',
      icon: Server,
      color: 'orange',
      duration: 2000,
      details: {
        service: 'Django REST API',
        action: 'Creating order record...',
        status: 'Processing'
      }
    },
    {
      id: 5,
      title: 'Database Storage',
      description: 'Order details are stored in PostgreSQL database',
      icon: Database,
      color: 'indigo',
      duration: 1500,
      details: {
        service: 'PostgreSQL',
        action: 'Storing order data...',
        status: 'Saved'
      }
    },
    {
      id: 6,
      title: 'WhatsApp Notification',
      description: 'Customer receives confirmation via WhatsApp',
      icon: MessageCircle,
      color: 'green',
      duration: 3000,
      details: {
        service: 'WhatsApp Cloud API',
        action: 'Sending confirmation...',
        status: 'Delivered'
      }
    },
    {
      id: 7,
      title: 'Delivery Team Alert',
      description: 'Delivery team is notified via Slack/Telegram',
      icon: Users,
      color: 'teal',
      duration: 2500,
      details: {
        service: 'Slack/Telegram',
        action: 'Notifying delivery team...',
        status: 'Sent'
      }
    }
  ]

  useEffect(() => {
    let interval
    if (isPlaying && currentStep < demoSteps.length) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= demoSteps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, (demoSteps[currentStep] && demoSteps[currentStep].duration) || 3000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep, demoSteps])

  const handlePlay = () => {
    if (currentStep >= demoSteps.length - 1) {
      setCurrentStep(0)
    }
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const currentStepData = demoSteps[currentStep]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-gray-900" />
              </div>
              <span className="text-xl font-bold">Agentic AI Demo</span>
            </div>
            <button
              onClick={() => window.history.back()}
              className="p-2 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Demo Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Live System Demo</h1>
          <p className="text-xl text-gray-400 mb-8">
            Watch how our AI processes orders from phone call to delivery
          </p>
          
          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={handlePlay}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Play Demo</span>
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">Step {currentStep + 1} of {demoSteps.length}</span>
            <span className="text-sm text-gray-400">
              {Math.round(((currentStep + 1) / demoSteps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gray-800 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Step Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Step Info */}
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                {currentStepData && <currentStepData.icon className="w-8 h-8 text-gray-600" />}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{currentStepData && currentStepData.title}</h3>
                <p className="text-gray-400">{currentStepData && currentStepData.description}</p>
              </div>
            </div>
            
            {currentStepData && currentStepData.details && (
              <div className="space-y-4">
                {Object.entries(currentStepData.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400 capitalize">{key}:</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visual Representation */}
          <div className="bg-gray-800 rounded-xl p-8">
            <h4 className="text-lg font-semibold text-white mb-6">System Status</h4>
            <div className="space-y-4">
              {demoSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    index === currentStep 
                      ? `bg-${step.color}-100 text-${step.color}-900` 
                      : index < currentStep 
                        ? 'bg-green-100 text-green-900' 
                        : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === currentStep 
                      ? 'bg-gray-800 text-white' 
                      : index < currentStep 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-600 text-gray-400'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{step.id}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-sm opacity-75">{step.description}</div>
                  </div>
                  {index === currentStep && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs">Active</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Architecture Flow */}
        <div className="bg-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Complete System Flow</h3>
          <div className="flex items-center justify-between overflow-x-auto">
            {demoSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center min-w-0 flex-1">
                <div className="flex flex-col items-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    index <= currentStep ? 'bg-gray-800' : 'bg-gray-600'
                  }`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium text-white text-center">{step.title}</div>
                </div>
                {index < demoSteps.length - 1 && (
                  <div className={`w-full h-0.5 mb-6 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-gray-400 mb-8">
            Experience the power of AI-driven order processing for your restaurant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/setup'}
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center"
            >
              Start Setup
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="border border-gray-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Learn More</h3>
            <p className="text-gray-600 mb-6">
              Our AI system processes orders in real-time, providing seamless customer experience 
              and efficient restaurant operations.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowModal(false)
                  window.location.href = '/setup'
                }}
                className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DemoPage
