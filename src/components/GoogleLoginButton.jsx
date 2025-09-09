import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const GoogleLoginButton = ({ onSuccess, onError, disabled = false, className = '' }) => {
  const { login } = useAuth()

  const handleGoogleLogin = async () => {
    try {
      // Simulate Google OAuth flow
      // In a real app, this would integrate with Google OAuth API
      const mockGoogleUser = {
        email: 'user@gmail.com',
        name: 'Google User',
        picture: 'https://via.placeholder.com/40',
        provider: 'google'
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Login with Google user data
      const result = await login(mockGoogleUser.email, 'google_oauth')
      
      if (result.success) {
        onSuccess && onSuccess(mockGoogleUser)
      } else {
        onError && onError(result.error)
      }
    } catch (error) {
      console.error('Google login error:', error)
      onError && onError('Google login failed. Please try again.')
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={disabled}
      className={`w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Continue with Google
    </button>
  )
}

export default GoogleLoginButton
