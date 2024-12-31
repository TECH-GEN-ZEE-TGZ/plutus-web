import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import ContextVariables from "./ContextVariables";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(
    JSON.parse(localStorage.getItem("plutusAuth"))
  );

  const { domain } = useContext(ContextVariables);

  // Fetch user data
  const fetchUserRest = async () => {
    console.log(`The domain is ${domain}`);
    try {
      const response = await axios.get(
        `${domain}/optimus/v1/api/users/getUser/${authInfo?.username}`,
        {
          headers: {
            "X-API-KEY": "your-api-key",
            "Authorization": `Bearer ${authInfo?.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        const data = response.data;
        setAuthInfo((prev) => ({
          ...prev,
          username: data?.username,
          balance: data?.balance,
          totalReferrals: data?.totalReferrals,
          referralCode: data?.referralCode,
          accruedBalance: data?.accruedBalance,
        }));
        console.log("User Data:", data);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.log(error)
      alert("An error occurred. Could not fetch user info!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("plutusAuth");
    setAuthInfo(null);
    window.location.href = "/auth/login";
  };

  useEffect(() => {
    if (!authInfo?.token) {
      const storedAuth = localStorage.getItem("plutusAuth");
      if (storedAuth) {
        setAuthInfo(JSON.parse(storedAuth));
      }
    }
  }, []);

  const fetchUserRest = async () => {
    await axios
      .get(`${domain}/optimus/v1/api/users/getUser/${authInfo?.username}`, {
        headers: {
          "X-API-KEY": "your-api-key",
          "Authorization": "Bearer " + authInfo?.token,
        },
      })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("plutusAuth");
          window.location.href = "/auth/login";
        }
        if (response.ok) {
          return response.json(); // Parse the JSON data
        } else {
          localStorage.removeItem("plutusAuth");
          window.location.href = "/auth/login";
        }
      })
      .then(data => {
        setAuthInfo({
          ...authInfo,
          username: data?.username,
          balance: data?.balance,
          totalReferrals: data?.totalReferrals,
          referralCode: data?.referralCode,
          accruedBalance: data?.accruedBalance,
        });
        localStorage.setItem(
          "plutusAuth",
          JSON.stringify({
            ...authInfo,
            username: data?.username,
            balance: data?.balance,
            totalReferrals: data?.totalReferrals,
            referralCode: data?.referralCode,
            accruedBalance: data?.accruedBalance,
          })
        );
      })
      .catch(error => {
        alert("An error has occured. Could not fetch user info!");
      });
  };

  // useEffect(() => {fetchUserRest()}, [authInfo?.token]);

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
window.addEventListener("storage", (event) => {
  if (event.key === "plutusAuth") {
    setAuthInfo(JSON.parse(event.newValue));
  }
});
