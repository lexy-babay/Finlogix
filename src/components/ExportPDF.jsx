import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useTransactions } from '../context/TransactionContext';

const ExportPDF = () => {
  const { transactions } = useTransactions();

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('FinLogix Transaction Report', 14, 22);

    const tableColumn = ["Date", "Description", "Type", "Amount (₦)"];
    const tableRows = transactions.map(tx => ([
      tx.date,
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

  return (
    <div className="mt-6 flex justify-end px-4">
      <button
        onClick={downloadPDF}
        className=" text-white px-6 py-2 rounded-lg text-sm shadow-md transition duration-300"
      >
        
      </button>
    </div>
  );
};

export default ExportPDF;
