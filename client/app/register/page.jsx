'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Register() {
  const { walletAddress, connectWallet } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    aadhar_number: "", // Added this field
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      if (walletAddress) {
        const { data: user } = await supabase
          .from('users')
          .select('*')
          .eq('wallet_address', walletAddress)
          .single()

        if (user) {
          router.push('/dashboard')
        }
      }
    }
    checkUser()
  }, [walletAddress])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!walletAddress) {
      alert('Please connect your wallet first')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    // Validate Aadhar number
    if (formData.aadhar_number.length !== 12 || !/^\d+$/.test(formData.aadhar_number)) {
      alert("Please enter a valid 12-digit Aadhar number")
      return
    }

    setLoading(true)
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          wallet_address: walletAddress,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          aadhar_number: formData.aadhar_number,
          is_aadhar_verified: false
        }
      ])
      .select()

    if (error) throw error

    // Redirect to verification page instead of dashboard
    router.push('/aadhar-verification')
  } catch (error) {
    console.error('Registration failed:', error)
    alert('Registration failed: ' + error.message)
  } finally {
    setLoading(false)
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
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-white/70">Join our community today</p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/5 border-white/10 focus:border-pink-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/5 border-white/10 focus:border-pink-500"
                required
              />
            </div>

            {/* Added Aadhar Number field */}
            <div>
              <label className="block text-sm font-medium mb-2">Aadhar Number</label>
              <Input
                type="text"
                placeholder="Enter your 12-digit Aadhar number"
                value={formData.aadhar_number}
                onChange={(e) => {
                  // Only allow numbers and limit to 12 digits
                  const value = e.target.value.replace(/\D/g, '').slice(0, 12)
                  setFormData({ ...formData, aadhar_number: value })
                }}
                className="bg-white/5 border-white/10 focus:border-pink-500"
                required
                maxLength={12}
              />
              {formData.aadhar_number && formData.aadhar_number.length !== 12 && (
                <p className="text-red-500 text-sm mt-1">
                  Aadhar number must be 12 digits
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/5 border-white/10 focus:border-pink-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-white/5 border-white/10 focus:border-pink-500"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                type="submit"
                disabled={loading || !walletAddress}
                className={`w-full bg-gradient-to-r ${!walletAddress ? 'from-gray-500 to-gray-600' : 'from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'} text-white border-0 h-12`}
              >
                {loading ? 'Creating Account...' : 'Register'}
              </Button>
              
              {!walletAddress && (
                <Button 
                  type="button"
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0 h-12"
                >
                  Connect Wallet
                </Button>
              )}
            </div>

            {walletAddress && (
              <div className="mt-2 text-xs text-green-400 break-all">
                Wallet Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
            )}
          </form>
          
          <p className="mt-4 text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link href="/signIn" className="text-pink-500 hover:text-pink-400">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}