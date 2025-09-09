import React, { useState } from 'react'
import { Check, ArrowRight, ArrowLeft, Phone, MessageCircle, Shield, CheckCircle } from 'lucide-react'

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [whatsappOption, setWhatsappOption] = useState('')
  const [callOption, setCallOption] = useState('')
  const [verificationCode, setVerificationCode] = useState('')

  const steps = [
    { id: 1, title: 'Connect WhatsApp', description: 'Choose your WhatsApp setup' },
    { id: 2, title: 'Verify Number', description: 'Verify your WhatsApp number' },
    { id: 3, title: 'Setup Calls', description: 'Configure voice ordering' },
    { id: 4, title: 'Complete', description: 'You\'re all set!' }
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your WhatsApp</h2>
              <p className="text-gray-600">Choose how you'd like to set up WhatsApp for order management</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setWhatsappOption('own')}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                  whatsappOption === 'own'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Use My Own Number</h3>
                  <p className="text-sm text-gray-600">Connect your existing WhatsApp Business number</p>
                  <div className="mt-4 text-xs text-gray-500">
                    ✓ Keep your brand identity<br />
                    ✓ Full control over messaging<br />
                    ⚠️ Requires Meta Business Manager setup
                  </div>
                </div>
              </button>

              <button
                onClick={() => setWhatsappOption('saas')}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                  whatsappOption === 'saas'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Use SaaS Number</h3>
                  <p className="text-sm text-gray-600">Get a pre-configured WhatsApp number</p>
                  <div className="mt-4 text-xs text-gray-500">
                    ✓ Quick setup (recommended)<br />
                    ✓ No technical configuration<br />
                    ✓ Ready to use immediately
                  </div>
                </div>
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Number</h2>
              <p className="text-gray-600">
                {whatsappOption === 'own' 
                  ? 'We\'ll send a verification code to your WhatsApp number'
                  : 'Your SaaS number has been automatically verified'
                }
              </p>
            </div>

            {whatsappOption === 'own' ? (
              <div className="max-w-md mx-auto">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter verification code
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="123456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <button className="w-full btn-secondary">
                    Resend Code
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Number Verified!</h3>
                <p className="text-gray-600">Your SaaS WhatsApp number is ready to use</p>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Voice Orders</h2>
              <p className="text-gray-600">Configure how customers will call to place orders</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setCallOption('forward')}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                  callOption === 'forward'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Forward Existing Line</h3>
                  <p className="text-sm text-gray-600">Redirect your current number to AI</p>
                  <div className="mt-4 text-xs text-gray-500">
                    ✓ Keep your existing number<br />
                    ✓ No number change needed<br />
                    ⚠️ Requires call forwarding setup
                  </div>
                </div>
              </button>

              <button
                onClick={() => setCallOption('new')}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                  callOption === 'new'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Get New AI Number</h3>
                  <p className="text-sm text-gray-600">Get a dedicated AI-powered number</p>
                  <div className="mt-4 text-xs text-gray-500">
                    ✓ Ready to use immediately<br />
                    ✓ Optimized for AI ordering<br />
                    ✓ Local Pakistan number
                  </div>
                </div>
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">You're All Set! 🎉</h2>
              <p className="text-gray-600 mb-8">Your AI Order Desk is ready to take orders</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Setup Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center text-green-800">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span>WhatsApp: {whatsappOption === 'own' ? 'Your number' : 'SaaS number'} ✅</span>
                </div>
                <div className="flex items-center text-green-800">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span>Voice Orders: {callOption === 'forward' ? 'Call forwarding' : 'New AI number'} ✅</span>
                </div>
                <div className="flex items-center text-green-800">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span>AI Agent: Ready to take orders ✅</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="btn-primary text-lg px-8 py-4">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step.id
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-black' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h1>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-3xl shadow-strong p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !whatsappOption) ||
                (currentStep === 2 && whatsappOption === 'own' && !verificationCode) ||
                (currentStep === 3 && !callOption)
              }
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                (currentStep === 1 && !whatsappOption) ||
                (currentStep === 2 && whatsappOption === 'own' && !verificationCode) ||
                (currentStep === 3 && !callOption)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {currentStep === 3 ? 'Complete Setup' : 'Next'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnboardingWizard
