"use client";

import { motion } from "framer-motion";
import { FaMoneyBillWave, FaLock, FaArrowRight } from "react-icons/fa";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <main>
      
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden min-h-screen flex items-center justify-center px-6">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl top-10 left-10"
        animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-300/10 rounded-full blur-3xl bottom-10 right-10"
        animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Empowering Your Dreams with{" "}
          <span className="text-yellow-400">Fast & Secure Loans</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-blue-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Whether it’s for your business, education, or personal goals — we make
          financing simple, transparent, and accessible for all South Africans.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="flex items-center gap-2 bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition">
            <FaMoneyBillWave /> Apply Now
          </button>
          <button className="flex items-center gap-2 border border-white/50 px-6 py-3 rounded-lg hover:bg-white/10 transition">
            <FaLock /> Learn More
          </button>
        </motion.div>

        {/* Small Note */}
        <motion.p
          className="mt-8 text-sm text-blue-100/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Trusted by over <span className="text-yellow-400 font-semibold">50,000</span> South Africans nationwide.
        </motion.p>
      </div>
    </section>
  

    </main>
  );
}
