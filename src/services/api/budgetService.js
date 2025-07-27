import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllCategories = async () => {
  await delay(300);
  return [...categories];
};

export const getCategoryById = async (id) => {
  await delay(200);
  const category = categories.find(cat => cat.Id === parseInt(id));
  if (!category) {
    throw new Error("Category not found");
  }
  return { ...category };
};

export const createCategory = async (categoryData) => {
  await delay(400);
  
  const highestId = categories.length > 0 ? Math.max(...categories.map(cat => cat.Id)) : 0;
  const newCategory = {
    ...categoryData,
    Id: highestId + 1,
    spent: 0,
    createdAt: new Date().toISOString()
  };
  
  categories.push(newCategory);
  return { ...newCategory };
};

export const updateCategory = async (id, categoryData) => {
  await delay(300);
  
  const index = categories.findIndex(cat => cat.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Category not found");
  }
  
  categories[index] = { 
    ...categories[index], 
    ...categoryData,
    Id: parseInt(id)
  };
  
  return { ...categories[index] };
};

export const deleteCategory = async (id) => {
  await delay(300);
  
  const index = categories.findIndex(cat => cat.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Category not found");
  }
  
  categories.splice(index, 1);
  return true;
};

export const getBudgetSummary = async () => {
  await delay(250);
  
  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalIncome = 4000; // Mock income
  const remaining = totalIncome - totalAllocated;
  
  return {
    totalIncome,
    totalAllocated,
    totalSpent,
    remaining,
    categoryCount: categories.length
  };
};