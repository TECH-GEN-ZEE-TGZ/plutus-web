import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { fixedHeight, fixedWidth } from "../../Functions";
import I5 from "../../assets/img/img5.jpeg";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { useContext, useEffect } from "react";


export const StyledPay = styled(motion.section)`
  width: 100%;
  height: ${fixedHeight(100)}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #e8d7fa;
  > .left {
    width: 60%;
    height: 100%;
    overflow: hidden;
    border-radius: 0 25px 25px 0;
    > img {
      position: absolute;
      z-index: 1;
    }
    > h1 {
      color: white;
      font-size: ${fixedHeight(5)}px;
      z-index: 2;
    }
  }
  > .right {
    width: 100%;
    height: 100%;
    > .payDone {
      width: 40%;
      min-height: ${fixedHeight(40)}px;
      height: auto;
      /* border: 1px solid red; */
      flex-direction: column;
      row-gap: ${fixedHeight(2.5)}px;
      > h3 {
        width: auto;
        height: auto;
        font-size: ${fixedHeight(5)}px;
        > svg {
          width: ${fixedWidth(10)}px;
          height: ${fixedWidth(10)}px;
        }
        > svg.failed {
          fill: red;
        }
        > svg.success {
          fill: lime;
        }
      }
      > h1 {
        font-size: ${fixedHeight(5)}px;
      }
      > p {
        font-size: ${fixedHeight(2.5)}px;
      }
    }
  }
`;

const Payment = () => {
  const navigate = useNavigate();
  return (
    <StyledPay>
      <div className="right center">
        <Routes>
          <Route
            path="/success/*"
            element={
              <AnimatePresence>
                <PayDone type={"success"} />
              </AnimatePresence>
            }
          />
          <Route
            path="/failed/*"
            element={
              <AnimatePresence>
                <PayDone type={"failed"} />
              </AnimatePresence>
            }
          />
        </Routes>
      </div>
    </StyledPay>
  );
};

export default Payment;

import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ContextVariables from "../../context/ContextVariables";
import AuthContext from "../../context/AuthContext";

const PayDone = ({ type }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const checkoutId = searchParams.get("checkoutid");
  const { domain, apiKey } = useContext(ContextVariables);
  const { authInfo } = useContext(AuthContext);

  useEffect(() => {
    const performCheckoutActions = async () => {
      if (checkoutId) {
        try {
          const response = await axios.get(
            `${domain}/optimus/v1/api/payment/verify/${checkoutId}`,
            {
              headers: {
                'Authorization': `Bearer ${authInfo?.token}`,
                'X-API-KEY': apiKey,
                'Content-Type': 'application/json'
              }
            }
          );

          if (response.status === 200) {
            console.log("Payment verification successful:");
          } else {
            console.error("Payment verification failed:");
          }
        } catch (error) {
          console.log(`The apiKey is: ${apiKey}`);
          console.error(error.response.data);
        }
      }
      setTimeout(() => {
        navigate("/user/buy");
      }, 2000);
    };

    performCheckoutActions();
  }, [checkoutId, domain, authInfo, apiKey, navigate]);

  return (
    <div className="payDone center">
      {type.toLowerCase() === "success" ? (
        <>
          <h3>
            <svg
              className="success"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path>
            </svg>
          </h3>
          <h1>Payment Successful</h1>
          <p><i className="bx bx-loader bx-spin"></i>Returning to user profile...</p>
        </>
      ) : type.toLowerCase() === "failed" ? (
        <>
          <h3>
            <svg
              className="failed"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"></path>
            </svg>
          </h3>
          <h1>Payment Unsuccessful</h1>
          <p><i className="bx bx-loader bx-spin"></i>Returning to user profile...</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
