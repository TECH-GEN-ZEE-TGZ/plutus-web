import { motion } from "framer-motion";
import styled from "styled-components";
import { fixedHeight, fixedWidth } from "../../Functions";
import ContextVariables from "../../context/ContextVariables";
import { useContext } from "react";

const StyledNotifs = styled(motion.aside)`
  /* display: none; */
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  margin: 0 35%;
  min-height: ${fixedHeight(7.5)}px;
  height: auto;
  background: blue;
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
      min-height: ${fixedHeight(5)}px;
      height: auto;
      background: gold;
      border-radius: 15px;
    }
  }
`;

const Notifs = () => {
  const { allNotifs, setAllNotifs } = useContext(ContextVariables);

  // const notif1 = {
  //   type: "Success",
  //   message: "You have a new message from KingPlutus",
  //   date: Date.now(),
  // }
  // const notif2 = {
  //   type: "Error",
  //   message: "You have a new message from KingPlutus",
  //   date: Date.now(),
  // }

  return (
    <StyledNotifs>
      <ul>
        {allNotifs.map((notif, index) => (
          <Notif notif={notif} index={index} />
        ))}
      </ul>
    </StyledNotifs>
  );
};

export default Notifs;


const Notif = ({ notif, index }) => {
    
  return (
    <li key={index}>
      <p>{notif?.type}</p>
      <p>{notif?.message}</p>
      <p>{new Date(notif?.date).toLocaleString()}</p>
    </li>
  );
}