"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Twitter, Facebook, Linkedin, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative pt-24 pb-12 border-t border-white/10">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#1a0a1c] to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
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
            <p className="text-white/70 mb-6">
              Empowering women to reach their full potential through community, resources, and support.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-pink-500/20 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-pink-500/20 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-pink-500/20 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-pink-500/20 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Services", "Testimonials", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {["Coaching", "Workshops", "Community", "Events", "Resources", "Courses"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3 text-white/70">
              <li>hello@elevate-women.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Empowerment Street, Suite 100, New York, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-30"></div>
          <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-white/70 mb-0">
                  Subscribe to our newsletter for the latest updates, exclusive content, and special offers.
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 h-12 rounded-md bg-black/40 border border-white/10 focus:border-pink-500/50 px-3 text-white"
                />
                <button className="h-12 px-6 rounded-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Elevate. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/50 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg hover:from-pink-600 hover:to-purple-700 transition-colors"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  )
}

