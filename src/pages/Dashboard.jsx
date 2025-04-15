import Header from '../components/Header';
import SummaryCards from '../components/SummaryCards';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import ExportPDF from '../components/ExportPDF';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <main className="p-6 space-y-6">
        <SummaryCards />

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/2">
            <TransactionForm />
          </div>
          <div className="w-full sm:w-1/2">
            <TransactionList />
          </div>
        </div>

        <ExportPDF />
      </main>
    </div>
  );
};

export default Dashboard;
