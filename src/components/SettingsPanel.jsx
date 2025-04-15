import { useTransactions } from '../context/TransactionContext';

const SettingsPanel = () => {
  const { dispatch } = useTransactions();

  const clearAllTransactions = () => {
    const confirmed = window.confirm("Are you sure you want to delete all transactions?");
    if (confirmed) {
      dispatch({ type: 'CLEAR_TRANSACTIONS' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Settings & Preferences</h2>

      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-gray-700 text-sm">Clear all transactions</span>
        <button
          onClick={clearAllTransactions}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm shadow-md transition"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
