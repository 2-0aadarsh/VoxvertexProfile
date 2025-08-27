import { NextRequest, NextResponse } from 'next/server'
import { userStorage } from '../../../lib/userStorage'

interface LoginResponse {
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
  token?: string
}

interface LoginError {
  success: false
  message: string
  errors?: {
    field: string
    message: string
  }[]
}

interface LoginRequest {
  email: string
  password: string
}

// Using shared user storage instead of hard-coded array

// Validation function
function validateLoginData(data: LoginRequest): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address')
  }

  if (!data.password || data.password.trim().length === 0) {
    errors.push('Password is required')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

function generateToken(userId: string): string {
  const payload = {
    userId,
    timestamp: Date.now(),
    expiresIn: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  }
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

async function authenticateUser(email: string, password: string) {
  // Debug logging
  const allUsers = userStorage.getAllUsers()
  console.log('🔐 Attempting authentication for email:', email)
  console.log('Password provided:', password ? '[PROVIDED]' : '[NOT PROVIDED]')
  console.log('Available users:', allUsers.map(u => u.email))
  console.log('Total users in storage:', userStorage.getUserCount())
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))

  // Find user by email using shared storage
  const trimmedEmail = email.trim()
  const user = userStorage.findUserByEmail(trimmedEmail)
  
  console.log('User found:', user ? user.email : 'No user found')
  
  if (!user) {
    console.log('❌ Authentication failed: User not found')
    console.log('Available emails:', allUsers.map(u => u.email).join(', '))
    throw new Error('Invalid email or password')
  }

  // Check password (trim whitespace)
  const trimmedPassword = password.trim()
  console.log('Password match:', user.password === trimmedPassword)
  
  if (user.password !== trimmedPassword) {
    console.log('❌ Authentication failed: Incorrect password')
    throw new Error('Invalid email or password')
  }

  console.log('✅ Authentication successful for:', user.email)
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const loginData: LoginRequest = body

    // Validate input data
    const validation = validateLoginData(loginData)
    if (!validation.isValid) {
      return NextResponse.json<LoginError>(
        {
          success: false,
          message: 'Validation failed',
          errors: validation.errors.map(error => ({ field: 'general', message: error }))
        },
        { status: 400 }
      )
    }

    // Authenticate user
    const user = await authenticateUser(loginData.email, loginData.password)

    // Generate token
    const token = generateToken(user.id)

    // Return success response
    return NextResponse.json<LoginResponse>(
      {
        success: true,
        message: `Welcome back, ${user.fullName.split(' ')[0]}! 🎉`,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          whoAreYou: user.whoAreYou,
          companyTitle: user.companyTitle,
          activity: user.activity
        },
        token
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Login error:', error)
    
    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('Invalid email or password')) {
        return NextResponse.json<LoginError>(
          {
            success: false,
            message: 'Invalid email or password. Please check your credentials and try again.',
          },
          { status: 401 }
        )
      }
    }

    // Generic error response
    return NextResponse.json<LoginError>(
      {
        success: false,
        message: 'Something went wrong during login. Please try again.',
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