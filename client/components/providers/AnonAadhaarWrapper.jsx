'use client'

import { AnonAadhaarProvider } from "@anon-aadhaar/react"

export default function AnonAadhaarWrapper({ children }) {
  return (
    <AnonAadhaarProvider
      _appId="app_staging_12345678901234567890"
      _development={true}
    >
      {children}
    </AnonAadhaarProvider>
  )
}