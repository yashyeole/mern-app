// transactions.js
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

async function searchTransactions(searchText) {
  const transactions = await getTransactions();
  const searchRegex = new RegExp(searchText, "i");
  return transactions.filter((transaction) => {
    return (
      searchRegex.test(transaction.productTitle) ||
      searchRegex.test(transaction.productDescription) ||
      searchRegex.test(transaction.price.toString())
    );
  });
}

async function paginateTransactions(transactions, page = 1, perPage = 10) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return transactions.slice(startIndex, endIndex);
}

module.exports = {
  getTransactions,
  searchTransactions,
  paginateTransactions,
};
