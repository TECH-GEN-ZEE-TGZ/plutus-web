import { NavLink, Route, Routes, useNavigate, useLocation } from "react-router-dom";
// import { address as BitcoinAddress } from 'bitcoinjs-lib';
import CryptoDataTable from "../../components/DataTable/DataTable";
import SaasNav from "../../components/Navbar/SaasNav";
import { StyledUser, StyledFormS } from "./SaasStyles";
import ContextVariables from "../../context/ContextVariables";
import { useContext, useEffect, useState } from "react";
import I1 from "../../assets/img/img3.jpeg";
import I2 from "../../assets/img/img5.jpeg";
import { AnimatePresence, color, motion } from "framer-motion";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import Settings from "../Other/Settings";
import styled from "styled-components";
import Support from "../Other/Support";
import MiniGraph from "../../components/Other/MiniGraph";
import Notifs from "../../components/Other/Notifs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { generate_payment_link_hubtel, inMobileView } from "../../Functions";

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: #723081;
  cursor: pointer;
  &:hover {
    background-color:rgb(165, 145, 170);
  }
`;


const User = () => {
  const { authInfo, fetchUserRest } = useContext(AuthContext);
  const { allNotifs } = useContext(ContextVariables);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCopy = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 1000);
  };


  useEffect(() => {
    if (location.state?.reload) {
      navigate(location.pathname, { replace: true, state: {} }); // Reset state
      window.location.reload();
    }
    if (!authInfo?.token) {
      navigate("/auth/login");
    } else if (!authInfo?.referralCode) {
      fetchUserRest();
    }
  }, [location, navigate]);

  return (
    <StyledUser scrollable>
      <SaasNav />
      {showNotification && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            background: "hsl(289.0909090909091, 45.833333333333336%, 81.17647058823529%)",
            padding: "10px",
            border: "1px solid #9e5dad",
            borderRadius: "10px",
            zIndex: 9999,
          }}
        >
          Copied!
        </div>
      )}

      <div className="routes scrollable">
        <Routes>
          <Route
            path="/*"
            element={<Dashboard handleCopy={handleCopy} />} // Pass the handleCopy function to Dashboard
          />
        </Routes>
      </div>
    </StyledUser>
  );
};

export default User;

const Dashboard = ({ handleCopy }) => {
  const { allCoins } = useContext(ContextVariables);
  const { authInfo } = useContext(AuthContext);

  const [recentNotifs] = useState([
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

  const [switchBar, setSwitchBar] = useState(false);

  const [searchTerm] = useState("");
  const allowedCoins = ["btc", "ltc", "usdt", "xmr"];

  const filteredCoins = allCoins.filter(
    (coin) =>
      allowedCoins.includes(coin.symbol.toLowerCase()) && // Include only allowed coins
      (coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Match by name
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())) // Match by symbol
  );

  useEffect(() => {
    switchBar && setTimeout(() => {
      setSwitchBar(false)
    }, 2500);
  }, [switchBar])

  return (
    <section id="dashboard">
      <div className="trades">
        <div className="slab">
          <div className={`balance ${inMobileView() ? "off" : "on"}`}>
            {inMobileView() ? (
              // Show only Accrued Balance in mobile view
              <>
                <div className="icon center">
                  <ion-icon name="cash-outline"></ion-icon>
                </div>
                <div className="text">
                  <h5>Accrued Balance</h5>
                  <h3>${authInfo?.accruedBalance || 0.0}</h3>
                </div>
              </>
            ) : (
              // Show all balances in non-mobile view
              <>
                <div className="icon center">
                  <ion-icon name="people-outline"></ion-icon>
                </div>
                <div className="text" style={{ marginRight: "10px" }}>
                  <h5>Total Referrals</h5>
                  <h3>{authInfo?.totalReferrals || 0}</h3>
                </div>
                <div className="icon center">
                  <ion-icon name="cash-outline"></ion-icon>
                </div>
                <div className="text" style={{ marginRight: "10px" }}>
                  <h5>Accrued Balance</h5>
                  <h3>${authInfo?.accruedBalance || 0.0}</h3>
                </div>
                <div className="icon center">
                  <ion-icon name="wallet-outline"></ion-icon>
                </div>
                <div className="text">
                  <h5>Available Balance</h5>
                  <h3>${authInfo?.balance || 0.0}</h3>
                </div>
              </>
            )}
          </div>
          <div className={`otherIcons ${inMobileView() ? "on" : "off"}`}>
            <button
              onClick={() => setOnTab(onTab === "support" ? "" : "support")}
              className="support"
              style={{
                backgroundColor: onTab === "support" ? "#723081" : "",
                color: onTab === "support" ? "white" : "#723081",
              }}
            >
              <i className="bx bx-support bx-tada"></i>
            </button>
            <button
              onClick={() => setOnTab(onTab === "settings" ? "" : "settings")}
              className="settings"
              style={{
                backgroundColor: onTab === "settings" ? "#723081" : "",
                color: onTab === "settings" ? "white" : "#723081",
              }}
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
                  {onTab === "settings" ? <Settings /> : onTab === "support" ? <Support /> : <></>}
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
            {filteredCoins?.map((coin) => (
              <li key={coin.id}>
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
                {recentNotifs?.map((notif, idx) => (
                  <li key={idx}>
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
              {/* <NavLink to={"./hash"}>Hash</NavLink> */}
              <NavLink to={"./referrals"}>Referrals</NavLink>
            </div>
          </div>
          <Routes>
            <Route path="/buy" element={<Buy allCoins={allCoins} />} />
            {/* <Route path="/hash" element={<Hash allCoins={allCoins} />} /> */}
            <Route path="/referrals" element={<Referrals handleCopy={handleCopy} />} />
          </Routes>
        </div>
      </div>
      <div className="swiperContainer">
        <Swiper
          modules={[Navigation, Pagination]}
          // navigation
          // pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="swiper"
        >
          <SwiperSlide className="swiperSlide">
            <div className="title al-c">
              <div className="bar">
                <NavLink to={"./buy"}>Buy</NavLink>
                {/* <NavLink to={"./hash"}>Hash</NavLink> */}
                <NavLink to={"./referrals"}>Referrals</NavLink>
              </div>
            </div>
            <Routes>
              <Route path="/buy" element={<Buy allCoins={allCoins} />} />
              {/* <Route path="/hash" element={<Hash allCoins={allCoins} />} /> */}
              <Route path="/referrals" element={<Referrals handleCopy={handleCopy} />}
              />
            </Routes>
          </SwiperSlide>
          <SwiperSlide className="swiperSlide">
            <div className="title al-c">
              <h3>Coin Updates</h3>
            </div>
            <ul className="scrollable">
              {filteredCoins?.map((coin, index) => (
                <li key={coin.id}>
                  <div className="icon center">
                    <img src={coin?.image} alt="" />
                  </div>
                  <div className="info">
                    <h3>{coin?.name}</h3>
                    <h5>
                      Market Cap:{" "}
                      <span>${coin?.market_cap?.toLocaleString()}</span>
                    </h5>
                    <h5>
                      Price:{" "}
                      <span>${coin?.current_price?.toLocaleString()}</span>
                    </h5>
                    <motion.h5
                      style={{
                        color:
                          coin?.price_change_percentage_24h > 0
                            ? "green"
                            : "red",
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
          </SwiperSlide>

        </Swiper>
      </div>
      <div className="bottom center">
        <CryptoDataTable handleCopy={handleCopy} />
      </div>
    </section>
  );
};

const Buy = ({ allCoins }) => {
  const { domain, apiKey, cediRate, merchantId } = useContext(ContextVariables);
  const { authInfo } = useContext(AuthContext);
  const ghsRate = parseFloat(cediRate);
  const [ghsAmountToPay, setGhsAmountToPay] = useState(0);

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
  const [payValError, setPayValError] = useState("");
  const [walletError, setWalletError] = useState("");
  const [exchangeRateError, setExchangeRateError] = useState("");
  const [formError, setFormError] = useState("");

  const [buyFee, setBuyFee] = useState(0);
  const [exRate, setExRate] = useState(0);
  const [cryptoVal, setCryptoVal] = useState(0);
  const [payVal, setPayVal] = useState(0);
  const [cryptoWallet, setCryptoWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(true);
  const [totalFee, setTotalFee] = useState(0);

  const [walletAddress, setWalletAddress] = useState("");

  const handleWalletAdd = async (e) => {
    e.preventDefault();

    if (
      !(await validateCryptoWallet(
        buying?.symbol?.toLowerCase(),
        walletAddress
      ))
    ) {
      // alert(`Invalid wallet address!`);
      setWalletError(`Invalid ${buying?.symbol?.toUpperCase()} address!`);
      return;
    }

    if (!walletAddress.trim()) {
      // alert("Please enter a valid wallet address.");
      setWalletError(`Please enter a valid ${buying?.symbol?.toUpperCase()} address.`);
      return;
    }


    setCryptoWallet(walletAddress);
    setWalletError("");

    setWalletAddress(
      walletAddress
        .split('')
        .map((char, index) =>
          index < 7 || index >= walletAddress.length - 7 ? char : '*'
        )
        .join('')
    );
    setShowVerifyButton(false);
  };

  const getExchangeRateP = async (coin) => {
    if (payVal < 1) {
      return;
    }

    try {
      const response = await axios.get(
        `${domain}/optimus/v1/api/cryptomus/exchange-rate/${coin.toUpperCase()}?to=USD`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
          },
        }
      );

      const exchangeRate = parseFloat(response?.data?.result[0]?.course).toFixed(2);
      const withdrawalFee = Math.ceil(parseFloat(response?.data?.result[0]?.withdrawalFee) * 100) / 100;

      // Determine fee based on the purchase amount
      let additionalFee = 0;
      const purchaseAmountUSD = payWith?.symbol === "GHS" ? (payVal / ghsRate) : payVal;

      if (purchaseAmountUSD >= 0 && purchaseAmountUSD <= 50) {
        additionalFee = 3;
      } else if (purchaseAmountUSD >= 51 && purchaseAmountUSD <= 100) {
        additionalFee = 4;
      } else if (purchaseAmountUSD > 100) {
        additionalFee = 0.05 * purchaseAmountUSD; // 5% of the purchase amount
      }

      const totalFeeUSD = withdrawalFee + additionalFee;
      const totalFeeGHS = totalFeeUSD * ghsRate;
      const minimumGhsAmount = totalFeeGHS + 50;
      const minimumUsdAmount = totalFeeUSD + 2;

      if (payWith?.symbol === "GHS" && payVal < minimumGhsAmount) {
        setPayValError(`Minimum ghs amount to buy is ${minimumGhsAmount.toFixed(2)}`);
        setPayVal(minimumGhsAmount.toFixed(2));
        setCryptoVal(0);
        setGhsAmountToPay(0);
        setExBuy(false);
        return;
      } else if (payWith?.symbol === "USD" && payVal < minimumUsdAmount) {
        setPayValError(`Minimum usd amount to buy is ${minimumUsdAmount.toFixed(2)}`);
        setPayVal(minimumUsdAmount.toFixed(2));
        setCryptoVal(0);
        setGhsAmountToPay(0);
        setExBuy(false);
        return;
      } else {
        setPayValError("");
      }

      setTotalFee(totalFeeUSD);
      // setBuyFee(totalFee);

      // Update the state with calculated values
      if (exchangeRate) {
        if (payWith.symbol === "GHS") {
          const ghsAmountWithoutFee = payVal > 0 ? payVal : 0;
          const ghsAmountWithFee = ghsAmountWithoutFee + (totalFeeUSD * ghsRate); // Convert fee back to GHS to subtract
          setCryptoVal(((ghsAmountWithoutFee / ghsRate) / exchangeRate).toFixed(8));
          setGhsAmountToPay(ghsAmountWithFee.toFixed(2));
        } else {
          const usdAmountWithoutFee = payVal > 0 ? payVal : 0;
          const usdAmountWithFee = usdAmountWithoutFee + totalFeeUSD;
          setCryptoVal((usdAmountWithFee / exchangeRate).toFixed(8));
          setGhsAmountToPay((usdAmountWithFee * ghsRate).toFixed(2));
        }
      } else {
        setFormError("Exchange rate is null");
        setCryptoVal(0);
        setGhsAmountToPay(0);
      }
    } catch (error) {
      setExchangeRateError("Error fetching exchange rate!");
      setCryptoVal(0);
    } finally {
      setExBuy(false);
    }
  };


  const getExchangeRateB = async (coin) => {
    if (!(cryptoVal > 0)) {
      return;
    }

    setExPay(true);

    try {
      const response = await axios.get(
        `${domain}/optimus/v1/api/cryptomus/exchange-rate/${coin.toUpperCase()}?to=USD`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
          },
        }
      );


      const exchangeRate = parseFloat(response?.data?.result[0]?.course).toFixed(2);
      const withdrawalFee = Math.ceil(parseFloat(response?.data?.result[0]?.withdrawalFee) * 100) / 100;

      // Calculate the fiat amount before fees to determine the fee tier
      let fiatEquivalent = cryptoVal * exchangeRate;
      let additionalFee = 0;

      // Apply fee rules based on fiat amount
      if (fiatEquivalent >= 0 && fiatEquivalent <= 50) {
        additionalFee = 3;
      } else if (fiatEquivalent > 50 && fiatEquivalent <= 100) {
        additionalFee = 4;
      } else if (fiatEquivalent > 100) {
        additionalFee = 0.05 * fiatEquivalent; // 5% of the purchase amount
      }

      const totalFee = withdrawalFee + additionalFee;
      setTotalFee(totalFee);
      // setBuyFee(totalFee);

      const totalPay = (fiatEquivalent + totalFee) * ghsRate;
      setGhsAmountToPay(totalPay);
      // Calculate the total amount to pay including fees
      if (payWith.symbol === "GHS") {
        setPayVal((fiatEquivalent * ghsRate).toFixed(2));
       
      } else {
        setPayVal(fiatEquivalent.toFixed(2));
      }

    } catch (error) {
      setExchangeRateError("Error fetching exchange rate!");
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

  const validateBitcoinAddress = (address) => {
    try {
      // BitcoinAddress.toOutputScript(address);
      return true; // Valid address
    } catch (error) {
      console.log(error);
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
        return false;
    }
  };

  const paymentData = {
    description: `Item Purchase`,
    callbackUrl: `${domain}/optimus/v1/api/payment/callback`,
    returnUrl: "https://theplutushome.com/payment/success",
    merchantAccountNumber: merchantId,
    cancellationUrl: "https://theplutushome.com/payment/failed",
    clientReference: `Payment_${Date.now()}`,
    amountGHS: ghsAmountToPay,
  };


  const orderData = {
    cryptoAmount: cryptoVal,
    fee: totalFee,
    crypto: buying?.symbol?.toUpperCase(),
    email: authInfo?.email,
    ghsRate: ghsRate,
    address: cryptoWallet,
  };

  const buyCryptoCoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    let error = "";

    if (!buying?.symbol) {
      error = "Please select a cryptocurrency to buy.";
    } else if (payVal <= 0) {
      error = "Please enter a valid payment amount.";
    } else if (cryptoWallet?.length === 0) {
      error = "Please enter a valid wallet address.";
    } else if (cryptoVal <= 0) {
      error = "Please enter a valid cryptocurrency amount.";
    }

    if (error) {
      setLoading(false);
      setFormError(error);
      setTimeout(() => setFormError(""), 2000);
      return;
    } else {
      generate_payment_link_hubtel(domain, apiKey, formError, authInfo?.token, paymentData, orderData, () => setLoading(false));
    }
  };


  useEffect(() => {
    setBuying(filteredCoins[0]);
  }, [allCoins]);

  useEffect(() => {
    getExchangeRateP(buying?.symbol?.toLowerCase());
    getExchangeRateB(buying?.symbol?.toLowerCase());
    setFormError("");
  }, [buying]);

  useEffect(() => {
    const fetchFee = async () => {
      if (!buying?.symbol) {
        return; // Exit if no symbol is provided
      }
      try {
        const response = await axios.get(`${domain}/optimus/v1/api/cryptomus/exchange-rate/${buying.symbol.toUpperCase()}?to=USD`, {
          headers: { "X-API-KEY": apiKey }
        });

        const feeFromApi = parseFloat(response?.data?.result[0]?.withdrawalFee);
        const exchange = parseFloat(response?.data?.result[0].course);
        setExRate(exchange.toFixed(2));
        setBuyFee(feeFromApi.toFixed(2));
      } catch (error) {
        setExchangeRateError('Error fetching fee');
        setBuyFee(0); // Reset to default or handle error as needed
      }
    };

    fetchFee();
  }, [buying]); // Depen

  return (
    <>
      {/* Pay With Section */}
      <AnimatePresence>
        {formError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="error"
            style={{ fontSize: "12px", color: "red", marginTop: "3px" }}
          >
            <i className="bx bxs-error bx-tada"></i>
            {formError}
            <i className="bx bxs-error bx-tada"></i>
          </motion.p>
        )}
      </AnimatePresence>
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
                inputMode="decimal"
                value={payVal}
                onChange={(e) => {
                  setPayVal(e.target.value);
                  setPayValError("");
                }} // Let the value update as typed
                onBlur={(e) => {
                  setPayVal(parseFloat(e.target.value).toFixed(2));
                  getExchangeRateP(buying?.symbol?.toLowerCase());
                }} // Format when input loses focus
                style={{ fontSize: "16px" }}
              />
            )}
          </div>
        </div>
        <AnimatePresence>
          {payValError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="error"
              style={{ fontSize: "10px", color: "red" }}
            >
              <i className="bx bxs-error bx-tada"></i>
              {payValError}
              <i className="bx bxs-error bx-tada"></i>
            </motion.p>
          )}
        </AnimatePresence>
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
                inputMode="decimal"
                value={cryptoVal}
                onChange={(e) => setCryptoVal(e.target.value)} // Let the value update as typed
                onBlur={(e) => {
                  setCryptoVal(parseFloat(e.target.value).toFixed(8));
                  getExchangeRateB(buying?.symbol?.toLowerCase());
                }} // Format when input loses focus
                style={{ fontSize: "16px" }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="times center">
        <h5>Enter Wallet Address</h5>
        <div className="wallets">
          <form onSubmit={handleWalletAdd}>
            <input
              type="text"
              placeholder="Enter valid wallet address"
              value={walletAddress}
              onClick={() => {
                setShowVerifyButton(true);
                setWalletAddress(cryptoWallet);
              }}
              onChange={(e) => {
                setWalletAddress(e.target.value);
                setWalletError("");
              }}
            />
            {showVerifyButton ? (
              <div className="buttons">
                <button type="submit">verify</button>
              </div>
            ) : (
              <div className="verified">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
              </div>
            )}
          </form>
          <AnimatePresence>
            {walletError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="error"
                style={{ fontSize: "12px", color: "red", marginTop: "3px" }}
              >
                <i className="bx bxs-error bx-tada"></i>
                {walletError}
                <i className="bx bxs-error bx-tada"></i>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
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
          <p>{buyFee} USD</p>
        </div>
        <div className="line">
          <h3>Amount To Pay</h3>
          <p>{ghsAmountToPay} GHS</p>
        </div>
      </div>

      {loading ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
        >
          <span>
            <i className="bx bx-loader bx-spin"></i> Processing
          </span>
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          onClick={buyCryptoCoin}
        >
          <span>Top up wallet</span>
        </motion.button>
      )}
    </>
  );
};


const Referrals = ({ handleCopy }) => {
  const { domain, apiKey, addNotification } = useContext(ContextVariables);
  const { authInfo } = useContext(AuthContext);
  const [redeemError, setRedeemError] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRedeem = async (event) => {
    event.preventDefault();

    if (authInfo?.accruedBalance < 1) {
      setError("Insufficient balance to redeem.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${domain}/optimus/v1/api/users/redeem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
          Authorization: "Bearer " + authInfo?.token,
        },
        body: JSON.stringify({
          username: authInfo?.username,
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem("plutusAuth");
        window.location.href = "/auth/login";
        return;
      }

      if (response.ok) {
        addNotification("Success", "Points redeemed successfully!");
      } else {
        const data = await response.json();
        redeemError(`${data?.message}`);
      }
    } catch (error) {
      redeemError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      <div className="referralSlab">
        <AnimatePresence>
          {redeemError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="error"
              style={{ fontSize: "12px", color: "red", marginTop: "3px" }}
            >
              <i className="bx bxs-error bx-tada"></i>
              {redeemError}
              <i className="bx bxs-error bx-tada"></i>
            </motion.p>
          )}
        </AnimatePresence>
        <div className="left">
          <div className="text">
            <h5>Your Referral Code</h5>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <h3>{authInfo?.referralCode || "N/A"}</h3>
              <Button
                onClick={() => {
                  setRedeemError("");
                  navigator.clipboard.writeText(authInfo?.referralCode || ""); // Copy referral code
                  handleCopy(); // Trigger notification
                }}
                style={{ marginLeft: '10px' }}
              >
                <ion-icon name="copy-outline" style={{ fontSize: '15px' }}></ion-icon>
              </Button>

            </div>
          </div>

          <div className="text">
            <h5>Total Referrals</h5>
            <h3>{authInfo?.totalReferrals || 0}</h3>
          </div>

          <div className="text">
            <h5>Available Balance</h5>
            <h3>${authInfo?.balance || 0.0}</h3>
          </div>

        </div>

        <div className="right">
          <StyledFormS
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            onSubmit={handleRedeem}
          >
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="error"
                >
                  <i className="bx bxs-error bx-tada"></i>
                  {error}
                  <i className="bx bxs-error bx-tada"></i>
                </motion.p>
              )}
            </AnimatePresence>
            <p>Accrued Balance</p>
            <h1>${authInfo?.accruedBalance || parseFloat(0.0)}</h1>

            <motion.button
              whileTap={{ scale: 0.9 }}
              type="submit"
              disabled={loading}
            >
              <span>
                {loading ? (
                  <>
                    <i className="bx bx-loader bx-spin"></i> Redeeming Points
                  </>
                ) : (
                  <>
                    Redeem
                  </>
                )}
              </span>
            </motion.button>
          </StyledFormS>
        </div>
      </div>
    </>
  );
};
