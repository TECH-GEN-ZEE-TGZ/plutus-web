import { NavLink } from "react-router-dom";
import { StyledForm } from "../../components/Form/Form";
import { useContext, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import AuthContext from "../../context/AuthContext";
import { makeapiCall } from "../../Functions";

const Login = () => {

  const { authInfo, seAuthInfo } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!agree) {
      setError("You must agree to the terms.");
      return;
    }

    setError(""); // Clear any previous errors
    setLoading(true);

    try {
      // Check if fields are filled
      if (username === "" || password === "") {
        setError("Please fill in both fields.");
        return;
      }

      // Call Google reCAPTCHA v3
      await grecaptcha.ready(async function () {
        const recaptchaToken = await grecaptcha.execute('6LeG0KEqAAAAAB0ij0gsJi4IFC6RC1dU-UpLFjfQ', { action: 'submit' });

        console.log("CAPTCHA Token:", recaptchaToken);

        // Send the token and form data to your backend
        const response = await fetch("http://localhost:9090/api/verify-captcha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "your-api-key" // Replace with your actual API key
          },
          body: JSON.stringify({
            token: recaptchaToken, // CAPTCHA token
            username: username,    // Include username
            password: password     // Include password
          }),
        });

        if (response.ok) {
          makeapiCall(username, password, setLoading(false), setError);
        } else {
          const errorResult = await response.json();
          setError(`CAPTCHA verification failed: ${errorResult.message || "Unknown error"}`);
          grecaptcha.reset(); // Reset the CAPTCHA if needed
        }
      });
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <StyledForm
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      onSubmit={handleSubmit}
    >
      <h3>Log in to account.</h3>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

      <button type="submit" disabled={loading}>
        {loading ? (
          <span>
            <ion-icon name="reload-outline" class="spin"></ion-icon> Logging in
          </span>
        ) : (
          <span>
            Log in <ion-icon name="arrow-forward"></ion-icon>
          </span>
        )}
      </button>

      <div className="switch">
        <p>Not a member?</p>
        <NavLink to={"/auth/signup"}>Create an account</NavLink>
      </div>
    </StyledForm>
  );
};

export default Login;
