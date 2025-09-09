import React, { createContext, useContext, useState } from 'react'

const RestaurantContext = createContext()

export const useRestaurant = () => {
  const context = useContext(RestaurantContext)
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider')
  }
  return context
}

export const RestaurantProvider = ({ children }) => {
  const [restaurantName, setRestaurantName] = useState('Your Restaurant')
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Your Restaurant',
    type: 'restaurant',
    phone: '',
    whatsapp: ''
  })

  const updateRestaurantInfo = (info) => {
    setBusinessInfo(prev => ({ ...prev, ...info }))
    if (info.name) {
      setRestaurantName(info.name)
    }
  }

  const value = {
    restaurantName,
    businessInfo,
    updateRestaurantInfo
  }

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  )
}
