import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import ContextVariables from "../../context/ContextVariables";
import { StyledForm, StyledFormS } from "../../components/Form/Form";
import AuthContext from "../../context/AuthContext";

const Support = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRedeem = async (event) => {
    event.preventDefault();

    

    setLoading(true);
    setError("");

    try {
      
    } catch (error) {
      setError("Can't Open Telegram. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledFormS
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      onSubmit={handleRedeem}
    >
      <h3>Customer Support</h3>
      

      <motion.button whileTap={{ scale: 0.9 }} type="submit" disabled={loading}>
        <span>
          {loading ? (
            <>
              <i className="bx bx-loader bx-spin"></i>Opening Telegram
            </>
          ) : (
            <>
              On Telegram <ion-icon name="arrow-forward"></ion-icon>
            </>
          )}
        </span>
      </motion.button>
    </StyledFormS>
  );
};

export default Support;
