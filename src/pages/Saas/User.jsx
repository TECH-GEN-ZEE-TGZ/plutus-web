import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import CryptoDataTable from "../../components/DaTAble/DaTAble";
import SaasNav from "../../components/Navbar/SaasNav";
import { StyledUser } from "./SaasStyles";
import ContextVariables from "../../context/ContextVariables";
import { useContext, useEffect, useState } from "react";
import I1 from "../../assets/img/img3.jpeg";
import I2 from "../../assets/img/img5.jpeg";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import Settings from "../Other/Settings";
import Redeem from "../Other/Redeem";
import Support from "../Other/Support";
import MiniGraph from "../../components/Other/MiniGraph";
import Notifs from "../../components/Other/Notifs";
// import * as bitcoin from "bitcoinjs-lib";

const User = () => {
  const { authInfo, fetchUserRest } = useContext(AuthContext);
  const { allNotifs } = useContext(ContextVariables);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authInfo?.token) {
      navigate("/auth/login");
    } else {
      fetchUserRest();
    }

    return;
  }, [authInfo?.token]);

  return (
    <StyledUser scrollable>
      <SaasNav />
      <AnimatePresence>{allNotifs?.length > 0 && <Notifs />}</AnimatePresence>

      <div className="routes scrollable">
        <Routes>
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </div>
    </StyledUser>
  );
};

export default User;

const Dashboard = () => {
  const { setAllCoins, allCoins } = useContext(ContextVariables);
  const { authInfo } = useContext(AuthContext);

  const [recentNotifs, setRecentNotifs] = useState([
    { type: "send" },
    { type: "send" },
    { type: "send" },
    { type: "send" },
    { type: "send" },
    { type: "send" },
    { type: "send" },
    { type: "send" },
  ]);

  const [onTab, setOnTab] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const allowedCoins = ["btc", "ltc", "usdt", "xmr"];

  const filteredCoins = allCoins.filter(
    (coin) =>
      allowedCoins.includes(coin.symbol.toLowerCase()) && // Include only allowed coins
      (coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Match by name
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())) // Match by symbol
  );

  return (
    <section id="dashboard">
      <div className="trades">
        <div className="slab">
          <div className="balance">
            <div className="icon center">
              <ion-icon name="people-outline"></ion-icon>
            </div>
            <div className="text">
              <h5>Total Referrals</h5>
              <h3>{authInfo?.totalReferrals | 0}</h3>
            </div>
            <div className="icon center">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
            <div className="text">
              <h5>Accrued Balance</h5>
              <h3>${authInfo?.accruedBalance | 0.0}</h3>
            </div>
            <div className="icon center">
              <ion-icon name="wallet-outline"></ion-icon>
            </div>
            <div className="text">
              <h5>Available Balance</h5>
              <h3>${authInfo?.balance | 0.0}</h3>
            </div>
          </div>
          <div className="otherIcons">
            <button
              onClick={() => setOnTab(onTab === "redeem" ? "" : "redeem")}
              className="redeem"
            >
              <ion-icon name="ticket"></ion-icon>
            </button>
            <button
              onClick={() => setOnTab(onTab === "support" ? "" : "support")}
              className="support"
            >
              <i className="bx bx-support bx-tada"></i>
            </button>
            <button
              onClick={() => setOnTab(onTab === "settings" ? "" : "settings")}
              className="settings"
            >
              <ion-icon name="cog"></ion-icon>
            </button>
          </div>
          <AnimatePresence>
            {onTab && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="tabs"
              >
                <div className="tab">
                  {onTab === "settings" ? (
                    <Settings />
                  ) : onTab === "redeem" ? (
                    <Redeem />
                  ) : onTab === "support" ? (
                    <Support />
                  ) : (
                    <></>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="top">
        <div className="left">
          <div className="title al-c">
            <h3>Coin Updates</h3>
          </div>
          <ul className="scrollable">
            {filteredCoins?.map((coin, index) => (
              <li>
                <div className="icon center">
                  {/* <i className="bx bx-download"></i> */}
                  <img src={coin?.image} alt="" />
                </div>
                <div className="info">
                  <h3>{coin?.name}</h3>
                  <h5>
                    Market Cap:{" "}
                    <span>${coin?.market_cap?.toLocaleString()}</span>
                  </h5>
                  <h5>
                    Price: <span>${coin?.current_price?.toLocaleString()}</span>
                  </h5>
                  <motion.h5
                    style={{
                      color:
                        coin?.price_change_percentage_24h > 0 ? "green" : "red",
                    }}
                  >
                    24h% Change:{" "}
                    <span>
                      {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                  </motion.h5>
                  <p>7 DAYS TREND:</p>
                  <MiniGraph data={coin?.sparkline_in_7d?.price} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mid">
          <div className="title al-c">
            <h3>Information Updates</h3>
          </div>
          <div className="slab">
            <div className="left">
              <img src={I1} alt="" />
              <div className="txt">
                <h1>The latest Upcoming News</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  consequuntur velit natus, quas nisi sunt.
                </p>
              </div>
            </div>
            <div className="right">
              <ul className="scrollable">
                {recentNotifs?.map((notif, index) => (
                  <li>
                    <div className="icon center">
                      {/* <i className="bx bx-download"></i> */}
                      <img src={I2} alt="" />
                    </div>
                    <div className="info">
                      <h3>Crypto convert christmas exclusive!!!</h3>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Est, atque!
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="title al-c">
            <div className="bar">
              <NavLink to={"./buy"}>Buy</NavLink>
              <NavLink to={"./hash"}>Hash</NavLink>
              {/* <NavLink to={"./calculate"}>Calculate</NavLink> */}
            </div>
          </div>
          <Routes>
            <Route path="/buy" element={<Buy allCoins={allCoins} />} />
            <Route path="/hash" element={<Hash allCoins={allCoins} />} />
            {/* <Route
              path="/calculate"
              element={<Calculate allCoins={allCoins} />}
            /> */}
          </Routes>
        </div>
      </div>
      <div className="bottom center">
        <CryptoDataTable />
      </div>
    </section>
  );
};

// <i class='bx bx-download' ></i>
// <i class='bx bx-upload'></i>
// <ion-icon name="swap-horizontal-outline"></ion-icon>

const Buy = ({ allCoins }) => {
  const { domain, addNotification } = useContext(ContextVariables);
  const ghsRate = 15.6;
  const fees = {
    btc: 10,
    usdt: 5,
    ltc: 3,
    xmr: 3,
  };

  const myCurrencies = [
    {
      symbol: "GHS",
      name: "Ghana Cedis",
      image:
        "https://e7.pngegg.com/pngimages/220/170/png-clipart-flag-of-ghana-gold-coast-flag-of-belgium-sarawati-miscellaneous-flag-thumbnail.png",
    },
    {
      symbol: "USD",
      name: "United States Dollars",
      image:
        "https://e7.pngegg.com/pngimages/649/983/png-clipart-flag-of-the-united-states-national-flag-flag-of-vietnam-usa-flag-flag-of-america-illustration-blue-angle-thumbnail.png",
    },
  ];

  const allowedCoins = ["btc", "ltc", "usdt", "xmr"];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCoins = allCoins.filter(
    (coin) =>
      allowedCoins.includes(coin.symbol.toLowerCase()) && // Include only allowed coins
      (coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Match by name
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())) // Match by symbol
  );

  const [buying, setBuying] = useState(filteredCoins[0]);
  const [selBuy, setSelBuy] = useState(false);

  const [payWith, setPayWith] = useState(myCurrencies[0]);
  const [selPay, setSelPay] = useState(false);
  const [exPay, setExPay] = useState(false);
  const [exBuy, setExBuy] = useState(false);

  const [buyFee, setBuyFee] = useState(0);
  const [exRate, setExRate] = useState(0);
  const [buyVal, setBuyVal] = useState(1);
  const [payVal, setPayVal] = useState(0);
  const [payWal, setPayWal] = useState("");

  const [chooseWallet, setChooseWallet] = useState(false);
  const [addWallet, setAddWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const [wallets, setWallets] = useState(() => {
    const savedWallets = localStorage.getItem("wallets");
    return savedWallets ? JSON.parse(savedWallets) : [];
  });

  const handleWalletAdd = async (e) => {
    e.preventDefault();

    if (
      !(await validateCryptoWallet(
        buying?.symbol?.toLowerCase(),
        walletAddress
      ))
    ) {
      // alert(`Invalid wallet address!`);
      addNotification("Error", `Invalid wallet address!`);
      return;
    }

    if (!walletAddress.trim()) {
      // alert("Please enter a valid wallet address.");
      addNotification("Error", `Please enter a valid wallet address.`);
      return;
    }

    // Check for duplicates
    if (wallets.includes(walletAddress)) {
      // alert("Wallet address already exists!");
      addNotification("Error", `Wallet address already exists!`);
      return;
    }

    // Add the new wallet address to the array
    const updatedWallets = [...wallets, walletAddress];
    // setWallets(updatedWallets);
    setPayWal(walletAddress);
    // alert("Wallet address successfully verified!");
    addNotification("Success", `Wallet address successfully verified!`);

    // Save to localStorage
    // localStorage.setItem("wallets", JSON.stringify(updatedWallets));

    // Reset input and close the form
    setWalletAddress("");
    setAddWallet(false);
  };

  const getExchangeRateP = async (coin) => {
    if (payVal < 1) {
      return;
    }

    const feeAmtUSD = coin ? parseFloat(fees[coin.toLowerCase()]) : 0;
    const feeAmtGhs = feeAmtUSD * ghsRate;
    setExBuy(true);

    if (payWith?.symbol?.toUpperCase() === "GHS" && payVal < feeAmtGhs + 100) {
      // alert(`Minimum ghs amount to buy is ${feeAmtGhs + 100}`);
      addNotification(
        "Error",
        `Minimum ghs amount to buy is ${feeAmtGhs + 100}`
      );
      setPayVal(feeAmtGhs + 100);
      setBuyVal(0);
      setExBuy(false);
      return;
    } else if (
      payWith?.symbol?.toUpperCase() === "USD" &&
      payVal < feeAmtUSD + 5
    ) {
      // alert(`Minimum usd amount to buy is ${feeAmtUSD + 5}`);
      addNotification("Error", `Minimum usd amount to buy is ${feeAmtUSD + 5}`);
      setPayVal(feeAmtUSD + 5);
      setBuyVal(0);
      setExBuy(false);
      return;
    }

    try {
      if (coin) {
        const response = await axios.get(
          `${domain}/optimus/v1/api/cryptomus/exchange-rate/${coin}?to=USD`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": "your-api-key",
            },
          }
        );

        const exchangeRate = parseFloat(
          response?.data?.result[0]?.course
        ).toFixed(2);
        setExRate(exchangeRate);
        if (exchangeRate) {
          if (payWith.symbol === "GHS") {
            const ghsAmount = payVal > 0 ? payVal - feeAmtGhs : 0;
            setBuyVal((ghsAmount / ghsRate / exchangeRate).toFixed(8));
          } else {
            const usdAmount = payVal > 0 ? payVal - feeAmtUSD : 0;
            setBuyVal((usdAmount / exchangeRate).toFixed(8));
          }
        } else {
          // alert("Response doesn't contain exchange rate!");
          setBuyVal(0);
        }
      }
    } catch (error) {
      // alert("Error fetching exchange rate!");
      addNotification("Error", "Error fetching exchange rate!");
      setBuyVal(0);
    } finally {
      setExBuy(false);
    }
  };

  const getExchangeRateB = async (coin) => {
    setExPay(true);

    try {
      if (coin) {
        // Fetch exchange rate for the specified coin
        const response = await axios.get(
          `${domain}/optimus/v1/api/cryptomus/exchange-rate/${coin}?to=USD`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": "your-api-key",
            },
          }
        );

        // Extract and parse the exchange rate
        const exchangeRate = parseFloat(
          response?.data?.result[0]?.course
        ).toFixed(2);
        setExRate(exchangeRate);

        if (exchangeRate) {
          // Calculate fees and payVal
          const feeAmtUSD = coin ? parseFloat(fees[coin.toLowerCase()]) : 0;
          const feeAmtGhs = feeAmtUSD * ghsRate;

          if (payWith.symbol === "GHS") {
            const ghsAmount =
              buyVal > 0 && buyVal * exchangeRate * ghsRate.toFixed(2);
            setPayVal((ghsAmount + feeAmtGhs).toFixed(2));
          } else if (payWith.symbol === "USD") {
            const usdAmount = buyVal > 0 ? parseFloat((buyVal * exchangeRate).toFixed(8)) : 0;
            setPayVal((usdAmount + feeAmtUSD).toFixed(2));
          }
        } else {
          // Handle missing exchange rate
          setPayVal(0);
        }
      }
    } catch (error) {
      // Handle fetch errors
      console.log(error);
      addNotification("Error", error.message);
      setPayVal(0);
    } finally {
      setExPay(false);
    }
  };

  const validateMoneroAddress = async (address) => {
    if (
      (address.length === 95 &&
        (address.startsWith("4") || address.startsWith("8"))) ||
      (address.length === 106 && address.startsWith("4"))
    ) {
      return true; // Valid address
    } else {
      return false; // Invalid address
    }
  };

  const validateLitecoinAddress = async (address) => {
    if (
      (address.length === 34 &&
        (address.startsWith("M") ||
          address.startsWith("L") ||
          address.startsWith("3"))) ||
      (address.length === 43 && address.startsWith("l"))
    ) {
      return true; // Valid address
    } else {
      return false; // Invalid address
    }
  };

  const validateUsdtTrc20Address = async (address) => {
    if (address.startsWith("T") && address.length === 34) {
      return true; // Valid address
    } else {
      return false; // Invalid address
    }
  };

  const validateBitcoinAddress = async (address) => {
    try {
      // Validate Bitcoin address
      bitcoin.address.toOutputScript(address);
      return true; // Valid address
    } catch (error) {
      return false; // Invalid address
    }
  };

  const validateCryptoWallet = async (cryptoType, walletAddress) => {
    switch (cryptoType) {
      case "btc":
        return await validateBitcoinAddress(walletAddress);
      case "ltc":
        return await validateLitecoinAddress(walletAddress);
      case "usdt":
        return await validateUsdtTrc20Address(walletAddress);
      case "xmr":
        return await validateMoneroAddress(walletAddress);
      default:
        return false; // Unsupported crypto type
    }
  };

  const buyCryptoCoin = async () => {
    try {
      if (
        !buying?.symbol?.toLowerCase() &&
        payVal === 0 &&
        payWal?.length === 0 &&
        buyVal === 0
      ) {
        alert("Invalid Form inputs");
      } else {
        alert(`${buying?.symbol?.toLowerCase()} ${payVal} ${payWal} ${buyVal}`);
      }
    } catch (error) {
      alert("Invalid Form inputs");
    }
  };

  useEffect(() => {
    setBuying(filteredCoins[0]);
  }, [allCoins]);

  useEffect(() => {
    getExchangeRateP(buying?.symbol?.toLowerCase());
    getExchangeRateB(buying?.symbol?.toLowerCase());
  }, [buying]);

  useEffect(() => {
    setBuyFee(fees[buying?.symbol?.toLowerCase()]);
  }, [buying]);

  return (
    <>
      {/* Pay With Section */}
      <div className="opt">
        <h4>You Pay</h4>
        <div className="select">
          <div className="selector center">
            <div
              className="val"
              onClick={() => {
                setSelPay(!selPay);
              }}
            >
              <img src={payWith?.image} alt="" />
              <p>{payWith?.symbol?.toUpperCase()}</p>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <AnimatePresence>
              {selPay && (
                <motion.ul
                  initial={{ opacity: 0, y: "-5%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "0%" }}
                  className="options scrollable"
                >
                  {/* Search Input */}
                  <form>
                    <input
                      type="search"
                      placeholder="Search by name or symbol"
                      value={searchTerm} // Bind input value to state
                      onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
                    />
                  </form>

                  {/* Filtered Coin List */}
                  {myCurrencies?.map((coin, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setPayWith(coin);
                        setSelPay(false);
                      }}
                    >
                      <img src={coin?.image} alt="" />
                      <p>{coin?.symbol.toUpperCase()}</p>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <div className="amt">
            {exPay ? (
              <i className="bx bx-loader bx-spin"></i>
            ) : (
              <input
                type="number"
                value={payVal}
                onChange={(e) => setPayVal(e.target.value)} // Let the value update as typed
                onBlur={(e) => {
                  setPayVal(parseFloat(e.target.value).toFixed(2));
                  getExchangeRateP(buying?.symbol?.toLowerCase());
                }} // Format when input loses focus
              />
            )}
          </div>
        </div>
      </div>

      {/* Buy Section */}
      <div className="opt">
        <h4>You Get</h4>
        <div className="select">
          <div className="selector center">
            <div
              className="val"
              onClick={() => {
                setSelBuy(!selBuy);
              }}
            >
              <img src={buying?.image} alt="" />
              <p>{buying?.symbol?.toUpperCase()}</p>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <AnimatePresence>
              {selBuy && (
                <motion.ul
                  initial={{ opacity: 0, y: "-5%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "0%" }}
                  className="options scrollable"
                >
                  {/* Search Input */}
                  <form>
                    <input
                      type="search"
                      placeholder="Search by name or symbol"
                      value={searchTerm} // Bind input value to state
                      onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
                    />
                  </form>

                  {/* Filtered Coin List */}
                  {filteredCoins?.map((coin, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setBuying(coin);
                        setSelBuy(false);
                      }}
                    >
                      <img src={coin?.image} alt="" />
                      <p>{coin?.symbol.toUpperCase()}</p>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <div className="amt">
            {exBuy ? (
              <i className="bx bx-loader bx-spin"></i>
            ) : (
              <input
                type="number"
                value={buyVal}
                onChange={(e) => setBuyVal(e.target.value)} // Let the value update as typed
                onBlur={(e) => {
                  setBuyVal(parseFloat(e.target.value).toFixed(2));
                  getExchangeRateB(buying?.symbol?.toLowerCase());
                }} // Format when input loses focus
              />
            )}
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="times center">
        <h5 onClick={() => setPayWal("")}>
          {payWal || "Enter Wallet Address"}{" "}
          <ion-icon name="chevron-down-outline"></ion-icon>
        </h5>
        {!payWal && (
          <div className="wallets">
            <form onSubmit={handleWalletAdd}>
              <input
                type="text"
                placeholder="Enter valid wallet address"
                value={walletAddress}
                onChange={(e) => {
                  setWalletAddress(e.target.value);
                }}
              />
              <div className="buttons">
                <button type="submit">
                  {/* <ion-icon name="checkmark-outline"></ion-icon> */}verify
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="stat">
        <div className="line">
          <h3>1 {buying?.symbol?.toUpperCase()}</h3>
          <p>{exRate?.toLocaleString()} USD</p>
        </div>
        <div className="line">
          <h3>Rate</h3>
          <p>{ghsRate}</p>
        </div>
        <div className="line">
          <h3>Fee</h3>
          <p>{buyFee}</p>
        </div>
      </div>

      <button onClick={buyCryptoCoin}>Top up wallet</button>
    </>
  );
};

const Hash = ({ allCoins }) => {
  const { addNotification } = useContext(ContextVariables);
  var domain = "";
  const apikey = "lsZGSdo9TopH5nikdSyz";
  const allowedCoins = ["btc", "ltc", "usdt", "xmr"];

  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [cryptoType, setCryptoType] = useState("");
  const [hash, setHash] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [status, setStatus] = useState("");
  const [blockHeight, setBlockHeight] = useState("");
  const [fee, setFee] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  const getCoins = () => {
    setFilteredCoins(
      allCoins.filter(
        (coin) =>
          allowedCoins.includes(coin.symbol.toLowerCase()) && // Include only allowed coins
          (coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Match by name
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())) // Match by symbol
      )
    );
  };

  useEffect(() => {
    getCoins();
  }, [allCoins]);

  const handleVerifyHash = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!cryptoType) {
      addNotification("Error", "Please select a cryto type!");
      setIsLoading(false);
      return;
    }
    if (!hash) {
      addNotification("Error", "Please enter a valid hash!");
      setIsLoading(false);
      return;
    }

    if (cryptoType === "usdt") {
      domain = `https://services.tokenview.io/vipapi/usdt/txdetail/${hash}?apikey=${apikey}`;
    } else {
      domain = `https://services.tokenview.io/vipapi/tx/${cryptoType}/${hash}?apikey=${apikey}`;
    }

    // Verify hash
    await axios
      .get(
        `${domain}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        addNotification("Error", "Network response was not ok.");
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        addNotification("Success", "Hash ID Verified!.");
        setIsLoading(false);
        if (data.code === 1) {
          displayResults(data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("An error occurred:", error);
        // alert("An error occurred. Please try again.");
        addNotification("Error", "An error occurred. Please try again.");
      });
  };

  //Create use this results
  function displayResults(response) {
    const data = response.data;
    setTransactionHash(data.txid);
    setStatus(data.confirmations > 0 ? "Confirmed" : "Pending");
    setBlockHeight(data.block_no);
    setFee(`${data.fee} LTC`);
    setTransactionDate(new Date(data.time * 1000).toLocaleString());
  }

  return (
    <>
      <div className="opt">
        <h4>Select Cryptocurrency</h4>
        <select
          name=""
          id=""
          value={cryptoType}
          onChange={(e) => setCryptoType(e.target.value)}
        >
          <option value="">Choose Cryptocurrency</option>
          {filteredCoins?.map((coin, index) => (
            <option key={index} value={coin?.symbol?.toUpperCase()}>
              {coin?.symbol?.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="opt">
        <h4>Enter Transaction Hash</h4>
        <form onSubmit={handleVerifyHash} className="input">
          <input
            type="text"
            placeholder="Enter hash"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
          />
        </form>
      </div>
      <div className="stats">
        <div className="line">
          <h3>Trans. hash</h3>
          <p>{transactionHash || "N/A"}</p>
        </div>
        <div className="line">
          <h3>Status</h3>
          <p>{status || "N/A"}</p>
        </div>
        <div className="line">
          <h3>Block Height</h3>
          <p>{blockHeight || "N/A"}</p>
        </div>
        <div className="line">
          <h3>Fee</h3>
          <p>{fee || "N/A"}</p>
        </div>
        <div className="line">
          <h3>Date</h3>
          <p>{transactionDate || "N/A"}</p>
        </div>
      </div>
      <button onClick={handleVerifyHash}>
        {isLoading ? (
          <>
            <i className="bx bx-loader bx-spin"></i>#Verifying...
          </>
        ) : (
          <>#Verify</>
        )}
      </button>
    </>
  );
};

const Calculate = ({ allCoins }) => (
  <>
    <h4>Calculate</h4>
    <div className="opt">
      <h4>Buy</h4>
      <div className="select">
        <div className="selector center">
          <div className="val">
            <img src={allCoins[0]?.image} alt="" />
            <p>{allCoins[0]?.symbol.toUpperCase()}</p>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
        </div>
        <div className="amt">
          <h3>1,356,789.54</h3>
        </div>
      </div>
    </div>
    <div className="opt">
      <h4>Pay With</h4>
      <div className="select">
        <div className="selector center">
          <div className="val">
            <img src={allCoins[1]?.image} alt="" />
            <p>{allCoins[1]?.symbol.toUpperCase()}</p>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
        </div>
        <div className="amt">
          <h3>1,356,789.54</h3>
        </div>
      </div>
    </div>
  </>
);
