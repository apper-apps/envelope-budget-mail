import transactionsData from "@/services/mockData/transactions.json";

let transactions = [...transactionsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllTransactions = async () => {
  await delay(300);
  return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getTransactionById = async (id) => {
  await delay(200);
  const transaction = transactions.find(tx => tx.Id === parseInt(id));
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  return { ...transaction };
};

export const createTransaction = async (transactionData) => {
  await delay(400);
  
  const highestId = transactions.length > 0 ? Math.max(...transactions.map(tx => tx.Id)) : 0;
  const newTransaction = {
    ...transactionData,
    Id: highestId + 1,
    date: transactionData.date || new Date().toISOString()
  };
  
  transactions.push(newTransaction);
  return { ...newTransaction };
};

export const updateTransaction = async (id, transactionData) => {
  await delay(300);
  
  const index = transactions.findIndex(tx => tx.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Transaction not found");
  }
  
  transactions[index] = { 
    ...transactions[index], 
    ...transactionData,
    Id: parseInt(id)
  };
  
  return { ...transactions[index] };
};

export const deleteTransaction = async (id) => {
  await delay(300);
  
  const index = transactions.findIndex(tx => tx.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Transaction not found");
  }
  
  transactions.splice(index, 1);
  return true;
};

export const getTransactionsByCategory = async (categoryId) => {
  await delay(250);
  return transactions.filter(tx => tx.categoryId === categoryId.toString());
};

export const getTransactionsByAccount = async (accountId) => {
  await delay(250);
  return transactions.filter(tx => tx.accountId === accountId.toString());
};