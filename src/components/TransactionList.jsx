import { motion } from "framer-motion";
import { useTransactions } from '../context/TransactionContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

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
      headStyles: { fillColor: [33, 150, 243] },
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

  return (
    <div className="transaction-history p-4 bg-gray-50 rounded-xl shadow-md max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center sm:text-left">
          Transaction History
        </h3>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      {filteredTransactions.map((transaction) => (
        <motion.div
          key={transaction.id}
          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 mb-4 rounded-lg transition-shadow duration-300 ease-in-out transform ${
            transaction.type === 'income'
              ? 'bg-green-50 border-l-4 border-green-500'
              : 'bg-red-50 border-l-4 border-red-500'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col mb-2 sm:mb-0">
            <span className="font-medium text-lg text-gray-800">{transaction.title}</span>
            <span className="text-sm text-gray-600">{formatDate(transaction.date)}</span>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <span
              className={`text-xl font-semibold ${
                transaction.type === 'income' ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {transaction.type === 'income'
                ? `+₦${transaction.amount.toFixed(2)}`
                : `-₦${transaction.amount.toFixed(2)}`}
            </span>
            <span className="text-xs text-gray-500">
              {transaction.type === 'income' ? 'Income' : 'Expense'}
            </span>
          </div>
        </motion.div>
      ))}

      <div className="mt-6 flex flex-col sm:flex-row justify-end items-center gap-3 px-4">
        <button
          onClick={downloadPDF}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm shadow-md transition duration-300"
        >
          Download PDF
        </button>
        <button
          onClick={downloadCSV}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm shadow-md transition duration-300"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default TransactionList;
