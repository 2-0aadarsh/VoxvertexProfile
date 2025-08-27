'use client'

import { useEffect, useState } from 'react'
import { User, LogOut, Settings, MessageSquare, Users, Calendar, FileText } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('userData')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    window.location.href = '/signup/login'
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">VoxVertex Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName}! 👋
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* User Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium text-gray-700">Name:</span> {user.firstName} {user.lastName}
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Email:</span> {user.email}
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Phone:</span> {user.mobileNo}
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Role:</span> 
                <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {user.role || 'User'}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">0</p>
                <p className="text-xs text-gray-500">Active Disputes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">0</p>
                <p className="text-xs text-gray-500">Resolved Cases</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Profile Complete</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.signupComplete 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.signupComplete ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Verification</span>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-orange-500" />
              <div>
                <h4 className="font-medium text-gray-900">Disputes</h4>
                <p className="text-sm text-gray-500">Manage disputes</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-blue-500" />
              <div>
                <h4 className="font-medium text-gray-900">Messages</h4>
                <p className="text-sm text-gray-500">Chat with others</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-green-500" />
              <div>
                <h4 className="font-medium text-gray-900">Events</h4>
                <p className="text-sm text-gray-500">View events</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <Settings className="w-8 h-8 text-gray-500" />
              <div>
                <h4 className="font-medium text-gray-900">Settings</h4>
                <p className="text-sm text-gray-500">Account settings</p>
              </div>
            </div>
          </div>
        </div>

        {/* API Endpoints Info */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available API Endpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Authentication:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• POST /api/auth/register</li>
                <li>• POST /api/auth/login</li>
                <li>• POST /api/auth/logout</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Disputes (NEW):</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• GET /api/disputes</li>
                <li>• POST /api/disputes</li>
                <li>• POST /api/disputes/:id/escalate</li>
                <li>• POST /api/disputes/:id/resolve</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Core Features:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• /api/profile, /api/events</li>
                <li>• /api/chat, /api/posts</li>
                <li>• /api/wallet, /api/availability</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Speaker Profiles (NEW):</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• GET /api/speaker-profile</li>
                <li>• PUT /api/speaker-profile/bio</li>
                <li>• POST /api/speaker-profile/skills</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
