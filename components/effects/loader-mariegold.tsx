"use client"

import { motion } from "framer-motion"

export default function LoaderMarigold() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/60 backdrop-blur-sm">
      <motion.svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        initial="hidden"
        animate="show"
        aria-label="Loading"
        role="status"
      >
        {/* center */}
        <motion.circle
          cx="48"
          cy="48"
          r="8"
          fill="#f59e0b"
          variants={{ hidden: { scale: 0.6, opacity: 0.6 }, show: { scale: 1, opacity: 1 } }}
          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
        />
        {/* petals */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const x = 48 + Math.cos(angle) * 20
          const y = 48 + Math.sin(angle) * 20
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="6"
              fill="#2563eb"
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, delay: i * 0.05, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          )
        })}
      </motion.svg>
    </div>
  )
}
