import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import ContextVariables from "./ContextVariables";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(
    JSON.parse(localStorage.getItem("plutusAuth"))
  );

  const { domain, apiKey, addNotification } = useContext(ContextVariables);

  // Fetch user data
  const fetchUserRest = async () => {
    try {
      const response = await axios.get(
        `${domain}/optimus/v1/api/users/getUser/${authInfo?.username}`,
        {
          headers: {
            "X-API-KEY": apiKey,
            "Authorization": `Bearer ${authInfo?.token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setAuthInfo((prev) => ({
          ...prev,
          username: data?.username,
          balance: data?.balance,
          totalReferrals: data?.totalReferrals,
          referralCode: data?.referralCode,
          accruedBalance: data?.accruedBalance,
        }));
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      addNotification("Error", "An error occurred. Could not fetch user info!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("plutusAuth");
    setAuthInfo({});
    window.location.href = "/";
  };

  useEffect(() => {
    if (!authInfo?.token) {
      const storedAuth = localStorage.getItem("plutusAuth");
      if (storedAuth) {
        setAuthInfo(JSON.parse(storedAuth));
      }
    }
  }, [authInfo?.token]);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "plutusAuth") {
        const newAuth = JSON.parse(event.newValue);
        setAuthInfo(newAuth);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // useEffect(() => {
  //   if (authInfo?.token) {
  //     fetchUserRest();
  //   }
  // }, [authInfo?.token]);

  return (
    <AuthContext.Provider
      value={{
        authInfo,
        setAuthInfo,
        fetchUserRest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
