import { createContext, useEffect, useState } from "react";

const ContextVariables = createContext({});

export const ContextVariablesProvider = ({ children }) => {
  const domain = import.meta.env.VITE_BACKEND_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(`Imported Domain: ${import.meta.env.VITE_BACKEND_URL}`);
  console.log(`Imported API Key: ${import.meta.env.VITE_API_KEY}`);
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
