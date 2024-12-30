import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { motion } from "framer-motion";
import { fixedHeight, fixedWidth } from "../../Functions";
import ContextVariables from "../../context/ContextVariables";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import MiniGraph from "../Other/MiniGraph";
import AuthContext from "../../context/AuthContext";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  background: linear-gradient(
    -45deg,
    hsl(288.75, 32.78688524590165%, 52.156862745098046%),
    hsl(289.0909090909091, 45.833333333333336%, 81.17647058823529%)
  );
  overflow: hidden;
  height: auto;
  padding: 0 ${fixedHeight(1.25)}px ${fixedHeight(1.25)}px;

  > .up {
    width: 100%;
    height: ${fixedHeight(7.5)}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.25%;
    > .labels {
      width: auto;
      display: flex;
      align-items: center;
      column-gap: ${fixedWidth(1.5)}px;
      > label {
        font-size: ${fixedHeight(1.75)}px;
        display: flex;
        align-items: center;
        column-gap: ${fixedWidth(0.25)}px;
        &:nth-child(1),
        &:nth-child(2) {
          > input {
            width: ${fixedWidth(15)}px;
            height: ${fixedHeight(4)}px;
            border-radius: 100px;
            padding: 0 2.5%;
            font-size: ${fixedHeight(1.5)}px;
          }
        }
        &:nth-child(3) {
          > input {
            width: ${fixedHeight(2.5)}px;
            height: ${fixedHeight(2.5)}px;
            border: none;
            outline: none;
            &:checked {
              /* &::before {
                background: hsl(288.75, 40%, 30%) !important;
              } */
            }
          }
        }
      }
    }
  }
`;

const CryptoTable = styled.div`
  width: 100%;
  height: auto;
  border-collapse: collapse;
  margin: 0px 0;
  display: flex;
  flex-direction: column;
  row-gap: ${fixedHeight(1.25)}px;
  > .thead {
    width: 100%;
    overflow: hidden;
    display: flex;
    height: ${fixedHeight(5)}px;
    background: hsl(288.75, 40%, 30%);
    border-radius: 15px;
    > .tr {
      width: 100%;
      display: flex;
    }
  }
  > .tbody {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: ${fixedHeight(1.25)}px;
    > .tr {
      width: 95%;
      display: flex;
      align-items: center;
      border: 1px solid red;
      &:hover {
        scale: 0 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none; /* Hide the table on small screens */
  }
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
  gap: 10px;
  margin: 0px 0;
  > p {
    font-size: ${fixedHeight(1.75)}px;
    color: white;
  }

  button {
    width: ${fixedHeight(4)}px;
    height: ${fixedHeight(4)}px;
    border-radius: 50%;
    border: none;
    background: hsl(288.75, 40%, 30%);
    color: white;
    cursor: pointer;
    box-shadow: 0 1px 5px rgba(252, 214, 116, 0.6),
      0 2px 10px rgba(107, 74, 133, 0.4);
    transition: 125ms ease-in-out;
    &:hover {
      background: linear-gradient(
        135deg,
        hsl(40.7, 90.6%, 49.8%),
        hsl(41, 90%, 75%)
      );
    }
    > ion-icon {
      font-size: ${fixedHeight(2)}px;
    }
  }
`;

const CryptoCardContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  color: white;
  padding: 0 ${fixedWidth(0.5)}px;
  font-size: ${fixedHeight(1.75)}px;
  &:nth-child(1) {
    width: 5%;
    justify-content: center;
  }
  &:nth-child(2) {
    width: 25%;
  }
  &:nth-child(3) {
    width: 10%;
  }
  &:nth-child(4) {
    width: 15%;
  }
  &:nth-child(5) {
    width: 10%;
  }
  &:nth-child(6) {
    width: 20%;
  }
  &:nth-child(7) {
    width: 15%;
  }
`;

const TableRow = motion(styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${fixedHeight(5)}px;
  border-radius: 15px !important;
  transition: 125ms ease-in-out;
  &:hover {
    background: #ddb9e5;
  }
`);

const TableCell = styled.div`
  border-right: 1px solid hsl(288.75, 40%, 30%);
  height: 100%;
  padding: 0 ${fixedWidth(0.5)}px;
  font-size: ${fixedHeight(1.75)}px;
  display: flex;
  align-items: center;
  > img {
    width: ${fixedHeight(3)}px;
    height: ${fixedHeight(3)}px;
    object-fit: contain;
  }
  > .MiniGraph {
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
  }
  &:last-child {
    border-right: 1px solid #ddd0;
  }

  &:nth-child(1) {
    width: 5%;
    justify-content: center;
  }
  &:nth-child(2) {
    width: 25%;
  }
  &:nth-child(3) {
    width: 10%;
  }
  &:nth-child(4) {
    width: 15%;
  }
  &:nth-child(5) {
    width: 10%;
  }
  &:nth-child(6) {
    width: 20%;
  }
  &:nth-child(7) {
    width: 15%;
  }
  @media (max-width: 768px) {
    display: none; /* Hide specific columns on small screens */
  }
`;

const CryptoCard = motion(styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0px;
  background: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`);

const Button = styled.button`
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const CardButton = styled(Button)`
  margin-top: 0px;
  width: 100%; /* Full-width buttons in cards */
`;

const CryptoDataTable = () => {
  const {authInfo} = useContext(AuthContext);
  const { setAllCoins, allCoins } = useContext(ContextVariables);

  const [sortConfig, setSortConfig] = useState({
    key: "transactionId",
    direction: "asc",
  });
  const [filters, setFilters] = useState({
    minAmount: 0,
    positiveChange: false,
  });
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      const username = authInfo?.username;
      console.log(username);

      const response = await fetch(
        `http://localhost:9090/optimus/v1/api/orders/list/${username}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "your-api-key",
            Authorization: "Bearer " + authInfo?.token,
          },
        }
      );

      if (response.status === 401) {
        // window.localStorage.clear();
        // window.location.href = "/auth/login";
      }

      if (response.ok) {
        const data = await response.json();
        setAllCoins(data);
      } else {
        // window.localStorage.clear();
        // window.location.href = "/auth/login";
      }
    };

    fetchTransactions();
  }, [setAllCoins]);

  const sortedData = [...allCoins].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (direction === "asc") {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });

  const filteredData = sortedData.filter((transaction) => {
    const meetsAmount = transaction.amountGHS >= filters.minAmount;
    const matchesSearch =
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.crypto.toLowerCase().includes(searchTerm.toLowerCase());
    return meetsAmount && matchesSearch;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <TableContainer>
      <div className="up">
        <div className="labels">
          <label>
            Find transaction:
            <input
              type="search"
              name="searchTerm"
              value={searchTerm}
              placeholder="Search transaction"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <label>
            Min Amount:
            <input
              type="number"
              name="minAmount"
              value={filters.minAmount}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <PaginationControls>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>
          <p>{currentPage}</p>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </PaginationControls>
      </div>
      <CryptoTable>
        <div className="thead">
          <div className="tr">
            <TableHeader onClick={() => handleSort("transactionId")}>Transaction ID</TableHeader>
            <TableHeader onClick={() => handleSort("crypto")}>Crypto</TableHeader>
            <TableHeader onClick={() => handleSort("address")}>Address</TableHeader>
            <TableHeader onClick={() => handleSort("amountGHS")}>Amount (GHS)</TableHeader>
            <TableHeader onClick={() => handleSort("cryptoAmount")}>Crypto Amount</TableHeader>
            <TableHeader onClick={() => handleSort("rate")}>Rate</TableHeader>
            <TableHeader onClick={() => handleSort("status")}>Status</TableHeader>
            <TableHeader onClick={() => handleSort("createdAt")}>Created At</TableHeader>
          </div>
        </div>
        <motion.div
          className="tbody"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {paginatedData.map((transaction) => (
            <TableRow key={transaction.transactionId} variants={tableRowVariants}>
              <TableCell>{transaction.transactionId}</TableCell>
              <TableCell>{transaction.crypto.toUpperCase()}</TableCell>
              <TableCell>{transaction.address.toUpperCase()}</TableCell>
              <TableCell>{transaction.amountGHS.toFixed(2).toUpperCase()}</TableCell>
              <TableCell>{transaction.cryptoAmount.toLocaleString().toUpperCase()}</TableCell>
              <TableCell>{transaction.rate.toLocaleString().toUpperCase()}</TableCell>
              <TableCell>{transaction.status.toUpperCase()}</TableCell>
              <TableCell>{transaction.createdAt}</TableCell>
            </TableRow>
          ))}
        </motion.div>
      </CryptoTable>
    </TableContainer>
  );
};


export default CryptoDataTable;
