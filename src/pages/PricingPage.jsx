import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Check, X, Star, Zap, Crown, ArrowRight, Users, BarChart3, Shield, Clock, Headphones } from 'lucide-react'

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' or 'yearly'

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small restaurants getting started',
      icon: Users,
      color: 'gray',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Up to 100 orders per month',
        'Basic AI order processing',
        'WhatsApp integration',
        'Phone call handling',
        'Basic analytics dashboard',
        'Email support',
        'Setup assistance'
      ],
      limitations: [
        'Limited to 1 phone number',
        'Basic reporting only',
        'Standard response time'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing restaurants and cloud kitchens',
      icon: BarChart3,
      color: 'blue',
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        'Up to 500 orders per month',
        'Advanced AI with custom training',
        'WhatsApp + SMS integration',
        'Multiple phone numbers',
        'Advanced analytics & insights',
        'Priority support',
        'Custom menu management',
        'Delivery team coordination',
        'Real-time notifications',
        'API access'
      ],
      limitations: [
        'Up to 3 phone numbers',
        'Standard SLA response time'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large restaurant chains and franchises',
      icon: Crown,
      color: 'purple',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        'Unlimited orders',
        'Custom AI model training',
        'All communication channels',
        'Unlimited phone numbers',
        'Advanced reporting & BI',
        '24/7 dedicated support',
        'Custom integrations',
        'Multi-location management',
        'White-label options',
        'Dedicated account manager',
        'Custom SLA agreements',
        'On-premise deployment option'
      ],
      limitations: [],
      popular: false
    }
  ]

  const addOns = [
    {
      name: 'Additional Phone Numbers',
      description: 'Extra phone numbers for different locations',
      price: 15,
      period: 'per number/month'
    },
    {
      name: 'Advanced Analytics',
      description: 'Enhanced reporting and business intelligence',
      price: 25,
      period: 'per month'
    },
    {
      name: 'Priority Support',
      description: '24/7 phone and chat support',
      price: 50,
      period: 'per month'
    },
    {
      name: 'Custom Integrations',
      description: 'Connect with your existing POS systems',
      price: 100,
      period: 'one-time setup'
    }
  ]

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! We offer a 14-day free trial for all plans. No credit card required to start.'
    },
    {
      question: 'What happens if I exceed my order limit?',
      answer: 'We\'ll notify you when you\'re approaching your limit. You can upgrade your plan or purchase additional orders as needed.'
    },
    {
      question: 'Do you offer custom pricing?',
      answer: 'Yes, we offer custom pricing for enterprise customers with specific needs. Contact our sales team for more information.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your service will continue until the end of your current billing period.'
    }
  ]

  const getPrice = (plan) => {
    return billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice
  }

  const getSavings = (plan) => {
    const monthlyTotal = plan.monthlyPrice * 12
    const yearlyTotal = plan.yearlyPrice
    return monthlyTotal - yearlyTotal
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Agentic AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
              <Link to="/signup" className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your restaurant. No hidden fees, no surprises. 
            Start with our free trial and scale as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                Save up to 20%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isPopular = plan.popular
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                  isPopular ? 'border-blue-500' : 'border-gray-200'
                } p-8`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    plan.color === 'gray' ? 'bg-gray-100' :
                    plan.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      plan.color === 'gray' ? 'text-gray-600' :
                      plan.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">${getPrice(plan)}</span>
                    <span className="text-gray-600">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        Save ${getSavings(plan)}/year
                      </div>
                    )}
                  </div>

                  <Link
                    to="/signup"
                    className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md transition-colors ${
                      isPopular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-2">Limitations:</h5>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start">
                          <X className="w-4 h-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Add-ons & Extras</h2>
            <p className="text-xl text-gray-600">Enhance your plan with these optional features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{addon.name}</h3>
                <p className="text-gray-600 mb-4">{addon.description}</p>
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  ${addon.price}
                  <span className="text-sm font-normal text-gray-500">/{addon.period}</span>
                </div>
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
                  Add to Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of restaurants already using Agentic AI to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="border border-gray-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Agentic AI</span>
            </div>
            <div className="text-gray-400">
              <p>&copy; 2024 Agentic AI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
