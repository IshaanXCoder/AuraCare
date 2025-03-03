"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function Services() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      title: "Coaching",
      description:
        "One-on-one coaching sessions with experienced mentors who understand the unique challenges women face in their personal and professional lives.",
      features: [
        "Personalized growth plans",
        "Weekly accountability check-ins",
        "Career transition guidance",
        "Work-life balance strategies",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Workshops",
      description:
        "Interactive group sessions focused on developing specific skills and knowledge areas essential for success in today's world.",
      features: ["Leadership development", "Financial literacy", "Public speaking", "Negotiation tactics"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Community",
      description:
        "A supportive network of like-minded women who share experiences, offer advice, and celebrate each other's successes.",
      features: ["Monthly virtual meetups", "Industry-specific groups", "Mentorship matching", "Exclusive events"],
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#1a0a1c] to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#1a0a1c] to-transparent"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Premium</span>{" "}
            Services
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Comprehensive solutions designed to support women at every stage of their journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          {tabs.map((tab, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative px-6 py-4 text-left rounded-xl transition-all duration-300 ${
                activeTab === index
                  ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30"
                  : "bg-black/20 hover:bg-black/30 border border-white/5"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <h3
                className={`text-xl font-semibold mb-1 ${
                  activeTab === index
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                    : "text-white"
                }`}
              >
                {tab.title}
              </h3>
              <p className="text-white/60 text-sm line-clamp-2">{tab.description}</p>
              {activeTab === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
                />
              )}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{tabs[activeTab].title}</h3>
                <p className="text-white/70 mb-6">{tabs[activeTab].description}</p>
                <ul className="space-y-3 mb-8">
                  {tabs[activeTab].features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                        <ChevronRight className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white/90">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 w-fit">
                  Learn More
                </Button>
              </div>
              <div className="relative h-full min-h-[300px] md:min-h-0">
                <img
                  src={tabs[activeTab].image || "/placeholder.svg"}
                  alt={tabs[activeTab].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent md:bg-gradient-to-l"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

