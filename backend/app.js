// app.js
const express = require("express");
const {
  getTransactions,
  searchTransactions,
  paginateTransactions,
} = require("./transaction");
const { getStatistics } = require("./statistics");
const { getPieChartData } = require("./pie-chart");

const app = express();

app.get("/transactions", async (req, res) => {
  const { page = 1, perPage = 10, search } = req.query;

  let transactions;
  if (search) {
    transactions = await searchTransactions(search);
  } else {
    transactions = await getTransactions();
  }

  const paginatedTransactions = await paginateTransactions(
    transactions,
    page,
    perPage
  );

  res.json(paginatedTransactions);
});

app.get("/transactions/export", async (req, res) => {
  const transactions = await getTransactions();
  res.json(transactions);
});

app.get("/statistics", async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  try {
    const statistics = await getStatistics(month);
    res.json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
});

app.get("/statistics/export", async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  try {
    const statistics = await getStatistics(month);
    res.json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
});

const { getBarChartData } = require("./bar-chart");

app.get("/barChart", async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  try {
    const barChartData = await getBarChartData(month);
    res.json(barChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bar chart data" });
  }
});

app.get("/barChart/export", async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  try {
    const barChartData = await getBarChartData(month);
    res.json(barChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bar chart data" });
  }
});

app.get("/pieChart", async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  try {
    const pieChartData = await getPieChartData(month);
    res.json(pieChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching pie chart data" });
  }
});

app.get("/pieChart/export", async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  try {
    const pieChartData = await getPieChartData(month);
    res.json(pieChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching pie chart data" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
