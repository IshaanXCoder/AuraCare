'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import AadharVerifier from '@/components/AadharVerifier'

export default function AadharVerification() {
  const router = useRouter()
  const { walletAddress } = useAuth()
  const [status, setStatus] = useState('idle')

  const handleVerificationComplete = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ is_aadhar_verified: true })
        .eq('wallet_address', walletAddress)

      if (!error) {
        setStatus('success')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus('error')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 -z-10 bg-[#1a0a1c]" />
      
      <div className="container mx-auto px-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Verify Your Aadhar</h1>
            <p className="text-white/70 mb-4">Complete verification to access your dashboard</p>
            
            <div className="text-sm text-white/50 mb-4">
              Please use the test Aadhar PDF for verification
            </div>
          </div>

          <div className="space-y-6">
            <AadharVerifier onVerificationComplete={handleVerificationComplete} />
            
            {status === 'success' && (
              <div className="text-green-500 text-center">
                Verification successful! Redirecting...
              </div>
            )}
            
            {status === 'error' && (
              <div className="text-red-500 text-center">
                Verification failed. Please try again.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}