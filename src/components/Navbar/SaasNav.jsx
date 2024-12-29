import { motion } from "framer-motion";
import styled from "styled-components";
import { fixedHeight, fixedWidth } from "../../Functions";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const StyledNav = styled(motion.nav)`
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 7.5%;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
  > .logo {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    > p {
      color: black;
      font-size: ${fixedHeight(2.5)}px;
      font-weight: 900;
      cursor: pointer;
    }
  }
  > .links {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    list-style-type: none;
    width: 50%;
    height: 100%;
    > li {
      > a {
        color: black;
        text-decoration: none;
        font-size: ${fixedHeight(1.75)}px;
      }
    }
  }
  > .buttons {
    column-gap: ${fixedWidth(0.5)}px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 25%;
    height: 100%;
    > button, a {
      height: 65%;
      width: auto;
      background: transparent;
      border: 1px solid transparent;
      padding: 0 ${fixedWidth(1)}px;
      border-radius: 7.5px;
      font-size: ${fixedHeight(1.75)}px;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:nth-child(odd) {
          background: transparent;
          color: black;
          box-shadow: 0 0 2.5px 1px #0004;
      }
      &:nth-child(even) {
        background: black;
        color: white;
        outline: 1px solid black;
      }
    }
  }
`;

const SaasNav = () => {
  const { authInfo, setAuthInfo } = useContext(AuthContext);
  const navigate = useNavigate()
  return (
    <StyledNav>
      <div className="logo">
        <p
          onClick={() => {
            navigate("/");
          }}
        >
          The Plutus Home
        </p>
      </div>
      <ul className="links">
        <li>
          <NavLink>Buy Crypto</NavLink>
        </li>
        <li>
          <NavLink>Sell Crypto</NavLink>
        </li>
        <li>
          <NavLink>About</NavLink>
        </li>
        <li>
          <NavLink>Download</NavLink>
        </li>
      </ul>
      {authInfo?.token ? (<></>) : (<div className="buttons">
        <NavLink to={"/auth/login"}>Login</NavLink>
        <NavLink to={"/auth/signup"}>Sign up</NavLink>
      </div>)}
    </StyledNav>
  );
};

export default SaasNav;
