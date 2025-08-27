// Shared user storage for demo purposes
// In production, this would be replaced with a proper database

export interface User {
  id: string
  fullName: string
  email: string
  password: string
  whoAreYou: string
  companyTitle: string
  activity: string[]
  createdAt?: string
}

// Initial mock users
const initialUsers: User[] = [
  {
    id: 'user_1',
    fullName: 'Maxwell',
    email: 'maxwell@example.com',
    password: 'password123', 
    whoAreYou: 'speaker',
    companyTitle: 'technology',
    activity: ['Software Development', 'AI/Machine Learning', 'Web Development']
  },
  {
    id: 'user_2',
    fullName: 'Benett Down',
    email: 'benett@example.com',
    password: 'password123',
    whoAreYou: 'organizer',
    companyTitle: 'healthcare',
    activity: ['Healthcare Management', 'Medical Research', 'Patient Care']
  },
  {
    id: 'user_3',
    fullName: 'Riya',
    email: 'riyal1234@gmail.com',
    password: 'password123',
    whoAreYou: 'participant',
    companyTitle: 'business',
    activity: ['Project Management', 'Business Strategy', 'Team Leadership']
  }
]

// In-memory storage (will reset when server restarts)
let users: User[] = [...initialUsers]

export const userStorage = {
  // Get all users
  getAllUsers: (): User[] => {
    return users
  },

  // Find user by email
  findUserByEmail: (email: string): User | undefined => {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase())
  },

  // Find user by ID
  findUserById: (id: string): User | undefined => {
    return users.find(user => user.id === id)
  },

  // Add new user
  addUser: (userData: Omit<User, 'id'>): User => {
    // Check if user already exists
    const existingUser = userStorage.findUserByEmail(userData.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Generate unique ID
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      ...userData,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    console.log(`✅ New user added: ${newUser.email} (Total users: ${users.length})`)
    console.log('Current users:', users.map(u => u.email))
    
    return newUser
  },

  // Update user
  updateUser: (id: string, updates: Partial<User>): User | null => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    users[userIndex] = { ...users[userIndex], ...updates }
    return users[userIndex]
  },

  // Delete user
  deleteUser: (id: string): boolean => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return false

    users.splice(userIndex, 1)
    return true
  },

  // Get user count
  getUserCount: (): number => {
    return users.length
  }
}
