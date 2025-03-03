"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export default function Community() {
  return (
    <section id="community" className="py-24 relative">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#1a0a1c] to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Global</span>{" "}
              Community
            </h2>
            <p className="text-white/70 mb-8">
              Connect with thousands of ambitious women worldwide who are redefining success on their own terms. Share
              experiences, find mentors, and grow together.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                    1
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                  <p className="text-white/70">
                    Set up your personalized profile highlighting your skills, interests, and goals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                    2
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Connect with Members</h3>
                  <p className="text-white/70">Find like-minded women in your industry or with similar interests.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Access Exclusive Content</h3>
                  <p className="text-white/70">Enjoy member-only resources, events, and opportunities.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Get Early Access</h3>
                <p className="text-white/70">
                  Join our waitlist to be among the first to experience our platform and receive exclusive founding
                  member benefits.
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="bg-black/40 border-white/10 focus:border-pink-500/50 h-12"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="bg-black/40 border-white/10 focus:border-pink-500/50 h-12"
                  />
                </div>
                <div>
                  <select className="w-full h-12 rounded-md bg-black/40 border border-white/10 focus:border-pink-500/50 px-3 text-white/70">
                    <option value="">Select Your Primary Interest</option>
                    <option value="career">Career Development</option>
                    <option value="entrepreneurship">Entrepreneurship</option>
                    <option value="wellness">Wellness & Self-Care</option>
                    <option value="leadership">Leadership</option>
                    <option value="finance">Financial Independence</option>
                  </select>
                </div>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 h-12">
                  Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 text-center text-white/50 text-sm">
                By joining, you agree to our Terms of Service and Privacy Policy
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="text-white/70">
                    <span className="text-white font-medium">1,500+</span> on waitlist
                  </div>
                  <div className="text-white/70">
                    <span className="text-white font-medium">48 hours</span> until next batch
                  </div>
                </div>
                <div className="mt-3 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

