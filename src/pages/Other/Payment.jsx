import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ContextVariables from "../../context/ContextVariables";
import AuthContext from "../../context/AuthContext";
import styled from "styled-components";
import { fixedHeight, fixedWidth } from "../../Functions";
import I5 from "../../assets/img/img5.jpeg";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { StyledForm } from "../../components/Form/Form";
import { useContext, useEffect, useState } from "react";


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
    display: flex;
    align-items: center;
    justify-content: center;
    > .payDone {
      width: 40%;
      min-height: ${fixedHeight(40)}px;
      height: auto;
      flex-direction: column;
      row-gap: ${fixedHeight(2.5)}px;
      > h3 {
        width: auto;
        height: auto;
        font-size: ${fixedHeight(4)}px;
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
        font-size: ${fixedHeight(4)}px;
      }
      > p {
        font-size: ${fixedHeight(2.25)}px;
      }
    }

    > .paymentProcess {
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 50%;
      border: 1px solid white;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: ${fixedHeight(5)}px;
      
       > .progress-bar {
          width: 90%;
          background-color: #ddd;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 20px;

          > .progress {
            height: 100%;
            background-color: hsl(288.75, 40%, 30%);
            width: 0%; 
            transition: width 0.4s ease-in-out;
          }
        }
      > .step1, .step2, .step3 {
          width: ${fixedWidth(27.5)}px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: ${fixedHeight(5)}px;
          background: transparent;
          row-gap: ${fixedHeight(1.5)}px;

        > h3 {
          font-size: ${fixedHeight(3)}px;
          color: hsl(288.75, 40%, 30%);
          align-self: center;
        }

        > p {
          font-size: ${fixedHeight(1.75)}px;

          > span {
            font-size: ${fixedHeight(2)}px;
            font-weight: 600;
          }
        }
          
        > .error {
          font-size: ${fixedHeight(2)}px;
          color: red;
        }
      
        > input,
        select {
          border: 1px solid silver;
          border-radius: 7.5px;
          height: ${fixedHeight(6)}px;
          padding: 0 5%;
          margin: 2% 0;
          font-size: ${fixedHeight(2)}px;
        }
        > button {
          border-radius: 7.5px;
          height: ${fixedHeight(6)}px;
          background: linear-gradient(
            135deg,
            hsl(288.75, 40%, 30%),
            hsl(289.09, 55%, 45%)
          );
          color: white;
          font-size: ${fixedHeight(2.1)}px;
        }

        > .cancel {
          border-radius: 7.5px;
          height: ${fixedHeight(6)}px;
          background: transparent;
          color: hsl(288.75, 40%, 30%);
          border: 2px solid hsl(288.75, 40%, 30%);
          font-size: ${fixedHeight(2.1)}px;
          font-weight: 700;
        }
      }

      @media only screen and (max-width: 768px) {
        & {
          width: 100%;
          > h3 {
            text-align: center;
          }
        }
      }
    }
  }
`;

const Payment = () => {
  return (
    <StyledPay>
      <div className="right">
        <Routes>
          <Route
            path="/"
            element={
              <AnimatePresence>
                <PaymentProcess />
              </AnimatePresence>
            }
          />
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



const PayDone = ({ type }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const checkoutId = searchParams.get("checkoutid");
  useEffect(() => {
    // const performCheckoutActions = async () => {
    //   if (checkoutId) {
    //     try {
    //       const response = await axios.get(
    //         `${domain}/optimus/v1/api/payment/verify/${checkoutId}`,
    //         {
    //           headers: {
    //             'Authorization': `Bearer ${authInfo?.token}`,
    //             'X-API-KEY': apiKey,
    //             'Content-Type': 'application/json'
    //           }
    //         }
    //       );

    //       if (response.status === 200) {
    //         console.log("Payment verification successful:");
    //       } else {
    //         console.error("Payment verification failed:");
    //       }
    //     } catch (error) {
    //       console.log(`The apiKey is: ${apiKey}`);
    //       console.error(error.response.data);
    //     }
    //   }
    //   setTimeout(() => {
    //     navigate("/user/buy", { state: { reload: true } });
    //   }, 2000);
    // };
    // performCheckoutActions();

    setTimeout(() => {
      navigate("/user/buy", { state: { reload: true } });
    }, 2000);
  }, []);

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


function PaymentProcess() {
  const [currentStep, setCurrentStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePhoneNumberSubmit = () => {
    console.log('Phone number submitted:', phoneNumber);
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(2); // Move to next step only on success
    }, 1000);
  };

  const handleVerificationSubmit = () => {
    console.log('Verification code submitted:', verificationCode);
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(3); // Move to final step only on success
    }, 1000);
  };

  const handlePayment = () => {
    console.log('Payment processed');
    navigate('/payment/success'); // Redirect on successful payment
  };

  const handleCancel = () => {
    setCurrentStep(1); // Reset to first step or handle cancellation
    setPhoneNumber('');
    setVerificationCode('');
  };

  const closePage = () => {
    navigate('/payment/failed'); // Redirect on successful payment
  }

  return (
    <div className="paymentProcess">
      <button onClick={closePage} style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'red' }}>
        <ion-icon name="close" size="large"></ion-icon>
      </button>
      <div className="progress-bar">
        <div style={{ width: `${(currentStep / 3) * 100}%`, height: '5px', backgroundColor: 'hsl(288.75, 40%, 30%);' }} className="progress"></div>
      </div>
      {
        currentStep === 1 && (
          <div className="step1">
            <h3>Enter your payment number</h3>
            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="error">
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="233XXXXXXXXX"
            />
            {loading ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                disabled={loading}
              >
                <span>
                  <i className="bx bx-loader bx-spin"></i> Sending Code...
                </span>
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handlePhoneNumberSubmit}
              >
                <span>
                  Send Code <ion-icon name="arrow-forward"></ion-icon>
                </span>
              </motion.button>
            )}
          </div>
        )
      }
      {
        currentStep === 2 && (
          <div className="step2">
            <h3>Enter Verification Code</h3>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Verification Code"
            />
            {loading ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                disabled={loading}
              >
                <span>
                  <i className="bx bx-loader bx-spin"></i> Verifying...
                </span>
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleVerificationSubmit}
              >
                <span>
                  Verify <ion-icon name="arrow-forward"></ion-icon>
                </span>
              </motion.button>
            )}
          </div>
        )
      }
      {
        currentStep === 3 && (
          <div className="step3">
            <h3>Confirm Payment</h3>
            <p>Make Payment of Amount to #123456789</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handlePayment}
            >
              <span>
                Payment Made <ion-icon name="arrow-forward"></ion-icon>
              </span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              className="cancel"
              onClick={handleCancel}
            >
              <span>
                Cancel <ion-icon name="arrow-back"></ion-icon>
              </span>
            </motion.button>
          </div>
        )
      }
    </div>
  );
}
