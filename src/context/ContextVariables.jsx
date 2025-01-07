import { createContext, useEffect, useState } from "react";

const ContextVariables = createContext({});

export const ContextVariablesProvider = ({ children }) => {
  const domain = process.env.BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
  const apiKey = process.env.API_KEY || process.env.REACT_APP_API_KEY;
  const cediRate = process.env.CEDI_RATE || process.env.REACT_APP_CEDI_RATE;
  const merchantId = process.env.MERCHANT_ID || process.env.REACT_APP_MERCHANT_ID;
  const [toggleMode, setToggleMode] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [hideContact, setHideContact] = useState(false);
  const [allCoins, setAllCoins] = useState([]);
  const [allNotifs, setAllNotifs] = useState([]);
  const addNotification = (type, message) => {
    const newNotif = { type, message, date: Date.now() };
    setAllNotifs((prevNotifs) => [...prevNotifs, newNotif]);

    setTimeout(() => {
      setAllNotifs((prevNotifs) => prevNotifs.filter((n) => n !== newNotif));
    }, 5000);
  };

  return (
    <ContextVariables.Provider
      value={{
        domain,
        apiKey,
        cediRate,
        merchantId,
        toggleMode,
        setToggleMode,
        hideNav,
        setHideNav,
        hideContact,
        setHideContact,
        allCoins,
        setAllCoins,
        allNotifs,
        setAllNotifs,
        addNotification,
      }}
    >
      {children}
    </ContextVariables.Provider>
  );
};

export default ContextVariables;
