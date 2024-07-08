// barChart.js
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

async function getBarChartData(month) {
  const transactions = await getTransactions();
  const monthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.transactionDate);
    return transactionDate.getMonth() === month - 1; // adjust for 0-based month index
  });

  const priceRanges = [
    { label: "0 - 100", min: 0, max: 100 },
    { label: "101 - 200", min: 101, max: 200 },
    { label: "201 - 300", min: 201, max: 300 },
    { label: "301 - 400", min: 301, max: 400 },
    { label: "401 - 500", min: 401, max: 500 },
    { label: "501 - 600", min: 501, max: 600 },
    { label: "601 - 700", min: 601, max: 700 },
    { label: "701 - 800", min: 701, max: 800 },
    { label: "801 - 900", min: 801, max: 900 },
    { label: "901 - above", min: 901, max: Infinity },
  ];

  const barChartData = priceRanges.map((range) => {
    const count = monthTransactions.filter((transaction) => {
      return transaction.price >= range.min && transaction.price <= range.max;
    }).length;
    return { label: range.label, count };
  });

  return barChartData;
}

module.exports = {
  getBarChartData,
};
