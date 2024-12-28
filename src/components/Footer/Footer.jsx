import { motion } from "framer-motion";
import styled from "styled-components";
import { fixedHeight, fixedWidth } from "../../Functions";
import { NavLink } from "react-router-dom";

const StyledFooter = styled(motion.footer)`
  width: 100%;
  height: auto;
  padding: ${fixedHeight(5)}px 12.5%;
  display: flex;
  flex-direction: column;
  row-gap: ${fixedHeight(5)}px;
  background: hsl(288.75, 40%, 30%);

  > .top {
    width: 100%;
    display: flex;
    height: auto;
    list-style-type: none;
    grid-template-columns: repeat(5, 1fr);
    > li {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: ${fixedHeight(1.25)}px;
      > h5 {
        font-size: ${fixedHeight(2)}px;
        color: #ddb9e5;
      }
      > a {
        color: rgb(255, 255, 255, 0.75);
        text-decoration: none;
        font-size: ${fixedHeight(1.5)}px;
      }
    }
  }
  > .mid {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .icons {
      display: flex;
      align-items: center;
      column-gap: ${fixedWidth(2.5)}px;
      > a {
        text-decoration: none;
        color: white;
        font-size: ${fixedHeight(3.5)}px;
      }
    }
    > .lang {
      background: transparent;
      color: white;
      font-size: ${fixedHeight(1.75)}px;
    }
  }
  > .bottom {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    > .uno {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > form {
        width: auto;
        /* border: 1px solid red; */
        display: flex;
        align-items: center;
        column-gap: ${fixedWidth(0.25)}px;
        > input {
          height: ${fixedHeight(4)}px;
          width: ${fixedWidth(20)}px;
          padding: 0 2.5%;
          border-radius: 7.5px;
          font-size: ${fixedHeight(1.35)}px;
          &::placeholder {
            color: #9e5dad;
          }
        }
        > button {
          height: ${fixedHeight(4)}px;
          width: auto;
          padding: 0 ${fixedWidth(2)}px;
          background: linear-gradient(
            135deg,
            hsl(288.75, 40%, 30%),
            hsl(289.09, 55%, 45%) /* Medium purple */
          );
          color: white;
          border-radius: 7.5px;
          font-size: ${fixedHeight(1.35)}px;
        }
      }
    }
  }
`;

const Footer = () => {
  const links = [
    {
      title: "Buy",
      urls: [
        "Buy Bitcoin",
        "Buy Ethereum",
        "Buy USDT",
        "Buy Solana",
        "Buy Cardano",
      ],
    },
    {
      title: "Sell",
      urls: [
        "Sell Bitcoin",
        "Sell Ethereum",
        "Sell USDT",
        "Sell USDC",
        "Sell Solana",
      ],
    },
    {
      title: "Swap",
      urls: [
        "Swap Bitcoin",
        "Swap Ethereum",
        "Swap USDT",
        "Swap Solana",
        "Swap Cardano",
      ],
    },
    {
      title: "Crypto Price",
      urls: [
        "Bitcoin Price",
        "Ethereum Price",
        "Dogecoin Price",
        "XRP Price",
        "Cardano Price",
      ],
    },
    {
      title: "Legal",
      urls: ["Licenses", "Privacy Policy", "Cookie Policy", "Terms of Use"],
    },
  ];
  return (
    <StyledFooter>
      <ul className="top">
        {links?.map((link, index) => (
          <li key={index}>
            <h5>{link?.title}</h5>
            {link?.urls?.map((url, index) => (
              <a href="">{url}</a>
            ))}
          </li>
        ))}
      </ul>
      <div className="mid">
        <div className="icons">
          <a href="">
            <i className="bx bxl-facebook-square"></i>
          </a>
          <a href="">
            <i className="bx bxl-linkedin-square"></i>
          </a>
          <a href="">
            <i className="bx bxl-instagram-alt"></i>
          </a>
          <a href="">
            <i className="bx bxl-youtube"></i>
          </a>
        </div>
        <button className="lang">
          <ion-icon name="globe-outline"></ion-icon> English(UK)
        </button>
      </div>
      <div className="bottom">
        <div className="uno">
          <form>
            <input type="email" placeholder="Email address" />
            <button>Subscribe</button>
          </form>
          <div className="download"></div>
        </div>
        <div className="dos"></div>
        <div className="tre"></div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
