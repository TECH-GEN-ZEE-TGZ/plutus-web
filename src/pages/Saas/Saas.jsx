import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Login from "../Other/Login";
import Signup from "../Other/Signup";
import Land from "./Land";
import { fixedHeight } from "../../Functions";
import AuthPage from "../Other/AuthPage";
import User from "./User";

const StyledSaas = styled(motion.nav)`
  width: 100%;
  min-height: ${fixedHeight(100)}px;
  height: auto;
  background: #ecf1f4;
`;

const Saas = () => {
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
              <User />
            </AnimatePresence>
          }
        />
      </Routes>
    </StyledSaas>
  );
};

export default Saas;
