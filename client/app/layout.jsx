import { AuthProvider } from '@/context/AuthContext'
import AnonAadhaarWrapper from '@/components/providers/AnonAadhaarWrapper'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AnonAadhaarWrapper>
            {children}
          </AnonAadhaarWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}