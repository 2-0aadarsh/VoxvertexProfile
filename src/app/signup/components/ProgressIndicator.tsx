'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { ProgressIndicatorProps } from '../types'

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1)
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="relative">
              <motion.div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                  step < currentStep
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : step === currentStep
                    ? 'border-orange-500 text-orange-500 bg-white'
                    : 'border-gray-300 text-gray-300 bg-white'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {step < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="font-medium text-xs">{step}</span>
                )}
              </motion.div>
            </div>
            
            {index < steps.length - 1 && (
              <motion.div
                className={`flex-1 h-0.5 mx-3 transition-colors duration-300 ${
                  step < currentStep ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step < currentStep ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-1.5 text-xs">
        <span className="text-gray-500">Personal Info</span>
        <span className="text-gray-500">Security</span>
        <span className="text-gray-500">Professional</span>
      </div>
    </div>
  )
}