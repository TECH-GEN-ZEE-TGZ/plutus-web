import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({
    username: "",
    token: "45678",
  })
  
  useEffect(() => {
    !authInfo?.token &&
      setAuthInfo(JSON.parse(localStorage.getItem("plutusAuth")));
  }, [authInfo, localStorage.getItem("plutusAuth")]);

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