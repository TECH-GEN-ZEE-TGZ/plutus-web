import { useState } from "react";
import { StyledForm } from "../../components/Form/Form";
import { NavLink } from "react-router-dom";

const Signup = () => {
    const [agree, setAgree] = useState(false)
    return (
      <StyledForm
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.75 }}
      >
        <h3>Create an account.</h3>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <input type="text" placeholder="Enter Referral Code" />
        <select name="countries" id="">
          <option value="">Country</option>
        </select>
        <button type="submit">
          Sign up <ion-icon name="arrow-forward"></ion-icon>
        </button>
        <div className="link">
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
          <p>By signing up, you agree to our </p>
          <a href="#">Terms & Conditions</a>
        </div>
        <div className="switch">
          <p>Already a member?</p>
          <NavLink to={"/auth/login"}>Login</NavLink>
        </div>
      </StyledForm>
    );
}
 
export default Signup;