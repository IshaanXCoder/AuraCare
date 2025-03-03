"use client";

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const { walletAddress } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (!walletAddress) {
      router.push('/')
      return
    }

    fetchUserData()
  }, [walletAddress])

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single()

      if (error) throw error
      setUserData(data)
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  if (!userData) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Welcome, {userData.full_name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-900/30 p-6 rounded-xl">
          <h2 className="text-xl mb-4">Wallet Info</h2>
          <p>Address: {walletAddress}</p>
        </div>

        <div className="bg-purple-900/30 p-6 rounded-xl">
          <h2 className="text-xl mb-4">Profile Info</h2>
          <p>Email: {userData.email}</p>
          <p>Joined: {new Date(userData.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}