import { Link, NavLink, useNavigate } from "react-router-dom";
import { StyledForm } from "../../components/Form/Form";
import { useContext, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import AuthContext from "../../context/AuthContext";
import { makeapiCall } from "../../Functions";
import ContextVariables from "../../context/ContextVariables";
import { Helmet } from 'react-helmet';
import Logo from "../../assets/img/pee.jpg";


const Login = () => {
  const navigate = useNavigate();

  const { domain, apiKey, addNotification } = useContext(ContextVariables);
  const { authInfo, setAuthInfo } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // if (!agree) {
    //   setError("You must agree to the terms.");
    //   return;
    // }

    setError(""); // Clear any previous errors

    try {
      // Check if fields are filled
      if (!username || !password) {
        setError("Please fill in both fields.");
        addNotification("Error", "Please fill in both fields.");
        setLoading(false);
        return;
      }

      // Call Google reCAPTCHA v3
      await grecaptcha.ready(async function () {
        const recaptchaToken = await grecaptcha.execute(
          "6LeG0KEqAAAAAB0ij0gsJi4IFC6RC1dU-UpLFjfQ",
          { action: "submit" }
        );

        // Send the token and form data to your backend
        const response = await fetch(`${domain}/api/verify-captcha`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey, // Replace with your actual API key
          },
          body: JSON.stringify({
            token: recaptchaToken,
          }),
        });

        if (response.ok) {
          makeapiCall(
            domain,
            apiKey,
            username,
            password,
            () => setLoading(false),
            setError,
            navigate,
            setAuthInfo,
            addNotification,
          );
        } else {
          setLoading(false);
          const errorResult = await response.json();
          setError(
            `CAPTCHA verification failed: ${errorResult.message || "Unknown error"
            }`
          );
          grecaptcha.reset(); // Reset the CAPTCHA if needed
        }
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <StyledForm
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      onSubmit={handleSubmit}
    >
      <Helmet>
        <script src="https://www.google.com/recaptcha/api.js?render=6LeG0KEqAAAAAB0ij0gsJi4IFC6RC1dU-UpLFjfQ" async defer></script>
      </Helmet>
      <div
        className="logo"
      >
        <img src={Logo} alt="" />
      </div>
      <h3>Log in to account.</h3>
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
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError("");
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
      />

      <div className="remember">
        <p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setAgree(!agree);
            }}
          >
            {agree ? (
              <ion-icon name="checkbox"></ion-icon>
            ) : (
              <ion-icon name="square"></ion-icon>
            )}
          </button>
          Remember me
        </p>
        <NavLink>Forgotten Password?</NavLink>
      </div>

      {loading ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
        >
          <span>
            <i className="bx bx-loader bx-spin"></i> Logging in
          </span>
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
        >
          <span>
            Login <ion-icon name="arrow-forward"></ion-icon>
          </span>
        </motion.button>
      )}

      <div className="switch">
        <p>Not a member?</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/auth/signup");
          }}
        >
          Create an account
        </button>
      </div>
    </StyledForm>
  );
};

export default Login;
