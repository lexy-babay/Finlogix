import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTags } from 'react-icons/fa';
import { useTransactions } from '../context/TransactionContext';

const TransactionForm = () => {
  const { dispatch } = useTransactions();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !type || !date) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: description,
      amount: parseFloat(amount),
      type,
      date,
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });

    setDescription('');
    setAmount('');
    setType('');
    setDate('');
    setSuccessMessage('Transaction added successfully!');
    setErrorMessage('');
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex justify-center items-center mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6 border border-emerald-50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Add New Transaction
        </motion.h2>

        {/* Success/Error Messages */}
        <motion.div variants={itemVariants}>
          {successMessage && (
            <motion.div 
              className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {successMessage}
            </motion.div>
          )}
          {errorMessage && (
            <motion.div 
              className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {errorMessage}
            </motion.div>
          )}
        </motion.div>

        {/* Description */}
        <motion.div className="space-y-3" variants={itemVariants}>
          <label className="text-gray-600 font-medium">Transaction Description</label>
          <div className="flex items-center gap-3 p-3 border border-emerald-100 rounded-xl focus-within:ring-2 focus-within:ring-emerald-300 focus-within:border-emerald-300 transition">
            <FaTags className="text-emerald-500 text-lg" />
            <input
              type="text"
              placeholder="e.g., Monthly salary or utility bill"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
          </div>
        </motion.div>

        {/* Amount */}
        <motion.div className="space-y-3" variants={itemVariants}>
          <label className="text-gray-600 font-medium">Amount (₦)</label>
          <div className="flex items-center gap-3 p-3 border border-emerald-100 rounded-xl focus-within:ring-2 focus-within:ring-emerald-300 focus-within:border-emerald-300 transition">
            <span className="text-emerald-500 font-bold">₦</span>
            <input
              type="number"
              placeholder="e.g., 150000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
          </div>
        </motion.div>

        {/* Transaction Type */}
        <motion.div className="space-y-3 relative" variants={itemVariants}>
          <label className="text-gray-600 font-medium">Transaction Type</label>
          <motion.div
            onClick={() => setShowOptions(!showOptions)}
            className="w-full border border-emerald-100 rounded-xl p-3 bg-white relative cursor-pointer flex items-center justify-between"
            whileTap={{ scale: 0.98 }}
          >
            <span className={`${type ? 'text-gray-700' : 'text-gray-400'}`}>
              {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Select Type'}
            </span>
            <motion.div
              animate={{ rotate: showOptions ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>

            {showOptions && (
              <motion.div 
                className="absolute top-full left-0 w-full bg-white border border-emerald-100 rounded-xl shadow-lg z-10 mt-2 overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.div
                  onClick={() => {
                    setType('income');
                    setShowOptions(false);
                  }}
                  className="px-4 py-3 hover:bg-emerald-50 cursor-pointer flex items-center gap-2 text-emerald-700 font-medium"
                  whileHover={{ backgroundColor: '#ECFDF5' }}
                >
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  Income
                </motion.div>
                <motion.div
                  onClick={() => {
                    setType('expense');
                    setShowOptions(false);
                  }}
                  className="px-4 py-3 hover:bg-rose-50 cursor-pointer flex items-center gap-2 text-rose-700 font-medium"
                  whileHover={{ backgroundColor: '#FFF1F2' }}
                >
                  <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                  Expense
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Date */}
        <motion.div className="space-y-3" variants={itemVariants}>
          <label className="text-gray-600 font-medium">Transaction Date</label>
          <div className="flex items-center gap-3 p-3 border border-emerald-100 rounded-xl focus-within:ring-2 focus-within:ring-emerald-300 focus-within:border-emerald-300 transition">
            <FaCalendarAlt className="text-emerald-500 text-lg" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Add Transaction
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default TransactionForm;