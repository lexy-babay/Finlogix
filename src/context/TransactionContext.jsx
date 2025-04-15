import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create context
const TransactionContext = createContext();

// Define actions
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';

// Reducer function
const transactionReducer = (state, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return [...state, action.payload];
    case REMOVE_TRANSACTION:
      return state.filter(tx => tx.id !== action.payload);
    default:
      return state;
  }
};

// TransactionProvider component
export const TransactionProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(transactionReducer, [], () => {
    // Load transactions from localStorage on initial load
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // Save transactions to localStorage whenever the transactions state changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  return (
    <TransactionContext.Provider value={{ transactions, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};

// Custom hook to use the transaction context
export const useTransactions = () => useContext(TransactionContext);
