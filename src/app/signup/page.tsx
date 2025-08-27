'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import ImageCarousel from './components/ImageCarousel'
import ProgressIndicator from './components/ProgressIndicator'
import SocialSigninButtons from './components/SocialSigninButtons'
import { FormData } from './types'
import { activitiesByIndustry } from './data/activitiesData'

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    whoAreYou: '',
    companyTitle: '',
    activity: []
  })

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const totalSteps = 3

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.fullName.split(' ')[0] || formData.fullName,
          lastName: formData.fullName.split(' ')[1] || '',
          email: formData.email,
          phone: '1234567890', // You may want to add phone field to form
          password: formData.password
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      if (data.success) {
        alert('Account created successfully! 🎉\n\nYou can now login with your credentials.')
        
        // Redirect to login page after successful signup
        setTimeout(() => {
          window.location.href = '/signup/login'
        }, 1500)
      } else {
        alert(data.message || 'Failed to create account')
      }
    } catch (error) {
      console.error('Signup error:', error)
      alert(
        error instanceof Error 
          ? error.message 
          : 'Network error. Please check your connection and try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email
      case 2:
        return formData.password && formData.password.length >= 6
      case 3:
        return formData.whoAreYou && formData.companyTitle && formData.activity.length > 0
      default:
        return false
    }
  }

  const handleIndustryChange = (industry: string) => {
    updateFormData({ 
      companyTitle: industry,
      activity: [] // Reset activities when industry changes
    })
  }

  const handleActivityToggle = (activityValue: string) => {
    const currentActivities = formData.activity || []
    
    if (currentActivities.includes(activityValue)) {
      // Remove if already selected
      updateFormData({
        activity: currentActivities.filter(a => a !== activityValue)
      })
    } else if (currentActivities.length < 3) {
      // Add if less than 3 selected
      updateFormData({
        activity: [...currentActivities, activityValue]
      })
    }
  }

  const getAvailableActivities = () => {
    return activitiesByIndustry[formData.companyTitle as keyof typeof activitiesByIndustry] || []
  }

  return (
    <div className="h-screen flex overflow-hidden">

      <div className="hidden lg:flex lg:w-1/2 relative">
        <ImageCarousel />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-white">
        <div className="w-full max-w-md">

          <div className="w-full">
            <div className="text-center mb-3">
              <h1 className="text-lg font-bold mb-0.5">Create your account</h1>
              <p className="text-xs text-gray-500">Join our community and unlock exclusive features</p>
            </div>

            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
            {currentStep === 1 && (
              <div className="mb-3">
                <SocialSigninButtons />
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                  </div>
                </div>
              </div>
            )}
            <div className="mb-4">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2.5"
              >
                {currentStep === 1 && (
                  <>
                    <div className="space-y-1">
                      <label htmlFor="fullName" className="block text-xs font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateFormData({ fullName: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full px-3 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        placeholder="Enter your email address"
                        className="w-full px-3 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                      />
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => updateFormData({ password: e.target.value })}
                      placeholder="Create a secure password"
                      className="w-full px-3 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    />
                    <p className="text-xs text-gray-500">
                      Password must be at least 6 characters long
                    </p>
                  </div>
                )}

                {currentStep === 3 && (
                  <>
                    <div className="space-y-1">
                      <label htmlFor="whoAreYou" className="block text-xs font-medium text-gray-700">
                        Who are you?
                      </label>
                      <select
                        id="whoAreYou"
                        value={formData.whoAreYou}
                        onChange={(e) => updateFormData({ whoAreYou: e.target.value })}
                        className="w-full px-3 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                      >
                        <option value="">Select your role</option>
                        <option value="speaker">Speaker</option>
                        <option value="organizer">Organizer</option>
                        <option value="participant">Participant</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="companyTitle" className="block text-xs font-medium text-gray-700">
                        Industry
                      </label>
                      <select
                        id="companyTitle"
                        value={formData.companyTitle}
                        onChange={(e) => handleIndustryChange(e.target.value)}
                        className="w-full px-3 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                      >
                        <option value="">Select your industry</option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare and Medicine</option>
                        <option value="finance">Finance and Banking</option>
                        <option value="education">Education</option>
                        <option value="business">Business and Management</option>
                        <option value="engineering">Engineering</option>
                        <option value="art">Art and Entertainment</option>
                        <option value="law">Law and Legal Studies</option>
                        <option value="marketing">Marketing and Communications</option>
                        <option value="environmental">Environmental and Sustainability</option>
                        <option value="manufacturing">Manufacturing and Industry</option>
                        <option value="social">Social Sciences and Humanities</option>
                        <option value="retail">Retail and E-Commerce</option>
                        <option value="energy">Energy and Utilities</option>
                        <option value="realestate">Real Estate and Property Development</option>
                      </select>
                    </div>

                    {formData.companyTitle && (
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-700">
                          Primary Activities (Select up to 3)
                        </label>
                        <div className="text-xs text-gray-500 mb-1">
                          {formData.activity?.length || 0}/3 selected
                        </div>
                        <div className="h-24 overflow-y-auto border border-gray-200 rounded-md p-2 bg-gray-50">
                          {getAvailableActivities().map((activity) => (
                            <label
                              key={activity}
                              className="flex items-start space-x-2 p-1 hover:bg-gray-100 rounded cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={formData.activity?.includes(activity) || false}
                                onChange={() => handleActivityToggle(activity)}
                                disabled={!formData.activity?.includes(activity) && (formData.activity?.length || 0) >= 3}
                                className="rounded text-orange-500 focus:ring-orange-500 disabled:opacity-50 mt-0.5 flex-shrink-0"
                              />
                              <span className={`text-xs leading-tight ${!formData.activity?.includes(activity) && (formData.activity?.length || 0) >= 3 ? 'text-gray-400' : 'text-gray-700'}`}>
                                {activity}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!isStepValid() || isLoading}
                className="flex items-center gap-2 px-5 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  'Creating account...'
                ) : currentStep === totalSteps ? (
                  <>
                    <Check className="w-4 h-4" />
                    Complete
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center mt-2">
              <p className="text-xs text-gray-500">
                Already have an account?{' '}
                <button 
                  onClick={() => {
                    window.location.href = '/signup/login'
                  }}
                  className="text-orange-500 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}