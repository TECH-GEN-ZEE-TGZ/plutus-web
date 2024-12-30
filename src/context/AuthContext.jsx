import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({
    username: "",
    token: "",
  })
  
  useEffect(() => {
    !authInfo?.token &&
      setAuthInfo(JSON.parse(localStorage.getItem("plutusAuth")));
  }, [localStorage]);

  return (
    <AuthContext.Provider
      value={{
        authInfo,
        setAuthInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;