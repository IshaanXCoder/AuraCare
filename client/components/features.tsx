"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { Shield, Heart, Sparkles, Users } from "lucide-react"
import { useState, useEffect, useRef } from "react";



const AnimatedNumber = ({ target }: { target: number }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // Starts when visible

  useEffect(() => {
    if (!isInView) return; // Start only when in view

    let startValue = Math.floor(target * 0.5); // Start from 50% of target
    setValue(startValue);
    
    let interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + Math.ceil(target / 50); // Increment value smoothly
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <motion.span
      ref={ref}
      className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
      animate={{ opacity: [0, 1], y: [10, 0] }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {value.toLocaleString()} {/* Format as 10,000 */}
    </motion.span>
  );
};



export default function Features() {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safe Community",
      description: "A secure and supportive environment where women can connect, share, and grow together.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Personalized Experience",
      description: "Tailored content and recommendations based on your unique goals and interests.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Exclusive Resources",
      description: "Access to premium workshops, courses, and materials designed for women's success.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Networking Opportunities",
      description: "Connect with industry leaders and like-minded women to expand your professional network.",
    },
  ]

  return (
    <section id="features" className="relative py-24">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#1a0a1c] to-transparent"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Elevate</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            We've created a platform that addresses the unique challenges women face, providing the tools and community
            needed to thrive.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transition-transform duration-300 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 flex items-center justify-center mb-4">
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Join{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  <AnimatedNumber target={10000} />
                  </span>{" "}
                  Women Who Have Transformed Their Lives
                </h3>
                <p className="text-white/70 mb-6">
                  Our platform has helped thousands of women achieve their personal and professional goals. Be part of
                  our growing community and start your journey today.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/5 rounded-full px-4 py-2 text-sm">#WomenEmpowerment</div>
                  <div className="bg-white/5 rounded-full px-4 py-2 text-sm">#PersonalGrowth</div>
                  <div className="bg-white/5 rounded-full px-4 py-2 text-sm">#Community</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                      85%
                    </div>
                    <p className="text-white/70 text-sm">Report increased confidence</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                      92%
                    </div>
                    <p className="text-white/70 text-sm">Would recommend to friends</p>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                      78%
                    </div>
                    <p className="text-white/70 text-sm">Achieved career advancement</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                      4.9
                    </div>
                    <p className="text-white/70 text-sm">Average user rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function customUseRef(arg0: null) {
  throw new Error("Function not implemented.");
}

