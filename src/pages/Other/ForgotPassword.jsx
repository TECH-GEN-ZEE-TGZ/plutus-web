import { useContext, useState } from "react";
import { StyledForm } from "../../components/Form/Form";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import AuthContext from "../../context/AuthContext";
import ContextVariables from "../../context/ContextVariables";
import { TextAlignment } from "@cloudinary/url-gen/qualifiers";

const ForgotPassword = () => {
    const { authInfo, seAuthInfo } = useContext(AuthContext);
    const { domain, apiKey } = useContext(ContextVariables);

    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [enterNewPassword, setEnterNewPassword] = useState(false);

    const handleChange = (e) => {
        setError("");
        setEmail(e.target.value);
    };

    const handleCodeChange = (e) => {
        setError("");
        setVerificationCode(e.target.value);
    }

    const handleNewPasswordChange = (e) => {
        setError("");
        setPassword(e.target.value);

    }

    const handleConfirmPasswordChange = (e) => {
        setError("");
        setConfirmPassword(e.target.value);
    }

    const handleEmailValidation = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailCapture = async (e) => {
        e.preventDefault();
        setError("");

        // Input validation
        if (!email) {
            setError("Please enter your email");
            return;
        }
        if (!handleEmailValidation(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setTimeout(() => { setLoading(false); setVerifyEmail(true) }, 2000);
        // try {
        //   await axios
        //     .post(
        //       `${domain}/optimus/v1/api/users/forgotPassword`,
        //       {email},
        //       {
        //         headers: {
        //           "Content-Type": "application/json",
        //           "X-API-KEY": apiKey,
        //         },
        //       }
        //     )
        //     .then((response) => {
        //       if (response.status === 201) {
        //         setVerifyEmail(true);
        //       } else if (response.status === 400) {
        //         setError(response.data.message || "Error processing request");
        //       }
        //     })
        //     .catch((err) => {
        //       setError(
        //         err?.response?.data?.message || "An error occurred. Please try again."
        //       );
        //     });
        // } catch (err) {
        //   // Handle error
        //   setError(
        //     err?.response?.data?.message || "An error occurred. Please try again."
        //   );
        // } finally {
        //   setLoading(false);
        // }
    };

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        setError("");

        if (!verificationCode || verificationCode.length !== 6) {
            setError("Invalid Verification Code");
            return;
        }

        setLoading(true);
        setTimeout(() => { setLoading(false); setEnterNewPassword(true) }, 2000);
        // try {
        //   await axios
        //     .post(
        //       `${domain}/optimus/v1/api/users/verifyOtp`,
        //       { email: email, otpCode: verification },
        //       {
        //         headers: {
        //           "Content-Type": "application/json",
        //           "X-API-KEY": apiKey,
        //         },
        //       }
        //     )
        //     .then((response) => {
        //       if (response.status === 200) {
        //         setVerifyEmail(false);
        //         setEnterNewPassword(true);
        //         // window.location.href = "/auth/login";
        //       } else {
        //         setError(response.data.message || "Error verifying OTP");
        //       }
        //     })
        //     .catch((err) => {
        //       setError(
        //         err?.response?.data?.message || "An error occurred. Please try again."
        //       );
        //     });
        // } catch (err) {
        //   // Handle error
        //   setError(
        //     err?.response?.data?.message || "An error occurred. Please try again."
        //   );
        // } finally {
        //   setLoading(false);
        // }
    };

    const submitPassword = async (e) => {
        e.preventDefault();
        setError("");

        if(password != confirmPassword){
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setEnterNewPassword(true);
            window.location.href = "/auth/login";
        }, 2000);

    }

    return (
        <StyledForm
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            onSubmit={verifyEmail ? (enterNewPassword ? submitPassword : handleVerifyEmail) : handleEmailCapture}
        >
            {verifyEmail ? ((enterNewPassword ?
                <NewPassword
                    error={error}
                    password={password}
                    confirmPassword={confirmPassword}
                    handleNewPasswordChange={handleNewPasswordChange}
                    handleConfirmPasswordChange={handleConfirmPasswordChange}
                    loading={loading}
                /> :
                <EmailV
                    error={error}
                    email={email}
                    verificationCode={verificationCode}
                    handleCodeChange={handleCodeChange}
                    loading={loading}
                />
            )) : (
                <EmailNV
                    error={error}
                    email={email}
                    handleChange={handleChange}
                    loading={loading}
                />
            )}
        </StyledForm>
    );
};

export default ForgotPassword;

const EmailNV = ({
    error,
    email,
    handleChange,
    loading,
}) => {
    return (
        <>
            <h3>Reset password.</h3>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, x: "10%" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, y: "-10%" }}
                        className="error"
                    >
                        <i class="bx bxs-error bx-tada"></i>
                        {error}
                        <i class="bx bxs-error bx-tada"></i>
                    </motion.p>
                )}
            </AnimatePresence>

            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
                {loading ? (
                    <i className="bx bx-loader bx-spin"></i>
                ) : (
                    <>
                        Send Code <ion-icon name="arrow-forward"></ion-icon>
                    </>
                )}
            </button>

            <div className="switch">
                <p>Remembered your password?</p>
                <NavLink to={"/auth/login"}>Login</NavLink>
            </div>
        </>
    );
};
const EmailV = ({
    error,
    email,
    verificationCode,
    handleCodeChange,
    loading
}) => {
    return (
        <>
            <h3>Verify your email.</h3>
            <p>
                We've sent a verification code to <br />
                <span style={{ display: 'block', textAlign: 'start', padding: '9px 0' }}>{email}</span>
                Please check your inbox and don't forget to look in your spam or junk folder too!
            </p>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, x: "10%" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, y: "-10%" }}
                        className="error"
                    >
                        <i class="bx bxs-error bx-tada"></i>
                        {error}
                        <i class="bx bxs-error bx-tada"></i>
                    </motion.p>
                )}
            </AnimatePresence>
            <input
                type="text"
                name="verification"
                placeholder="Enter the code"
                value={verificationCode}
                onChange={handleCodeChange}
            />
            <button type="submit" disabled={loading}>
                {loading ? (
                    <>
                        <i className="bx bx-loader bx-spin"></i> Verifying...
                    </>
                ) : (
                    <>
                        Verify <ion-icon name="arrow-forward"></ion-icon>
                    </>
                )}
            </button>
        </>
    );
};


const NewPassword = ({
    error,
    password,
    confirmPassword,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    loading,
}) => {
    return (
        <>
            <h3>Enter new password</h3>

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, x: "10%" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, y: "-10%" }}
                        className="error"
                    >
                        <i class="bx bxs-error bx-tada"></i>
                        {error}
                        <i class="bx bxs-error bx-tada"></i>
                    </motion.p>
                )}
            </AnimatePresence>
            <input
                name="verification"
                placeholder="Enter new password"
                value={password}
                type="password"
                onChange={handleNewPasswordChange}
            />

            <input
                name="verification"
                placeholder="Confirm Password"
                value={confirmPassword}
                type="password"
                onChange={handleConfirmPasswordChange}
            />
            <button type="submit" disabled={loading}>
                {loading ? (
                    <>
                        <i className="bx bx-loader bx-spin"></i> Resetting Password...
                    </>
                ) : (
                    <>
                        Submit <ion-icon name="arrow-forward"></ion-icon>
                    </>
                )}
            </button>
        </>
    );
};

