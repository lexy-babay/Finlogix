import { useState } from 'react';
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
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center">Add Transaction</h2>

        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        {/* Description */}
        <div className="space-y-2">
          <label className="text-gray-600 text-sm">Transaction Description</label>
          <div className="flex items-center gap-2">
            <FaTags className="text-gray-500" />
            <input
              type="text"
              placeholder="e.g., Monthly salary or utility bill"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-gray-600 text-sm">Amount (₦)</label>
          <input
            type="number"
            placeholder="e.g., 150000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Transaction Type - Click Dropdown */}
        <div className="space-y-2 relative">
          <label className="text-gray-600 text-sm">Transaction Type</label>
          <div
            onClick={() => setShowOptions(!showOptions)}
            className="w-full border rounded-md p-2 bg-white relative cursor-pointer"
          >
            <span className="text-gray-700">
              {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Select Type'}
            </span>

            {showOptions && (
              <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md z-10 mt-1">
                <div
                  onClick={() => {
                    setType('income');
                    setShowOptions(false);
                  }}
                  className="px-4 py-2 hover:bg-green-100 cursor-pointer text-green-700"
                >
                  Income
                </div>
                <div
                  onClick={() => {
                    setType('expense');
                    setShowOptions(false);
                  }}
                  className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-700"
                >
                  Expense
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-gray-600 text-sm">Transaction Date</label>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
