import { motion } from 'framer-motion'
import { GiDeathSkull } from 'react-icons/gi'

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="text-6xl text-accent"
      >
        <GiDeathSkull />
      </motion.div>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute mt-20 text-text-secondary uppercase font-bold tracking-widest"
      >
        LOADING METAL FORGE...
      </motion.div>
    </div>
  )
}

export default LoadingSpinner
