// pieChart.js
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

async function getPieChartData(month) {
  const transactions = await getTransactions();
  const monthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.transactionDate);
    return transactionDate.getMonth() === month - 1; // adjust for 0-based month index
  });

  const categories = {};
  monthTransactions.forEach((transaction) => {
    const category = transaction.category;
    if (!categories[category]) {
      categories[category] = 0;
    }
    categories[category]++;
  });

  const pieChartData = Object.keys(categories).map((category) => {
    return { label: category, value: categories[category] };
  });

  return pieChartData;
}

module.exports = {
  getPieChartData,
};
