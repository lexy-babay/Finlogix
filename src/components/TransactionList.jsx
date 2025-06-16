import { motion } from "framer-motion";
import { useTransactions } from '../context/TransactionContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState } from "react";
import { FiSearch, FiDownload } from "react-icons/fi";

const TransactionList = () => {
  const { transactions } = useTransactions();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).replace(',', '').replace(' ', '-');
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('FinLogix Transaction Report', 14, 22);

    const tableColumn = ["Date", "Description", "Type", "Amount (₦)"];
    const tableRows = filteredTransactions.map(tx => ([
      formatDate(tx.date),
      tx.title,
      tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
      `₦${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
    ]));

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [16, 185, 129] },
    });

    doc.save(`FinLogix_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const downloadCSV = () => {
    const headers = ["Date", "Description", "Type", "Amount (₦)"];
    const rows = filteredTransactions.map(tx => [
      formatDate(tx.date),
      tx.title,
      tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
      `₦${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
    ]);

    const csvContent = [headers, ...rows]
      .map(e => e.map(field => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `FinLogix_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 120
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.3)"
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div 
      className="p-6 bg-white rounded-3xl shadow-xl max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <motion.h3 
          className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Transaction History
        </motion.h3>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <motion.div 
            className="relative w-full sm:w-72"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 bg-emerald-50"
            />
            <FiSearch className="absolute left-4 top-3.5 text-emerald-500 text-xl" />
          </motion.div>
          
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiDownload className="text-emerald-600" />
              <span>PDF</span>
            </motion.button>
            <motion.button
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-3 rounded-xl text-sm font-medium"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiDownload />
              <span>CSV</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiSearch className="text-emerald-600 text-3xl" />
          </div>
          <h4 className="text-xl font-medium text-gray-700">No transactions found</h4>
          <p className="text-gray-500 mt-2">Try adjusting your search or add new transactions</p>
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTransactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              className={`flex justify-between items-start p-5 rounded-2xl shadow-sm transition-all duration-300 ${
                transaction.type === 'income'
                  ? 'bg-emerald-50 border-l-4 border-emerald-400'
                  : 'bg-rose-50 border-l-4 border-rose-400'
              }`}
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div className="flex gap-4">
                <div className={`p-3 rounded-xl ${
                  transaction.type === 'income' 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : 'bg-rose-100 text-rose-600'
                }`}>
                  {transaction.type === 'income' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{transaction.title}</span>
                  <span className="text-sm text-gray-500 mt-1">{formatDate(transaction.date)}</span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span
                  className={`text-xl font-bold ${
                    transaction.type === 'income' 
                      ? 'text-emerald-700' 
                      : 'text-rose-700'
                  }`}
                >
                  {transaction.type === 'income'
                    ? `+₦${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                    : `-₦${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full mt-1 ${
                  transaction.type === 'income'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {transaction.type === 'income' ? 'Income' : 'Expense'}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TransactionList;