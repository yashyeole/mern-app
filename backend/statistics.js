// statistics.js
const axios = require("axios");

const transactionsUrl =
  "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

async function getTransactions() {
  try {
    const response = await axios.get(transactionsUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getStatistics(month) {
  const transactions = await getTransactions();
  const monthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.transactionDate);
    return transactionDate.getMonth() === month - 1; // adjust for 0-based month index
  });

  const totalSaleAmount = monthTransactions.reduce(
    (acc, transaction) => acc + transaction.price,
    0
  );
  const totalSoldItems = monthTransactions.length;
  const totalNotSoldItems = transactions.length - totalSoldItems;

  return {
    totalSaleAmount,
    totalSoldItems,
    totalNotSoldItems,
  };
}

module.exports = {
  getStatistics,
};
