import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import ContextVariables from "../../context/ContextVariables";
import { StyledForm, StyledFormS } from "../../components/Form/Form";
import AuthContext from "../../context/AuthContext";

const Redeem = () => {
    const { domain } = useContext(ContextVariables);
    const {authInfo} = useContext(AuthContext);
    const [accruedBalance, setAccruedBalance] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRedeem = async (event) => {
        event.preventDefault();

        if (accruedBalance < 1) {
            setError("Insufficient balance to redeem.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${domain}/optimus/v1/api/users/redeem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": "your-api-key",
                    Authorization: "Bearer " + authInfo?.token,
                },
                body: JSON.stringify({
                    username: authInfo?.username,
                }),
            });

            if (response.status === 401) {
                // Clear authInfo and redirect to login
                localStorage.removeItem("plutusAuth");
                window.location.href = "/auth/login";
                return;
            }

            if (response.ok) {
                alert("Points redeemed successfully!");
            } else {
                const data = await response?.json();
                setError(data?.message);
            }
        } catch (error) {
            setError(error?.message);
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
            <h3>Redeem Points</h3>
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
                type="number"
                placeholder="Accrued Balance"
                value={accruedBalance}
                onChange={(e) => setAccruedBalance(e.target.value)}
            />

            <motion.button whileTap={{ scale: 0.9 }} type="submit" disabled={loading}>
                <span>
                    {loading ? (
                        <>
                            <i className="bx bx-loader bx-spin"></i> Redeeming Points
                        </>
                    ) : (
                        <>
                            Redeem Points <ion-icon name="arrow-forward"></ion-icon>
                        </>
                    )}
                </span>
            </motion.button>
        </StyledFormS>
    );
};

export default Redeem;