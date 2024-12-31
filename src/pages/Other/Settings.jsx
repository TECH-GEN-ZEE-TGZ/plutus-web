import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
// import StyledForm from "./StyledForm"; // Assuming you have a StyledForm component
import ContextVariables from "../../context/ContextVariables";
import { StyledForm, StyledFormS } from "../../components/Form/Form";
import AuthContext from "../../context/AuthContext";

const Settings = () => {
  const { domain } = useContext(ContextVariables);
  const { authInfo } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        `${domain}/optimus/v1/api/users/resetPassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "your-api-key",
            Authorization: "Bearer " + authInfo?.token,
          },
          body: JSON.stringify({
            username: authInfo?.username,
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
        }
      );

      if (response.status === 401) {
        window.localStorage.removeItem("plutusAuth");
        window.location.href = "/auth/login";
        return;
      }

      if (response.ok) {
        alert("Password changed successfully!");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledFormS
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      onSubmit={handleSubmit}
    >
      <h3>Change Password</h3>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="error"
          >
            <i className="bx bxs-error bx-tada"></i>
            {error}
            <i className="bx bxs-error bx-tada"></i>
          </motion.p>
        )}
      </AnimatePresence>

      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <motion.button whileTap={{ scale: 0.9 }} type="submit" disabled={loading}>
        <span>
          {loading ? (
            <>
              <i className="bx bx-loader bx-spin"></i> Changing Password
            </>
          ) : (
            <>
              Change Password <ion-icon name="arrow-forward"></ion-icon>
            </>
          )}
        </span>
      </motion.button>
    </StyledFormS>
  );
};

export default Settings;
