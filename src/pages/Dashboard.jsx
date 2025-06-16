import { motion } from "framer-motion";
import Header from '../components/Header';
import SummaryCards from '../components/SummaryCards';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-white"
    >
      <Header />
      
      <motion.main 
        className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <SummaryCards />
        </motion.div>

        <motion.div 
          className="flex flex-col lg:flex-row gap-6"
          variants={itemVariants}
        >
          <motion.div 
            className="w-full lg:w-2/5"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <TransactionForm />
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-3/5"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <TransactionList />
          </motion.div>
        </motion.div>
      </motion.main>
      
      <motion.footer 
        className="py-6 text-center text-gray-600 text-sm border-t border-emerald-100 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} FinLogix. All rights reserved.</p>
          <p className="mt-1">Track your finances smarter, live better.</p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Dashboard;