import { NextRequest, NextResponse } from 'next/server'
import { FormData } from '../../signup/types'

// Response types
interface SignupResponse {
  success: boolean
  message: string
  user?: {
    id: string
    fullName: string
    email: string
    whoAreYou: string
    companyTitle: string
    activity: string[]
  }
}

interface SignupError {
  success: false
  message: string
  errors?: {
    field: string
    message: string
  }[]
}

// Validation function
function validateSignupData(data: FormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters long')
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address')
  }

  if (!data.password || data.password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (!data.whoAreYou || !['speaker', 'organizer', 'participant'].includes(data.whoAreYou)) {
    errors.push('Please select a valid role')
  }

  if (!data.companyTitle || data.companyTitle.trim().length === 0) {
    errors.push('Please select an industry')
  }

  if (!data.activity || data.activity.length === 0) {
    errors.push('Please select at least one primary activity')
  }

  if (data.activity && data.activity.length > 3) {
    errors.push('Please select no more than 3 primary activities')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Simulate user creation (replace with your actual database logic)
async function createUser(userData: FormData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Check if user already exists (simulate)
  if (userData.email === 'test@example.com') {
    throw new Error('User with this email already exists')
  }

  // Generate a unique user ID (in real app, this would come from your database)
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  return {
    id: userId,
    fullName: userData.fullName,
    email: userData.email,
    whoAreYou: userData.whoAreYou,
    companyTitle: userData.companyTitle,
    activity: userData.activity,
    createdAt: new Date().toISOString()
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const formData: FormData = body

    // Validate input data
    const validation = validateSignupData(formData)
    if (!validation.isValid) {
      return NextResponse.json<SignupError>(
        {
          success: false,
          message: 'Validation failed',
          errors: validation.errors.map(error => ({ field: 'general', message: error }))
        },
        { status: 400 }
      )
    }

    // Create user (replace with your actual database logic)
    const newUser = await createUser(formData)

    // Return success response
    return NextResponse.json<SignupResponse>(
      {
        success: true,
        message: 'Account created successfully! Welcome to our community.',
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          whoAreYou: newUser.whoAreYou,
          companyTitle: newUser.companyTitle,
          activity: newUser.activity
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Signup error:', error)
    
    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('already exists')) {
        return NextResponse.json<SignupError>(
          {
            success: false,
            message: 'An account with this email already exists. Please try signing in instead.',
          },
          { status: 409 }
        )
      }
    }

    // Generic error response
    return NextResponse.json<SignupError>(
      {
        success: false,
        message: 'Something went wrong while creating your account. Please try again.',
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}