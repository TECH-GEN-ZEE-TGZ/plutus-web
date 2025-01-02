import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import {
  fixedHeight,
  fixedWidth,
  motionContainer,
  motionContainerL,
  motionItem,
} from "../../Functions";
import ContextVariables from "../../context/ContextVariables";
import { useContext } from "react";

const StyledNotifs = React.memo(styled(motion.aside)`
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  margin: 0 35%;
  min-height: ${fixedHeight(7.5)}px;
  height: auto;
  background: #fff0;
  > ul {
    list-style-type: none;
    width: 100%;
    height: auto;
    padding: ${fixedHeight(2)}px ${fixedWidth(0.5)}px;
    display: flex;
    flex-direction: column;
    row-gap: ${fixedHeight(1)}px;
    > li {
      width: 100%;
      min-height: ${fixedHeight(7.5)}px;
      background: #9e5dad;
      color: white;
      border-radius: 15px;
      font-size: ${fixedHeight(1.75)}px;
      padding: ${fixedWidth(1)}px;
      display: flex;
      flex-direction: column;
      row-gap: ${fixedHeight(1)}px;
      > .top {
        justify-content: space-between;
        width: 100%;
        > p {
          font-size: ${fixedHeight(1.5)}px;
        }
      }
      > p {
        font-size: ${fixedHeight(1.75)}px;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    &{
      width: 95%;
      margin: 0 2.5%;
    }
  }
`);

const Notifs = () => {
  const { allNotifs } = useContext(ContextVariables);

  return (
    <StyledNotifs>
      <motion.ul
        // layout
        variants={motionContainerL}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {allNotifs.map((notif, index) => (
            <Notif key={index} notif={notif} index={index} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </StyledNotifs>
  );
};

export default Notifs;

const Notif = ({ notif, index }) => {
  return (
    <motion.li
      style={{
        background:
          notif?.type?.toLowerCase() === "success"
            ? "limegreen"
            : notif?.type?.toLowerCase() === "error"
            ? "red"
            : "",
      }}
      variants={motionItem}
      key={index}
      className=""
    >
      <div className="top al-c">
        <p>
          {notif?.type?.toLowerCase() === "success" ? (
            <i className="bx bxs-check-circle bx-tada"></i>
          ) : notif?.type?.toLowerCase() === "error" ? (
            <i className="bx bxs-error bx-tada"></i>
          ) : (
            <></>
          )}
          {notif?.type}
        </p>
        <p>{new Date(notif?.date).toLocaleString()}</p>
      </div>
      <p>{notif?.message}</p>
    </motion.li>
  );
};
