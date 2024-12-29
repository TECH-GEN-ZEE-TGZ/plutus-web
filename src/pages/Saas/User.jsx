import { NavLink, Route, Routes } from "react-router-dom";
import CryptoDataTable from "../../components/DaTAble/DaTAble";
import SaasNav from "../../components/Navbar/SaasNav";
import { StyledUser } from "./SaasStyles";
import ContextVariables from "../../context/ContextVariables";
import { useContext, useEffect, useState } from "react";
import I1 from "../../assets/img/img3.jpeg";
import I2 from "../../assets/img/img5.jpeg";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
// import * as bitcoin from "bitcoinjs-lib";

const User = () => {
  return (
    <StyledUser scrollable>
      <SaasNav />
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

  return (
    <section id="dashboard">
      <div className="trades">
        <div className="slab">
          <div className="balance">
            <div className="icon center">
              <ion-icon name="wallet-outline"></ion-icon>
            </div>
            <div className="text">
              <h5>Referal Balance</h5>
              <h3>$23,235,649.23</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="top">
        <div className="left">
          <div className="title al-c">
            <h3>Recent Transaction</h3>
          </div>
          <ul className="scrollable">
            {recentNotifs?.map((notif, index) => (
              <li>
                <div className="icon center">
                  <i className="bx bx-download"></i>
                </div>
                <div className="info">
                  <h3>Receive BTC</h3>
                  <h5>
                    <span>Completed</span> | March 20, 2024
                  </h5>
                  <p>3456789876454 BTC</p>
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
              <NavLink to={"./calculate"}>Calculate</NavLink>
            </div>
          </div>
          <Routes>
            <Route path="/buy" element={<Buy allCoins={allCoins} />} />
            <Route path="/hash" element={<Hash allCoins={allCoins} />} />
            <Route
              path="/calculate"
              element={<Calculate allCoins={allCoins} />}
            />
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
  const [buyVal, setBuyVal] = useState(1.0);
  const [payVal, setPayVal] = useState(1.0);
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
      alert(`Invalid wallet address!`);
      return;
    }

    if (!walletAddress.trim()) {
      alert("Please enter a valid wallet address.");
      return;
    }

    // Check for duplicates
    if (wallets.includes(walletAddress)) {
      alert("Wallet address already exists!");
      return;
    }

    // Add the new wallet address to the array
    const updatedWallets = [...wallets, walletAddress];
    setWallets(updatedWallets);

    // Save to localStorage
    localStorage.setItem("wallets", JSON.stringify(updatedWallets));

    // Reset input and close the form
    setWalletAddress("");
    setAddWallet(false);
  };

  const getExchangeRateP = async (coin) => {
    setExBuy(true);
    try {
      if (coin) {
        const response = await axios.get(
          `http://localhost:9090/optimus/v1/api/cryptomus/exchange-rate/${coin}?to=USD`
        );
        const rate = response?.data?.result[0]?.course;
        if (rate) {
          const fee = parseFloat(fees[coin.toLowerCase()] * ghsRate);
          const ghsAmount = parseFloat(payVal) - fee;
          setBuyVal((ghsAmount / ghsRate / rate).toFixed(8));
        } else {
          alert("Response doesn't contain exchange rate!");
        }
      }
    } catch (error) {
      alert("Error fetching exchange rate!");
    } finally {
      setExBuy(false);
    }
  };
  const getExchangeRateB = async (coin) => {
    setExPay(true);
    try {
      if (coin) {
        const response = await axios.get(
          `http://localhost:9090/optimus/v1/api/cryptomus/exchange-rate/${coin}?to=USD`
        );
        const rate = response?.data?.result[0]?.course;
        if (rate) {
          const fee = parseFloat(fees[coin?.toLowerCase()] * ghsRate);
          const ghsAmount = parseFloat(buyVal * rate * ghsRate).toFixed(2);
          setPayVal((ghsAmount - fee).toFixed(8));
        } else {
          alert("Response doesn't contain exchange rate!");
        }
      }
    } catch (error) {
      alert("Error fetching exchange rate!");
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
        !payVal &&
        !payWal &&
        !buyVal
      ) {
        alert("Invalid Form inputs");
      } else {
        alert(
          `${buying?.symbol?.toLowerCase()} ${payVal} ${payWal} ${buyVal}`
        );
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
  }, [payVal, buying]);
  useEffect(() => {
    getExchangeRateB(buying?.symbol?.toLowerCase());
  }, [buyVal, buying]);

  useEffect(() => {
    setBuyFee(fees[buying?.symbol?.toLowerCase()]);
  }, [buying]);

  return (
    <>
      {/* Buy Section */}
      <div className="opt">
        <h4>Coin Type</h4>
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
                onBlur={(e) => setBuyVal(parseFloat(e.target.value).toFixed(2))} // Format when input loses focus
              />
            )}
          </div>
        </div>
      </div>

      {/* Pay With Section */}
      <div className="opt">
        <h4>You Get</h4>
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
                onBlur={(e) => setPayVal(parseFloat(e.target.value).toFixed(2))} // Format when input loses focus
              />
            )}
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="times center">
        <h5>
          {payWal || "Choose Wallet"}{" "}
          <ion-icon name="chevron-down-outline"></ion-icon>
        </h5>
        <div className="wallets">
          <button
            onClick={() => {
              setChooseWallet(!chooseWallet);
            }}
          ></button>
          <AnimatePresence>
            {chooseWallet && (
              <motion.ul
                initial={{ opacity: 0, y: "-5%" }}
                animate={{ opacity: 1, y: "0%" }}
                exit={{ opacity: 0, y: "0%" }}
                className="slab"
              >
                {wallets?.length > 0 &&
                  wallets?.map((wal, index) => (
                    <li
                      className="center"
                      onClick={() => {
                        setPayWal(wal);
                      }}
                    >
                      {wal}
                    </li>
                  ))}
                <li className="center">
                  {addWallet ? (
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
                        <button>
                          <ion-icon name="checkmark-outline"></ion-icon>
                        </button>
                        <button
                          onClick={() => {
                            setAddWallet(false);
                          }}
                        >
                          <ion-icon name="close-outline"></ion-icon>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => {
                        setAddWallet(true);
                      }}
                    >
                      <ion-icon name="add-circle-outline"></ion-icon>
                    </button>
                  )}
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="stat">
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

const Hash = ({ allCoins }) => (
  <>
    <div className="opt">
      <h4>Select Cryptocurrency</h4>
      <select name="" id="">
        <option value="">Choose Cryptocurrency</option>
      </select>
    </div>
    <div className="opt">
      <h4>Enter Transaction Hash</h4>
      <form className="input">
        <input type="text" placeholder="Enter hash" />
        {/* <button type="submit">Verify</button> */}
      </form>
    </div>
    <button>#Verify</button>
  </>
);

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