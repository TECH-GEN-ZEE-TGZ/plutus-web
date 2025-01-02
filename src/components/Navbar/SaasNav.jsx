import { motion } from "framer-motion";
import styled from "styled-components";
import { fixedHeight, fixedWidth } from "../../Functions";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Logo from "../../assets/img/log.png"

const StyledNav = styled(motion.nav)`
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 7.5%;
  padding-right: 5%;
  padding-left: 2%;
  padding-top: 2%;
  padding-bottom: 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
  > .logo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
    width: ${fixedHeight(10)}px;
    height: ${fixedHeight(10)}px;

    > p {
      display: none;
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
  > .account {
    column-gap: ${fixedWidth(0.5)}px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 25%;
    width: auto;
    height: 100%;
    .logout {
      width: ${fixedHeight(5)}px;
      height: ${fixedHeight(5)}px;
      border-radius: 50%;
      background: #0000;
      > ion-icon {
        font-size: ${fixedHeight(2.5)}px;
        color: #9e5dad;
      }
    }
    .img {
      width: ${fixedHeight(5)}px;
      height: ${fixedHeight(5)}px;
      border-radius: 50%;
      background: #9e5dad;
      > h1 {
        font-size: ${fixedHeight(2)}px;
        color: white;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      text-align: right;
      > p {
        font-size: ${fixedHeight(1.5)}px;
      }
      > h4 {
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
    > button,
    a {
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
  const navigate = useNavigate();
  return (
    <StyledNav>
      <div
        className="logo"
        onClick={() => {
          navigate("/user/buy");
        }}
      >
        <p>The Plutus Home</p>
        <img src={Logo} alt=""/>
      </div>
      {!authInfo?.token && (
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
      )}
      {authInfo?.token ? (
        <div className="account">
          <div className="text">
            <p>{authInfo?.username || "username"}</p>
            <h4>{authInfo?.email || "email address"}</h4>
          </div>
          <div className="img center">
            {authInfo?.image ? <img src="" alt="" /> : <h1>AN</h1>}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              localStorage.removeItem("plutusAuth");
              setAuthInfo({ username: "", token: "", email: "" });
            }}
            className="logout center"
          >
            <ion-icon name="log-out"></ion-icon>
          </motion.button>
        </div>
      ) : (
        <div className="buttons">
          <NavLink to={"/auth/login"}>Login</NavLink>
          <NavLink to={"/auth/signup"}>Sign up</NavLink>
        </div>
      )}
    </StyledNav>
  );
};

export default SaasNav;
