import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { fixedHeight } from "../../Functions";
import I5 from "../../assets/img/img5.jpeg";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import User from "../Saas/User";

export const StyledAuth = styled(motion.section)`
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
    width: 40%;
    height: 100%;
  }
`;

const AuthPage = () => {
  const navigate = useNavigate()
  return (
    <StyledAuth>
      <div className="left" onClick={()=>{navigate("/")}}>
        <img src={I5} alt="" />
      </div>
      <div className="right center">
        <Routes>
          <Route
            path="/login/*"
            element={
              <AnimatePresence>
                <Login />
              </AnimatePresence>
            }
          />
          <Route
            path="/signup/*"
            element={
              <AnimatePresence>
                <Signup />
              </AnimatePresence>
            }
          />
          
        </Routes>
      </div>
    </StyledAuth>
  );
};

export default AuthPage;
