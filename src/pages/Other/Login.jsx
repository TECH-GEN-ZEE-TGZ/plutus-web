import { NavLink } from "react-router-dom";
import { StyledForm } from "../../components/Form/Form";
import { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
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
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      console.log("Login successful", response.data);
      // Handle success (e.g., save token, redirect user)
    } catch (err) {
      console.error("Login error", err);
      setError("Invalid email or password.");
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
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
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
