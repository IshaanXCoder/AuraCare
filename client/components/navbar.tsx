
"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  const { walletAddress, connectWallet, disconnectWallet } = useAuth()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showDisconnect, setShowDisconnect] = useState(false)
  const disconnectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    const handleClickOutside = (event: MouseEvent) => {
      if (disconnectRef.current && !disconnectRef.current.contains(event.target as Node)) {
        setShowDisconnect(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleConnectWallet = async () => {
    try {
      await connectWallet()
      console.log('Wallet connected:', walletAddress)
  
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single()
  
      console.log('User data:', user, 'Error:', error)
  
      if (user) {
        console.log('Existing user found, redirecting to dashboard')
        router.push('/dashboard')
      } else {
        console.log('No user found, redirecting to registration')
        router.push('/register')
      }
    } catch (error) {
      console.error('Connection error:', error)
    }
  }
  
  const handleDisconnect = async () => {
    try {
      await disconnectWallet()
      setShowDisconnect(true)
      router.push('/')
    } catch (error) {
      console.error('Error disconnecting:', error)
    }
  }

  const WalletButton = () => (
    <div className="relative" ref={disconnectRef}>
      <Button 
        variant="outline" 
        className="border-green-500/50 text-white hover:bg-green-500/10"
        onClick={() => setShowDisconnect(!showDisconnect)}
      >
        {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
      </Button>

      <AnimatePresence>
        {showDisconnect && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full"
          >
            <Button
              onClick={handleDisconnect}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50"
            >
              Disconnect
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/30 backdrop-blur-lg border-b border-pink-500/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-sm opacity-70"></div>
            <div className="absolute inset-0.5 bg-black rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-lg">
              E
            </div>
          </div>
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Elevate
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
  {["Dashboard", "Features", "Testimonials", "Community"].map((item) => (
    <Link
      key={item}
      href={item === "Dashboard" ? "/dashboard" : `#${item.toLowerCase()}`}
      className="text-white/80 hover:text-white transition-colors relative group"
    >
      {item}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  ))}
</nav>

        <div className="hidden md:flex items-center gap-4">
          {walletAddress ? (
            <WalletButton />
          ) : (
            <Button
              onClick={handleConnectWallet}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0"
            >
              Connect Wallet
            </Button>
          )}
          
          
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-pink-500/10 py-4"
        >
          <div className="container mx-auto px-4 flex flex-col gap-4">
            {["Home", "Features", "Services", "Testimonials", "Community"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/80 hover:text-white py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              {walletAddress ? (
                <WalletButton />
              ) : (
                <>
                  <Button
                    onClick={handleConnectWallet}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 w-full"
                  >
                    Connect Wallet
                  </Button>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 w-full">
                      Join Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
