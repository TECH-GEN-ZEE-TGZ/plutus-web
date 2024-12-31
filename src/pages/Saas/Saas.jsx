import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Login from "../Other/Login";
import Signup from "../Other/Signup";
import Land from "./Land";
import { fixedHeight } from "../../Functions";
import AuthPage from "../Other/AuthPage";
import User from "./User";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

const StyledSaas = styled(motion.nav)`
  width: 100%;
  min-height: ${fixedHeight(100)}px;
  height: auto;
  background: #ecf1f4;
`;

const Saas = () => {
  const { authInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    !authInfo?.token && navigate("/auth/login");
  }, [authInfo?.token, navigate]);
  return (
    <StyledSaas className="center">
      <Routes>
        <Route
          path="/auth/*"
          element={
            <AnimatePresence>
              <AuthPage />
            </AnimatePresence>
          }
        />
        <Route
          path="/"
          element={
            <AnimatePresence>
              <Land />
            </AnimatePresence>
          }
        />
        <Route
          path="/user/*"
          element={
            <AnimatePresence>
              {authInfo?.token ? <User /> : <></>}
              {/* <User /> */}
            </AnimatePresence>
          }
        />
      </Routes>
    </StyledSaas>
  );
};

export default Saas;
