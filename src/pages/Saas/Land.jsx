import { fixedHeight, fixedWidth } from "../../Functions";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { StyledLand } from "./SaasStyles";
import I1 from "../../assets/img/img1.png";
import I2 from "../../assets/img/img3.jpeg";
import I3 from "../../assets/img/img7.png";
import I4 from "../../assets/img/img6.png";
import I5 from "../../assets/img/connect.png";
import I6 from "../../assets/img/hold.jpg";
import HomeNav from "../../components/Navbar/HomeNav";
import Footer from "../../components/Footer/Footer";

const Land = () => {
  const sells = [
    {
      icon: <ion-icon name="arrow-down-outline"></ion-icon>,
      title: "Buy",
      text: "Use Apple Pay, Google Pay, or your card to buy crypto fast. We also accept PayPal, and wires in certain regions.",
    },
    {
      icon: <ion-icon name="arrow-up-outline"></ion-icon>,
      title: "Sell",
      text: "Selling cryptocurrency on MoonPay is simple. Sign up for a free account in seconds. Then add verification information to get started.",
    },
    {
      icon: <ion-icon name="swap-vertical-outline"></ion-icon>,
      title: "Swap",
      text: "Swap between tokens, even if they’re on different chains (we make bridging seamless too).",
    },
  ];
  const serveds = [
    {
      img: I4,
      head: "All in One",
      sub: "See your crypto and collectibles in one place.",
      par: "Bring together your wallets, so you can always see how your portfolio is doing. And if you don’t have a wallet yet, we can help with that too.",
    },
    {
      img: I5,
      head: "One for all",
      sub: "One account. Over 300 partners.",
      par: "Your PlutusPay account works with all our 300+ partners. So you can log in, see your details and wallets, and check out in no time.",
    },
  ];
  const numbers = [
    {
      title: "Crypto assets",
      count: "121",
      icon: <ion-icon name="albums-outline"></ion-icon>,
    },
    {
      title: "Crypto delivered",
      count: "$6B",
      icon: <ion-icon name="cloud-download-outline"></ion-icon>,
    },
    {
      title: "Accounts created",
      count: "20M",
      icon: <ion-icon name="people-circle-outline"></ion-icon>,
    },
    {
      title: "Countries supported",
      count: "180",
      icon: <ion-icon name="earth-outline"></ion-icon>,
    },
  ];

  return (
    <StyledLand className="">
      <HomeNav />
      <div className="movP">
        <img src={I3} alt="" />
      </div>
      <div className="movQ">
        <img src={I3} alt="" />
      </div>
      <div className="title">
        <h1>
          A whole world of crypto,
          <br /> in one simple account.
        </h1>
        <div className="img center">
          <img src={I1} alt="" />
        </div>
        <p>
          Now it’s easy to do more with crypto. Buy with a card, sell in a snap,
          and see your wallets in one place. It's all there in your PlutusPay
          account.
        </p>
      </div>
      <div className="bigBar center">
        <div className="slab">
          <img src={I2} alt="" />
        </div>
        <div className="tile">
          <div className="count center">
            <p>Trusted by millions of users</p>
            <h1>20,000,000+</h1>
          </div>
        </div>
      </div>
      <div className="seller center">
        <h1>From card to crypto - and back again</h1>
        <p>Buy, sell, and swap seamlessly.</p>
        <ul>
          {sells?.map((sell, index) => (
            <li key={index}>
              <div className="slab full">
                <div className="icon center">{sell?.icon}</div>
                <div className="mid">
                  <h4>{sell?.title}</h4>
                  <p>{sell?.text}</p>
                </div>
                <button>{sell?.title} crypto</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="serves">
        <div className="slab">
          <h1>Other services you may be interested in.</h1>
          <ul>
            {serveds?.map((served, index) => (
              <li key={index} className="center">
                <img src={served?.img} alt="" />
                <div className="slab">
                  <div className="top center">
                    <h1>{served?.head}</h1>
                  </div>
                  <div className="bottom">
                    <h3>{served?.sub}</h3>
                    <p>{served?.par}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="numbers center">
        <h1>PlutusPay in numbers</h1>
        <ul>
          {numbers?.map((number, index) => (
            <li>
              <div className="icon center">{number?.icon}</div>
              <h1>{number?.count}</h1>
              <h5>{number?.title}</h5>
            </li>
          ))}
        </ul>
      </div>
      <div className="cover">
        <div className="slab center">
          <img src={I6} alt="" />
          <div className="text">
            <h1>The future of money, now at your fingertips.</h1>
            <p>
              PlutusPay works everywhere you need it to. So you can always stay on
              top of your crypto.
            </p>
            <button>Get started</button>
          </div>
        </div>
      </div>
      <Footer />
    </StyledLand>
  );
};

export default Land;
