import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 shadow-lg"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 20 
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo and Title */}
        <motion.div 
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.div 
            className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-xl"
            whileHover={{ rotate: 10 }}
            animate={{ 
              rotate: [0, -5, 0, 5, 0],
              transition: { 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse" 
              } 
            }}
          >
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              F₦
            </motion.span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl font-bold tracking-tighter"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            FinLogix
          </motion.h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm sm:text-base bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-medium shadow-inner">
            Your smart finance tracker
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;