import { motion } from 'framer-motion';
import { useTransactions } from '../context/TransactionContext';

const SummaryCards = () => {
  const { transactions } = useTransactions();

  // Calculate values
  const income = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = income - expense;

  const formatNaira = (amount) =>
    `₦${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200 
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Income Card */}
      <motion.div 
        className="w-full sm:w-80 bg-white p-6 rounded-2xl shadow-xl border-t-4 border-emerald-400"
        variants={cardVariants}
        whileHover={{ 
          y: -8,
          boxShadow: "0 20px 25px -5px rgba(5, 150, 105, 0.1), 0 10px 10px -5px rgba(5, 150, 105, 0.04)"
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-100 p-3 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-md font-medium text-gray-600">Total Income</h3>
        </div>
        <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
          {formatNaira(income)}
        </p>
      </motion.div>

      {/* Expense Card */}
      <motion.div 
        className="w-full sm:w-80 bg-white p-6 rounded-2xl shadow-xl border-t-4 border-rose-400"
        variants={cardVariants}
        whileHover={{ 
          y: -8,
          boxShadow: "0 20px 25px -5px rgba(225, 29, 72, 0.1), 0 10px 10px -5px rgba(225, 29, 72, 0.04)"
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-rose-100 p-3 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-md font-medium text-gray-600">Total Expense</h3>
        </div>
        <p className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
          {formatNaira(expense)}
        </p>
      </motion.div>

      {/* Balance Card */}
      <motion.div 
        className="w-full sm:w-80 bg-white p-6 rounded-2xl shadow-xl border-t-4 border-cyan-400"
        variants={cardVariants}
        whileHover={{ 
          y: -8,
          boxShadow: "0 20px 25px -5px rgba(6, 182, 212, 0.1), 0 10px 10px -5px rgba(6, 182, 212, 0.04)"
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-cyan-100 p-3 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-md font-medium text-gray-600">Current Balance</h3>
        </div>
        <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
          {formatNaira(balance)}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SummaryCards;