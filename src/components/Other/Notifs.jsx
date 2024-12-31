import { motion } from "framer-motion";
import styled from "styled-components";
import { fixedHeight, fixedWidth } from "../../Functions";

const StyledNotifs = styled(motion.aside)`
display: none;
z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  width: ${fixedWidth(30)}px;
  height: ${fixedHeight(35)}px;
  background: blue;
`;

const Notifs = () => {
  return <StyledNotifs></StyledNotifs>;
};

export default Notifs;
