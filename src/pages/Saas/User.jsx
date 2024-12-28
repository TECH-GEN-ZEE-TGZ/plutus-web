import { NavLink, Route, Routes } from "react-router-dom";
import CryptoDataTable from "../../components/DaTAble/DaTAble";
import SaasNav from "../../components/Navbar/SaasNav";
import { StyledUser } from "./SaasStyles";
import ContextVariables from "../../context/ContextVariables";
import { useContext, useState } from "react";
import I1 from "../../assets/img/img3.jpeg";
import I2 from "../../assets/img/img5.jpeg";
import { AnimatePresence, motion } from "framer-motion";

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
              <h5>Balance</h5>
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
  const [buying, setBuying] = useState(allCoins[0]);
  const [selBuy, setSelBuy] = useState(false);

  const [payWith, setPayWith] = useState(allCoins[1]);
  const [selPay, setSelPay] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCoins = allCoins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [buyVal, setBuyVal] = useState(0);
  const [payVal, setPayVal] = useState(0);

  const [chooseWallet, setChooseWallet] = useState(false);

  return (
    <>
      {/* Buy Section */}
      <div className="opt">
        <h4>Buy</h4>
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
            <input
              type="number"
              value={buyVal}
              onChange={(e) => setBuyVal(e.target.value)} // Let the value update as typed
              onBlur={(e) => setBuyVal(parseFloat(e.target.value).toFixed(2))} // Format when input loses focus
            />
          </div>
        </div>
      </div>

      {/* Pay With Section */}
      <div className="opt">
        <h4>Pay With</h4>
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
                  {filteredCoins?.map((coin, index) => (
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
            <input
              type="number"
              value={payVal}
              onChange={(e) => setPayVal(e.target.value)} // Let the value update as typed
              onBlur={(e) => setPayVal(parseFloat(e.target.value).toFixed(2))} // Format when input loses focus
            />
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="times center">
        <h5>
          Choose Wallet <ion-icon name="chevron-down-outline"></ion-icon>
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
                <li></li>
                <li></li>
                <li className="center">
                  <button>
                    <ion-icon name="add-circle-outline"></ion-icon>
                  </button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="stat">
        <div className="line">
          <h3>Shipping Tolerance</h3>
          <p>34567</p>
        </div>
        <div className="line">
          <h3>Price</h3>
          <p>34567</p>
        </div>
      </div>
      <button>Top up wallet</button>
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
