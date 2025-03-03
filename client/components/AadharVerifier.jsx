'use client'

import { useEffect } from 'react'
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react"

export default function AadharVerifier({ onVerificationComplete }) {
  const [anonAadhaar] = useAnonAadhaar()

  useEffect(() => {
    console.log("Anon Aadhaar status:", anonAadhaar)
    
    // Call the completion handler when successfully verified
    if (anonAadhaar.status === "logged-in") {
      onVerificationComplete()
    }
  }, [anonAadhaar, onVerificationComplete])

  return (
    <div className="space-y-4">
      <LogInWithAnonAadhaar />
      <div className="text-sm text-center">
        {anonAadhaar.status === "logged-in" && (
          <p className="text-green-500">✓ Verified</p>
        )}
      </div>
    </div>
  )
}