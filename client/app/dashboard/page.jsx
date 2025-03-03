'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { walletAddress } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!walletAddress) {
      router.push('/')
      return
    }

    fetchUserData()
  }, [walletAddress])

  const fetchUserData = async () => {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single()

      if (error) throw error

      if (!user.is_aadhar_verified) {
        router.push('/aadhar-verification')
        return
      }

      setUserData(user)
    } catch (error) {
      console.error('Error:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
    </div>
  )

  if (!userData) return null

  return (
    <div className="min-h-screen bg-[#1a0a1c] pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h1 className="text-3xl font-bold mb-8">Welcome, {userData.name}!</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl">
                <h2 className="text-xl mb-4">Profile Info</h2>
                <div className="space-y-2">
                  <p>Email: {userData.email}</p>
                  <p>Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                  <p>Aadhar Status: <span className="text-green-500">Verified ✓</span></p>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl">
                <h2 className="text-xl mb-4">Account Details</h2>
                <div className="space-y-2">
                  <p>Member since: {new Date(userData.created_at).toLocaleDateString()}</p>
                  {/* Add more details as needed */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}