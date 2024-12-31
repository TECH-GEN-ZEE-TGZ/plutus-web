import { createContext, useEffect, useState } from "react";

const ContextVariables = createContext({});

export const ContextVariablesProvider = ({ children }) => {
  const domain = "https://4cxk0ffs-9090.uks1.devtunnels.ms";
  const [toggleMode, setToggleMode] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [hideContact, setHideContact] = useState(false);
  const [allCoins, setAllCoins] = useState([])

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
      }}
    >
      {children}
    </ContextVariables.Provider>
  );
};

export default ContextVariables;