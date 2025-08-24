'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, AlertCircle, CheckCircle2 } from 'lucide-react'
import ProgressIndicator from './ProgressIndicator'
import SocialSigninButtons from './SocialSigninButtons'
import { activitiesByIndustry } from '../data/activitiesData'
import { SignupResponse } from '../types'

interface FormData {
  fullName: string
  email: string
  password: string
  whoAreYou: string
  companyTitle: string
  activity: string[]
}

interface SignupFormProps {
  initialStep?: number
  initialFormData?: Partial<FormData>
}

export default function SignupForm({ 
  initialStep = 1, 
  initialFormData = {} 
}: SignupFormProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    whoAreYou: '',
    companyTitle: '',
    activity: [],
    ...initialFormData
  })

  const totalSteps = 3

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
    // Clear any existing errors when user starts typing
    if (apiError) {
      setApiError('')
    }
  }, [apiError])

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
    setApiError('')
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data: SignupResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      if (data.success) {
        setIsSuccess(true)
        setSuccessMessage(data.message || 'Account created successfully!')
        
        // Optional: Reset form after successful signup
        // setFormData({
        //   fullName: '',
        //   email: '',
        //   password: '',
        //   whoAreYou: '',
        //   companyTitle: '',
        //   activity: []
        // })
        // setCurrentStep(1)
      } else {
        setApiError(data.message || 'Failed to create account')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setApiError(
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
        return formData.fullName.trim().length >= 2 && 
               formData.email && 
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      case 2:
        return formData.password && formData.password.length >= 6
      case 3:
        return formData.whoAreYou && 
               formData.companyTitle && 
               formData.activity.length > 0 && 
               formData.activity.length <= 3
      default:
        return false
    }
  }

  const handleIndustryChange = (industry: string) => {
    updateFormData({ 
      companyTitle: industry,
      activity: [] 
    })
  }

  const handleActivityToggle = (activityValue: string) => {
    const currentActivities = formData.activity || []
    
    if (currentActivities.includes(activityValue)) {
      updateFormData({
        activity: currentActivities.filter(a => a !== activityValue)
      })
    } else if (currentActivities.length < 3) {
      updateFormData({
        activity: [...currentActivities, activityValue]
      })
    }
  }

  const getAvailableActivities = () => {
    return activitiesByIndustry[formData.companyTitle as keyof typeof activitiesByIndustry] || []
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="w-full">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          </motion.div>
          <h1 className="text-xl font-bold mb-2 text-gray-900">Welcome aboard!</h1>
          <p className="text-sm text-gray-600 mb-6">
            {successMessage}
          </p>
          <button 
            onClick={() => {
              setIsSuccess(false)
              setCurrentStep(1)
              setFormData({
                fullName: '',
                email: '',
                password: '',
                whoAreYou: '',
                companyTitle: '',
                activity: []
              })
            }}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
          >
            Create Another Account
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="text-center mb-3">
        <h1 className="text-lg font-bold mb-0.5">Create your account</h1>
        <p className="text-xs text-gray-500">Join our community and unlock exclusive features</p>
      </div>

      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Error Message */}
      {apiError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-red-800">{apiError}</p>
          </div>
        </motion.div>
      )}

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
                  className={`w-full px-3 py-2 text-sm bg-gray-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    formData.fullName && formData.fullName.trim().length < 2 
                      ? 'ring-2 ring-red-300' 
                      : ''
                  }`}
                />
                {formData.fullName && formData.fullName.trim().length < 2 && (
                  <p className="text-xs text-red-600">Name must be at least 2 characters long</p>
                )}
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
                  className={`w-full px-3 py-2 text-sm bg-gray-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                      ? 'ring-2 ring-red-300' 
                      : ''
                  }`}
                />
                {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                  <p className="text-xs text-red-600">Please enter a valid email address</p>
                )}
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
                className={`w-full px-3 py-2 text-sm bg-gray-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  formData.password && formData.password.length < 6 
                    ? 'ring-2 ring-red-300' 
                    : ''
                }`}
              />
              <p className={`text-xs ${
                formData.password && formData.password.length < 6 
                  ? 'text-red-600' 
                  : 'text-gray-500'
              }`}>
                Password must be at least 6 characters long
                {formData.password && (
                  <span className="ml-2">
                    ({formData.password.length}/6)
                  </span>
                )}
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
                  className="w-full px-3 py-2 text-sm bg-gray-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full px-3 py-2 text-sm bg-gray-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          disabled={currentStep === 1 || isLoading}
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
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account...
            </>
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
          <button className="text-orange-500 hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}