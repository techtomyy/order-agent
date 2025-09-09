import React, { useState } from 'react'
import { useRestaurant } from '../contexts/RestaurantContext'
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Settings, 
  Play, 
  Bot,
  Database,
  Zap,
  Shield,
  Clock,
  AlertCircle,
  Loader,
  FileText,
  Upload,
  File,
  Image,
  FileSpreadsheet,
  X,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

const SetupWizard = () => {
  const { updateRestaurantInfo } = useRestaurant()
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [setupData, setSetupData] = useState({
    // Step 1: Connect
    phoneNumber: '',
    whatsappNumber: '',
    businessName: '',
    businessType: '',
    
    // Step 2: Configure
    menuItems: [],
    pricing: {},
    businessRules: {
      deliveryRadius: 10,
      minOrderAmount: 500,
      operatingHours: { start: '09:00', end: '23:00' },
      paymentMethods: ['cash', 'card', 'online']
    },
    
    // Step 3: Launch
    aiSettings: {
      voiceEnabled: true,
      language: 'en',
      personality: 'friendly',
      responseSpeed: 'normal'
    }
  })

  const steps = [
    {
      id: 1,
      title: 'Connect',
      description: 'Link your WhatsApp and phone number to our AI system',
      icon: Phone,
      color: 'gray'
    },
    {
      id: 2,
      title: 'Verify',
      description: 'Verify your phone number with OTP',
      icon: Shield,
      color: 'gray'
    },
    {
      id: 3,
      title: 'Configure',
      description: 'Set up your menu, pricing, and business rules',
      icon: Settings,
      color: 'gray'
    },
    {
      id: 4,
      title: 'Terms',
      description: 'Review and accept terms & conditions',
      icon: FileText,
      color: 'gray'
    },
    {
      id: 5,
      title: 'Launch',
      description: 'Start processing orders automatically with AI',
      icon: Play,
      color: 'gray'
    }
  ]

  const [otpCode, setOtpCode] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', price: '', category: '' })
  const [systemLaunched, setSystemLaunched] = useState(false)

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
    
    // Update restaurant info when Step 1 is completed
    if (stepId === 1 && setupData.businessName) {
      updateRestaurantInfo({
        name: setupData.businessName,
        type: setupData.businessType,
        phone: setupData.phoneNumber,
        whatsapp: setupData.whatsappNumber
      })
    }
  }

  const sendOTP = async () => {
    setIsProcessing(true)
    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 2000))
      setOtpSent(true)
      setResendTimer(60) // 60 seconds countdown
      
      // Start countdown timer
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
    } catch (error) {
      console.error('Error sending OTP:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const verifyOTP = async () => {
    if (otpCode.length !== 6) return
    
    setIsProcessing(true)
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo, accept any 6-digit code
      if (otpCode.length === 6) {
        setOtpVerified(true)
        handleStepComplete(2)
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const resendOTP = async () => {
    if (resendTimer > 0) return
    await sendOTP()
  }

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files)
    setIsProcessingFile(true)
    
    try {
      for (const file of files) {
        const fileData = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          status: 'processing'
        }
        
        setUploadedFiles(prev => [...prev, fileData])
        
        // Simulate file processing based on file type
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        let extractedItems = []
        
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          extractedItems = await processCSVFile(file)
        } else if (file.type.startsWith('image/')) {
          extractedItems = await processImageFile(file)
        } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
          extractedItems = await processPDFFile(file)
        }
        
        // Update file status and add extracted items
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileData.id 
              ? { ...f, status: 'completed', extractedItems }
              : f
          )
        )
        
        // Add extracted items to menu
        setMenuItems(prev => [...prev, ...extractedItems])
      }
    } catch (error) {
      console.error('Error processing files:', error)
    } finally {
      setIsProcessingFile(false)
    }
  }

  const processCSVFile = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const csv = e.target.result
        const lines = csv.split('\n')
        const items = []
        
        // Skip header row
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (line) {
            const [name, price, category = 'Main Course'] = line.split(',').map(s => s.trim())
            if (name && price) {
              items.push({
                id: Date.now() + Math.random(),
                name,
                price: parseFloat(price) || 0,
                category
              })
            }
          }
        }
        resolve(items)
      }
      reader.readAsText(file)
    })
  }

  const processImageFile = async (file) => {
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock extracted items from image
    return [
      { id: Date.now() + Math.random(), name: 'Chicken Biryani', price: 450, category: 'Main Course' },
      { id: Date.now() + Math.random() + 1, name: 'Mutton Karahi', price: 650, category: 'Main Course' },
      { id: Date.now() + Math.random() + 2, name: 'Naan Bread', price: 50, category: 'Bread' },
      { id: Date.now() + Math.random() + 3, name: 'Lassi', price: 80, category: 'Beverage' }
    ]
  }

  const processPDFFile = async (file) => {
    // Simulate PDF text extraction
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock extracted items from PDF
    return [
      { id: Date.now() + Math.random(), name: 'Beef Burger', price: 350, category: 'Fast Food' },
      { id: Date.now() + Math.random() + 1, name: 'French Fries', price: 120, category: 'Sides' },
      { id: Date.now() + Math.random() + 2, name: 'Coca Cola', price: 60, category: 'Beverage' }
    ]
  }

  const addMenuItem = () => {
    if (newItem.name && newItem.price) {
      setMenuItems(prev => [...prev, {
        id: Date.now(),
        ...newItem,
        price: parseFloat(newItem.price) || 0
      }])
      setNewItem({ name: '', price: '', category: '' })
      setShowAddItem(false)
    }
  }

  const removeMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id))
  }

  const removeUploadedFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!setupData.businessName || !setupData.businessType || !setupData.phoneNumber) {
          setError('Please fill in all required fields')
          return false
        }
        return true
      case 2:
        if (!otpVerified) {
          setError('Please verify your phone number first')
          return false
        }
        return true
      case 3:
        // Configuration step - no validation needed for demo
        return true
      case 4:
        if (!termsAccepted) {
          setError('You must accept the terms and conditions')
          return false
        }
        return true
      case 5:
        // Launch step - no validation needed
        return true
      default:
        return true
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCompleteStep = (stepId) => {
    handleStepComplete(stepId)
  }

  const handleLaunch = async () => {
    setIsProcessing(true)
    try {
      // Update restaurant info in context
      updateRestaurantInfo({
        name: setupData.businessName || 'Your Restaurant',
        type: setupData.businessType,
        phone: setupData.phoneNumber,
        whatsapp: setupData.whatsappNumber
      })
      
      // Simulate API calls for system launch
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mark the final step as completed
      handleStepComplete(5)
      setSystemLaunched(true)
      
      // Navigate to dashboard after successful launch
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
      
    } catch (error) {
      console.error('Error launching system:', error)
      setError('Failed to launch system. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Systems</h3>
        <p className="text-gray-600">Link your communication channels to our AI system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Number Setup */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Phone className="w-6 h-6 text-gray-600" />
            <h4 className="text-lg font-semibold text-gray-900">Phone Number</h4>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Phone Number
              </label>
              <input
                type="tel"
                value={setupData.phoneNumber}
                onChange={(e) => {
                  setSetupData({...setupData, phoneNumber: e.target.value})
                  // Update restaurant info in real-time
                  updateRestaurantInfo({
                    name: setupData.businessName,
                    type: setupData.businessType,
                    phone: e.target.value,
                    whatsapp: setupData.whatsappNumber
                  })
                }}
                placeholder="+92 300 1234567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Twilio Voice API integration ready</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Setup */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <h4 className="text-lg font-semibold text-gray-900">WhatsApp Business</h4>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                value={setupData.whatsappNumber}
                onChange={(e) => {
                  setSetupData({...setupData, whatsappNumber: e.target.value})
                  // Update restaurant info in real-time
                  updateRestaurantInfo({
                    name: setupData.businessName,
                    type: setupData.businessType,
                    phone: setupData.phoneNumber,
                    whatsapp: e.target.value
                  })
                }}
                placeholder="+92 300 1234567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Meta Cloud API integration ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              value={setupData.businessName}
              onChange={(e) => {
                const newName = e.target.value
                setSetupData({...setupData, businessName: newName})
                // Update restaurant name in real-time as user types
                if (newName.trim()) {
                  updateRestaurantInfo({
                    name: newName,
                    type: setupData.businessType,
                    phone: setupData.phoneNumber,
                    whatsapp: setupData.whatsappNumber
                  })
                }
              }}
              placeholder="Your Restaurant Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type
            </label>
            <select
              value={setupData.businessType}
              onChange={(e) => {
                setSetupData({...setupData, businessType: e.target.value})
                // Update restaurant info in real-time
                updateRestaurantInfo({
                  name: setupData.businessName,
                  type: e.target.value,
                  phone: setupData.phoneNumber,
                  whatsapp: setupData.whatsappNumber
                })
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="">Select Business Type</option>
              <option value="restaurant">Restaurant</option>
              <option value="cloud-kitchen">Cloud Kitchen</option>
              <option value="cafe">Cafe</option>
              <option value="fast-food">Fast Food</option>
            </select>
          </div>
        </div>
      </div>

      {/* Integration Status */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Integration Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-800">Twilio Voice API</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-800">OpenAI API</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-800">WhatsApp Cloud API</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Phone Number</h3>
        <p className="text-gray-600">
          We've sent a 6-digit verification code to <span className="font-semibold">{setupData.phoneNumber}</span>
        </p>
      </div>

      {!otpSent ? (
        <div className="text-center">
          <button
            onClick={sendOTP}
            disabled={isProcessing}
            className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Sending OTP...
              </div>
            ) : (
              'Send Verification Code'
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Verification Code
            </label>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="w-full px-4 py-3 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent tracking-widest"
              maxLength={6}
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Enter the 6-digit code sent to your phone
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <button
              onClick={resendOTP}
              disabled={resendTimer > 0}
              className={`text-gray-600 hover:text-gray-800 ${
                resendTimer > 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
            </button>
            
            {otpVerified && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                Verified
              </div>
            )}
          </div>

          <button
            onClick={verifyOTP}
            disabled={otpCode.length !== 6 || isProcessing || otpVerified}
            className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Verifying...
              </div>
            ) : otpVerified ? (
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Verified
              </div>
            ) : (
              'Verify Code'
            )}
          </button>
        </div>
      )}
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Terms & Conditions</h3>
        <p className="text-gray-600">
          Please review and accept our terms of service to continue
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Terms of Service</h4>
        
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">1. Service Description</h5>
            <p>
              Agentic AI provides AI-powered order management services for restaurants, including automated order processing, customer communication, and analytics.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 mb-2">2. User Responsibilities</h5>
            <p>
              You are responsible for maintaining accurate menu information, pricing, and business details. Agentic AI is not liable for errors caused by incorrect information.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 mb-2">3. Data Privacy</h5>
            <p>
              We collect and process customer data in accordance with our Privacy Policy. Customer information is used solely for order processing and service delivery.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 mb-2">4. Service Availability</h5>
            <p>
              We strive for 99.9% uptime but cannot guarantee uninterrupted service. Scheduled maintenance will be announced in advance.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 mb-2">5. Billing & Cancellation</h5>
            <p>
              Services are billed monthly. You may cancel your subscription at any time. Data will be retained for 30 days after cancellation.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 mb-2">6. Limitation of Liability</h5>
            <p>
              Our liability is limited to the amount paid for services in the 12 months preceding the claim. We are not liable for indirect or consequential damages.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms-acceptance"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 text-gray-800 focus:ring-gray-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms-acceptance" className="text-gray-700">
              I have read and agree to the{' '}
              <a href="/terms" className="text-gray-800 hover:text-gray-900 underline" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-gray-800 hover:text-gray-900 underline" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="marketing-consent"
              type="checkbox"
              className="h-4 w-4 text-gray-800 focus:ring-gray-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="marketing-consent" className="text-gray-700">
              I would like to receive marketing emails and updates about new features (optional)
            </label>
          </div>
        </div>
      </div>

      {termsAccepted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm text-green-800 font-medium">
              Terms accepted! You can now proceed to launch your AI system.
            </span>
          </div>
        </div>
      )}
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Configure Your Business</h3>
        <p className="text-gray-600">Set up your menu, pricing, and business rules</p>
      </div>

      {/* Menu Setup */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">Menu Items</h4>
          <span className="text-sm text-gray-500">{menuItems.length} items</span>
        </div>

        {/* File Upload Options */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h5 className="text-md font-medium text-gray-900 mb-4">Upload Menu Files</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* CSV Upload */}
            <label className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
              <FileSpreadsheet className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">CSV File</span>
              <span className="text-xs text-gray-500">Dish,Price,Category</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                multiple
              />
            </label>

            {/* Image Upload */}
            <label className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
              <Image className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Image</span>
              <span className="text-xs text-gray-500">JPG, PNG, GIF</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                multiple
              />
            </label>

            {/* PDF Upload */}
            <label className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
              <File className="w-8 h-8 text-red-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">PDF</span>
              <span className="text-xs text-gray-500">Menu Document</span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                multiple
              />
            </label>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h6 className="text-sm font-medium text-gray-700">Uploaded Files:</h6>
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    {file.type === 'text/csv' ? (
                      <FileSpreadsheet className="w-4 h-4 text-green-600" />
                    ) : file.type.startsWith('image/') ? (
                      <Image className="w-4 h-4 text-blue-600" />
                    ) : (
                      <File className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm text-gray-700">{file.name}</span>
                    {file.status === 'processing' && (
                      <Loader className="w-4 h-4 text-blue-600 animate-spin" />
                    )}
                    {file.status === 'completed' && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <button
                    onClick={() => removeUploadedFile(file.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {isProcessingFile && (
            <div className="flex items-center justify-center py-4">
              <Loader className="w-5 h-5 text-blue-600 animate-spin mr-2" />
              <span className="text-sm text-gray-600">Processing files...</span>
            </div>
          )}
        </div>

        {/* Manual Add Item */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-md font-medium text-gray-900">Add Menu Item Manually</h5>
            <button
              onClick={() => setShowAddItem(!showAddItem)}
              className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          </div>

          {showAddItem && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Dish Name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Price (PKR)"
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Main Course">Main Course</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Beverages">Beverages</option>
                <option value="Desserts">Desserts</option>
                <option value="Bread">Bread</option>
                <option value="Sides">Sides</option>
              </select>
              <div className="md:col-span-3 flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddItem(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={addMenuItem}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                >
                  Add Item
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Menu Items List */}
        {menuItems.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-md font-medium text-gray-900">Menu Items ({menuItems.length})</h5>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {menuItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="text-sm text-gray-500">{item.category}</span>
                    </div>
                    <div className="text-sm text-gray-600">PKR {item.price}</div>
                  </div>
                  <button
                    onClick={() => removeMenuItem(item.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Business Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Delivery Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Radius (km)
              </label>
              <input
                type="number"
                value={setupData.businessRules.deliveryRadius}
                onChange={(e) => setSetupData({
                  ...setupData,
                  businessRules: {...setupData.businessRules, deliveryRadius: e.target.value}
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order Amount (PKR)
              </label>
              <input
                type="number"
                value={setupData.businessRules.minOrderAmount}
                onChange={(e) => setSetupData({
                  ...setupData,
                  businessRules: {...setupData.businessRules, minOrderAmount: e.target.value}
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Operating Hours</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opening Time
              </label>
              <input
                type="time"
                value={setupData.businessRules.operatingHours.start}
                onChange={(e) => setSetupData({
                  ...setupData,
                  businessRules: {
                    ...setupData.businessRules,
                    operatingHours: {...setupData.businessRules.operatingHours, start: e.target.value}
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Closing Time
              </label>
              <input
                type="time"
                value={setupData.businessRules.operatingHours.end}
                onChange={(e) => setSetupData({
                  ...setupData,
                  businessRules: {
                    ...setupData.businessRules,
                    operatingHours: {...setupData.businessRules.operatingHours, end: e.target.value}
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Launch Your AI System</h3>
        <p className="text-gray-600">Start processing orders automatically with AI</p>
      </div>

      {/* System Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          System Ready
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Phone system connected</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">WhatsApp integration active</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">AI system configured</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Delivery team notified</span>
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Configuration</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Personality
              </label>
              <select
                value={setupData.aiSettings.personality}
                onChange={(e) => setSetupData({
                  ...setupData,
                  aiSettings: {...setupData.aiSettings, personality: e.target.value}
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Speed
              </label>
              <select
                value={setupData.aiSettings.responseSpeed}
                onChange={(e) => setSetupData({
                  ...setupData,
                  aiSettings: {...setupData.aiSettings, responseSpeed: e.target.value}
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="fast">Fast</option>
                <option value="normal">Normal</option>
                <option value="slow">Slow</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={setupData.aiSettings.language}
                onChange={(e) => setSetupData({
                  ...setupData,
                  aiSettings: {...setupData.aiSettings, language: e.target.value}
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="ur">Urdu</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={setupData.aiSettings.voiceEnabled}
                onChange={(e) => setSetupData({
                  ...setupData,
                  aiSettings: {...setupData.aiSettings, voiceEnabled: e.target.checked}
                })}
                className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Enable Voice Processing
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <h4 className="text-lg font-semibold text-green-900 mb-4">System Ready</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800">Phone system connected</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800">WhatsApp integration active</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800">AI system configured</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800">Delivery team notified</span>
          </div>
        </div>
      </div>

      {/* Launch Button */}
      <div className="text-center">
        {systemLaunched ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-green-800 mb-2">System Launched Successfully!</h4>
            <p className="text-green-700 mb-4">
              Your AI order desk is now active and ready to process orders.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Redirecting to dashboard...</span>
            </div>
          </div>
        ) : (
          <button
            onClick={handleLaunch}
            disabled={isProcessing}
            className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Launching System...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Launch AI System</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-xl text-gray-600">Get started in minutes with our simple setup process</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  completedSteps.includes(step.id) 
                    ? 'bg-green-500' 
                    : currentStep === step.id 
                      ? 'bg-gray-800' 
                      : 'bg-gray-300'
                }`}>
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500 max-w-24">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}

          {/* Navigation */}
          {!systemLaunched && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex space-x-3">
                {currentStep < 5 ? (
                  <button
                    onClick={() => {
                      if (validateStep(currentStep)) {
                        handleStepComplete(currentStep)
                        handleNext()
                      }
                    }}
                    className="flex items-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleLaunch}
                    disabled={isProcessing}
                    className="flex items-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Launching...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Launch System</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Success Message */}
        {completedSteps.length === 3 && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-900 mb-2">Setup Complete!</h3>
            <p className="text-green-700 mb-4">
              Your AI order processing system is now live and ready to handle customer orders.
            </p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SetupWizard
