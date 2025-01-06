import zIndex from "@mui/material/styles/zIndex";
import { motion } from "framer-motion";
import { useContext } from "react";
import styled from "styled-components";
import AuthContext from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { use } from "react";

export const fixedHeight = (height) => {
  return (height / 100) * window.innerHeight;
};
export const fixedWidth = (width) => {
  return (width / 100) * window.innerWidth;
};

export const inMobileView = () => {
  return window.innerWidth < 768;
};

export const getFirstWords = (text, wordCount) => {
  return text.split(" ").slice(0, wordCount).join(" ");
};

export const motionContainer = {
  hidden: { opacity: 0, y: "-10%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      delayChildren: 0.6,
      ease: "easeInOut", // Added ease
      duration: 0.5, // Added duration
      staggerChildren: 0.1,
    },
  },
};
export const motionContainerL = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
      delayChildren: 0.3,
      ease: "easeInOut", // Added ease
      duration: 0.15, // Added duration
      staggerChildren: 0,
    },
  },
};

export const motIt1 = {
  hidden: { x: "100%", zIndex: 1, scale: 1, rotate: "0deg", opacity: 1 },
  visible: {
    x: 0,
    zIndex: 1,
    scale: 1,
    rotate: "0deg",
    opacity: 1,
  },
  transition: { duration: 0.1, type: "tween" },
};
export const motIt2 = {
  hidden: { x: "0%", zIndex: 3 },
  visible: {
    x: 0,
    zIndex: 3,
  },
  transition: { duration: 0.1, type: "tween" },
};
export const motIt3 = {
  hidden: { x: "-100%", zIndex: 2, scale: 1, rotate: "0deg", opacity: 1 },
  visible: {
    x: 0,
    zIndex: 2,
    scale: 1,
    rotate: "0deg",
    opacity: 1,
  },
  transition: { duration: 0.1, type: "tween" },
};

export const motionItem = {
  hidden: { y: "-10%", opacity: 1 },
  visible: {
    y: "0%",
    opacity: 1,
  },
  exit: { y: "-10%", opacity: 1 },
  transition: { duration: 0.75, type: "tween" },
};
export const motionImgContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      // type: "tween",
      stiffness: 300,
      damping: 20,
      delayChildren: 0,
      // ease: "easeInOut", // Added ease
      duration: 0.5, // Added duration
      staggerChildren: 0.1,
    },
  },
};
export const motionImgItem = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
  },
  transition: {
    duration: 0.1, // Time in seconds for the transition
    // type: "tween", // Tween will create a smooth, linear animation
    stiffness: 300,
    damping: 20,
    // ease: "easeInOut", // Easing function to control acceleration and deceleration
  },
};
export const motionImgItem2 = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  transition: {
    duration: 1, // Time in seconds for the transition
    // type: "tween", // Tween will create a smooth, linear animation
    stiffness: 300,
    damping: 20,
    // ease: "easeInOut", // Easing function to control acceleration and deceleration
  },
};
export const motionImgItem3 = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
  },
};

// const navigate = useNavigate();

export const makeapiCall = (
  domain,
  apiKey,
  username,
  password,
  onSucess,
  onError,
  navigate,
  setAuthInfo
) => {
  axios
    .post(
      `${domain}/optimus/v1/api/users/login`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        return response.data; // Parse JSON here
      }
    })
    .then((data) => {
      if (data && data?.token) {
        localStorage.setItem(
          "plutusAuth",
          JSON.stringify({
            username: data?.username,
            token: data?.token,
            email: data?.email,
          })
        );

        setAuthInfo &&
          setAuthInfo({
            username: data?.username,
            token: data?.token,
            email: data?.email,
          });
        onSucess();
        // navigate("/user/buy");
        navigate("/user/buy", { state: { reload: true } });
      }
    })
    .catch((error) => {
      if (error.status === 400) {
        onError(error.response.data.message);
      } else {
        onError("An error occurred. Please try again.");
      }
      onSucess();
    })
};

export const generate_payment_link_hubtel = (domain, apiKey, addNotification, token, paymentData, orderData, onSucess) => {

  const url = domain + "/optimus/v1/api/payment/generate";
  const headers = {
    "X-API-KEY": apiKey,
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  };

  const data = {
    "description": paymentData.description,
    "callbackUrl": paymentData.callbackUrl,
    "returnUrl": paymentData.returnUrl,
    "merchantAccountNumber": paymentData.merchantAccountNumber,
    "cancellationUrl": paymentData.cancellationUrl,
    "clientReference": paymentData.clientReference,
    "currency": "GHS",
    "amountGHS": paymentData.amountGHS,
    // "amountGHS": 1,
    "cryptoAmount": orderData.cryptoAmount,
    "fee": orderData.fee,
    "crypto": orderData.crypto,
    "email": orderData.email,
    "rate": orderData.rate,
    "address": orderData.address,
    "transactionId": orderData.transactionId
  };

  axios
    .post(url, data, { headers })
    .then((response) => {
      const result = response.data;
      if (result.status && result.data && result.data.checkoutUrl) {
        let paymentUrl = result.data.checkoutUrl;
        onSucess();
        window.location.href = paymentUrl;
      } else {
        addNotification("Error", "Error generating payment link");
        onSucess();
      }
    })
    .catch((error) => {
      if (error.status === 400) {
        addNotification("Error", "Amount not feasible, please reduce or contact admin!");
        onSucess();
      } else {
        addNotification("Error", "Unexpected Error");
        onSucess();
      }
    });
}