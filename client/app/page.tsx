import Hero from "@/components/hero"
import Features from "@/components/features"
import Testimonials from "@/components/testimonials"
import Community from "@/components/community"
import Services from "@/components/services"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1a0a1c] to-[#2d0a1f] text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <Community />
      <Footer />
    </main>
  )
}

