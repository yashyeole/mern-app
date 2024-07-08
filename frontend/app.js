const { useState, useEffect } = require("react");
const React = require("react");
const axios = require("axios");

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchTransactions = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/transactions?month=${selectedMonth}&page=${page}&search=${searchQuery}`
      );
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/statistics?month=${selectedMonth}`
      );
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/bar-chart?month=${selectedMonth}`
      );
      setBarChartData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  const fetchPieChartData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/pie-chart?month=${selectedMonth}`
      );
      setPieChartData(response.data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
    fetchPieChartData();
  }, [selectedMonth, searchQuery]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTransactions(page);
  };
  const htmlstring = `
  <div className="container">
      <h1>Transaction Dashboard</h1>

      <div className="controls">
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search transaction..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <h2>Transactions Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>
                <img src={transaction.image} alt={transaction.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <h2>Transactions Statistics</h2>
      <div className="statistics">
        <p>Total Sale: {statistics.totalSale}</p>
        <p>Total Sold Item: {statistics.totalSoldItem}</p>
        <p>Total Not Sold Item: {statistics.totalNotSoldItem}</p>
      </div>

      <h2>Transactions Bar Chart</h2>
      <div className="bar-chart">
        {/* Implement bar chart using your preferred charting library */}
      </div>

      <h2>Transactions Pie Chart</h2>
      <div className="pie-chart">
        {/* Implement pie chart using your preferred charting library */}
      </div>
    </div>
  `;
  return htmlstring;
};
