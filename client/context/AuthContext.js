'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkWallet()
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange)
    }
    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountChange)
      }
    }
  }, [])

  const checkWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
        }
      } catch (error) {
        console.error('Error checking wallet:', error)
      }
    }
    setLoading(false)
  }

  const handleAccountChange = (accounts) => {
    if (accounts.length > 0) {
      setWalletAddress(accounts[0])
    } else {
      setWalletAddress(null)
    }
  }

  const disconnectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        // Clear the wallet address state
        setWalletAddress(null)
        
        // Optional: Request to clear permissions
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        })
        
        // Optional: Clear any stored data
        localStorage.removeItem('walletConnected') // If you're storing connection state
        
        // Trigger a check of connected accounts
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length === 0) {
          console.log('Successfully disconnected')
        }
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask is not installed')
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      setWalletAddress(accounts[0])
      return accounts[0]
    } catch (error) {
      console.error('Error connecting wallet:', error)
      throw error
    }
  }

  const value = {
    walletAddress,
    connectWallet,
    disconnectWallet, // Add this to the value object
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}