import { NavLink } from "react-router-dom";
import { StyledForm } from "../../components/Form/Form";
import { useState } from "react";

const Login = () => {
  const [agree, setAgree] = useState(false);
  return (
    <StyledForm
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
    >
      <h3>Log in to account.</h3>
      <input type="email" placeholder="Email Address" />
      <input type="password" placeholder="Password" />
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
      <button type="submit">
        Log in <ion-icon name="arrow-forward"></ion-icon>
      </button>
      <div className="switch">
        <p>Not a member?</p>
        <NavLink to={"/auth/signup"}>Create an account</NavLink>
      </div>
    </StyledForm>
  );
};

export default Login;
