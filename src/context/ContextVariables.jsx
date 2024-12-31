import { createContext, useEffect, useState } from "react";

const ContextVariables = createContext({});

export const ContextVariablesProvider = ({ children }) => {
  const domain = "https://4cxk0ffs-9090.uks1.devtunnels.ms";
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

    // const interval = setInterval(() => {
    //   addNotification("Success", "Message Received" );
    // }, 7000);

    // return () => clearInterval(interval);
  // useEffect(() => {
  // }, []);

  return (
    <ContextVariables.Provider
      value={{
        domain,
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
