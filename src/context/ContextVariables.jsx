import { createContext, useEffect, useState } from "react";

const ContextVariables = createContext({});

export const ContextVariablesProvider = ({ children }) => {
  const domain = "https://4cxk0ffs-9090.uks1.devtunnels.ms";
  const [toggleMode, setToggleMode] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [hideContact, setHideContact] = useState(false);
  const [allCoins, setAllCoins] = useState([]);
  const [allNotifs, setAllNotifs] = useState([]);
  const addNotification = ({type, message}) => {
    setAllNotifs((prevNotifs) => [...prevNotifs, { type: type, message: message, date: Date.now() }]);
    
    setTimeout(() => {
      setAllNotifs((prevNotifs) =>
        prevNotifs.filter(
          (n) => n !== ({ type: type, message: message, date: Date.now() })
        )
      );
    }, 5000);
  };

  setInterval(() => {
    setAllNotifs((prevNotifs) =>
      prevNotifs.filter(
        (n) => n !== ({ type: "Success", message: "message received", date: Date.now() })
      )
    );
  }, 5000);

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
