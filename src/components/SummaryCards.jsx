import { useTransactions } from '../context/TransactionContext';

const SummaryCards = () => {
  const { transactions } = useTransactions();

  const income = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = income - expense;

  const formatNaira = (amount) =>
    `₦${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  const cardClass = (color) =>
    `border-l-4 border-${color}-500 bg-white p-6 rounded-xl w-full sm:w-80 shadow-md transition duration-300`;

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
      <div className={cardClass('green')}>
        <h3 className="text-md font-medium text-gray-600 mb-2">Total Income</h3>
        <p className="text-2xl font-bold text-green-600">{formatNaira(income)}</p>
      </div>

      <div className={cardClass('red')}>
        <h3 className="text-md font-medium text-gray-600 mb-2">Total Expense</h3>
        <p className="text-2xl font-bold text-red-600">{formatNaira(expense)}</p>
      </div>

      <div className={cardClass('blue')}>
        <h3 className="text-md font-medium text-blue-600 mb-2">Current Balance</h3>
        <p className="text-2xl font-bold text-blue-500">{formatNaira(balance)}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
