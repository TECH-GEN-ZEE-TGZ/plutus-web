import { motion } from "framer-motion";
import styled from "styled-components";
import { fixedHeight, fixedWidth } from "../../Functions";

export const StyledForm = styled(motion.form)`
  width: ${fixedWidth(27.5)}px;
  height: auto;
  display: flex;
  flex-direction: column;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  padding: ${fixedHeight(5)}px;
  background: transparent;
  row-gap: ${fixedHeight(1.5)}px;
  > h3 {
    font-size: ${fixedHeight(5)}px;
    color: hsl(288.75, 40%, 30%);
  }
  > input,
  select {
    border: 1px solid silver;
    border-radius: 7.5px;
    height: ${fixedHeight(6)}px;
    padding: 0 5%;
    font-size: ${fixedHeight(1.75)}px;
  }
  > button {
    border-radius: 7.5px;
    height: ${fixedHeight(6)}px;
    /* background: black; */
    background: linear-gradient(
      135deg,
      hsl(288.75, 40%, 30%),
      hsl(289.09, 55%, 45%) /* Medium purple */
    );
    color: white;
    font-size: ${fixedHeight(2)}px;
  }
  > .remember {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > p {
      display: flex;
      align-items: center;
      color: black;
      font-size: ${fixedHeight(1.75)}px;
      font-weight: 600;
      > button {
        background: transparent;
        > ion-icon {
          font-size: ${fixedHeight(3)}px;
          color: silver;
          &[name="checkbox"] {
            color: lime;
          }
        }
      }
    }
    > a {
      font-size: ${fixedHeight(1.75)}px;
    }
  }
  > .link {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    align-items: center;
    column-gap: ${fixedWidth(0.375)}px;
    > button {
      width: ${fixedHeight(2.5)}px;
      height: ${fixedHeight(2.5)}px;
      background: transparent;
      border-radius: 7.5px;
      transition: 250ms ease-in-out;
      > ion-icon {
        color: silver;
        font-size: ${fixedHeight(3)}px;

        &[name="checkbox"] {
          color: lime;
        }
      }
    }
    > p {
      font-size: ${fixedHeight(1.75)}px;
      font-weight: 600;
      color: black;
    }
    > a {
      color: black;
      text-decoration: underline;
      font-size: ${fixedHeight(1.75)}px;
      font-weight: 600;
    }
  }
  > .switch {
    display: flex;
    width: 100%;
    height: auto;
    align-items: center;
    column-gap: ${fixedWidth(0.375)}px;

    > p {
      font-size: ${fixedHeight(1.75)}px;
      color: grey;
    }
    > a {
      color: black;
      text-decoration: underline;
      font-size: ${fixedHeight(1.75)}px;
    }
  }
`;