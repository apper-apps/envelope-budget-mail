export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const parseCurrency = (value) => {
  const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
  return isNaN(numericValue) ? 0 : numericValue;
};

export const formatPercentage = (value, total) => {
  if (total === 0) return "0%";
  const percentage = (value / total) * 100;
  return `${Math.round(percentage)}%`;
};