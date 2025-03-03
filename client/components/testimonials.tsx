"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Joining this platform was a game-changer for my career. The coaching sessions helped me overcome imposter syndrome and negotiate a promotion I had been hesitant to pursue for years.",
      rating: 5,
    },
    {
      name: "Michelle Chen",
      role: "Tech Entrepreneur",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "The community here is unlike any other. I've found mentors, collaborators, and friends who understand the unique challenges women face in the tech industry. It's been invaluable.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Finance Professional",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "The workshops on financial literacy transformed how I approach my personal finances and career decisions. I feel empowered to take control of my financial future.",
      rating: 5,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const next = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#1a0a1c] to-transparent"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Members</span>{" "}
            Say
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Real stories from women who have transformed their lives through our platform.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      current === index ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="relative overflow-hidden min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-sm opacity-70"></div>
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-black">
                        <img
                          src={testimonials[current].image || "/placeholder.svg"}
                          alt={testimonials[current].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-pink-500 text-pink-500" />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl font-medium mb-6 italic">
                    "{testimonials[current].content}"
                  </blockquote>

                  <div>
                    <h4 className="text-lg font-semibold">{testimonials[current].name}</h4>
                    <p className="text-white/70">{testimonials[current].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

