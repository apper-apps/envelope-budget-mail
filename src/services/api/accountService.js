import accountsData from "@/services/mockData/accounts.json";

let accounts = [...accountsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllAccounts = async () => {
  await delay(300);
  return [...accounts];
};

export const getAccountById = async (id) => {
  await delay(200);
  const account = accounts.find(acc => acc.Id === parseInt(id));
  if (!account) {
    throw new Error("Account not found");
  }
  return { ...account };
};

export const createAccount = async (accountData) => {
  await delay(400);
  
  const highestId = accounts.length > 0 ? Math.max(...accounts.map(acc => acc.Id)) : 0;
  const newAccount = {
    ...accountData,
    Id: highestId + 1
  };
  
  accounts.push(newAccount);
  return { ...newAccount };
};

export const updateAccount = async (id, accountData) => {
  await delay(300);
  
  const index = accounts.findIndex(acc => acc.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Account not found");
  }
  
  accounts[index] = { 
    ...accounts[index], 
    ...accountData,
    Id: parseInt(id)
  };
  
  return { ...accounts[index] };
};

export const deleteAccount = async (id) => {
  await delay(300);
  
  const index = accounts.findIndex(acc => acc.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Account not found");
  }
  
  accounts.splice(index, 1);
  return true;
};