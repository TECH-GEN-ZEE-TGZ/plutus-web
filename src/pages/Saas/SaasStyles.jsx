import { motion } from "framer-motion";
import { fixedHeight, fixedWidth } from "../../Functions";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import I2 from "../../assets/img/img4.jpeg";

export const StyledLand = styled(motion.section)`
  width: 100%;
  min-height: ${fixedHeight(100)}px;
  height: auto;
  display: flex;
  flex-direction: column;
  /* border: 5px solid red; */
  /* background: #1a1e3a; */
  /* background: #ddb9e5; */
  /* background: #9e5dad; */
  background: #e8d7fa;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  > .movQ {
    position: absolute;
    right: 2.5%;
    top: 6.25%;
    width: 25%;
    height: auto;
    > img {
      height: auto;
      object-fit: contain;
    }
  }

  > .movP {
    position: absolute;
    left: 2.5%;
    top: 6.25%;
    /* border: 1px solid red; */
    width: 25%;
    height: auto;
    > img {
      height: auto;
      object-fit: contain;
    }
  }
  > .title {
    width: 100%;
    height: ${fixedHeight(100)}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 5%;
    text-align: center;
    > h1 {
      font-size: ${fixedHeight(7.5)}px;
      font-weight: 900;
      color: hsl(288.75, 40%, 30%);
    }
    > p {
      font-size: ${fixedHeight(2)}px;
      line-height: ${fixedHeight(3)}px;
      padding: 0 25%;
    }
    > .img {
      width: 100%;
      height: auto;
      > img {
        object-fit: contain;
        width: 100%;
        height: ${fixedHeight(30)}px;
      }
    }
  }
  > .bigBar {
    width: 100%;
    height: ${fixedHeight(100)}px;
    display: flex;
    flex-direction: column;
    > .slab {
      width: 75%;
      height: 75%;
      background: white;
      border-radius: 20px;
      transform: translateY(-40%);
      overflow: hidden;
      box-shadow: 0 0px 7.5px rgba(72, 40, 96, 0.3),
        /* Soft inner purple */ 0 0px 15px rgba(145, 100, 175, 0.4),
        /* Soft pinkish purple */ 0 0px 5px rgba(0, 0, 0, 0.15); /* Light neutral depth */
    }
    > .tile {
      display: flex;
      /* display: none; */
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40%;
      align-items: center;
      justify-content: space-between;
      padding: 0 12.5%;
      > .left {
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        row-gap: ${fixedHeight(2.5)}px;
        padding: 2.5% 0;
        /* place-content: center; */
        > h1 {
          font-size: ${fixedHeight(5)}px;
          line-height: 0.75;
        }
        > p {
          font-size: ${fixedHeight(2)}px;
          line-height: ${fixedHeight(3)}px;
        }
      }
      > .right {
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        place-content: center;
        > img {
          height: 100%;
          width: auto;
          object-fit: contain;
        }
      }
      > .count {
        width: 100%;
        height: 100%;
        flex-direction: column;
        > p {
          font-size: ${fixedHeight(2)}px;
        }
        > h1 {
          font-size: ${fixedHeight(20)}px;
          background: linear-gradient(
            90deg,
            hsl(40.69565217391305, 90.5511811023622%, 49.80392156862745%),
            hsl(289.0909090909091, 45.833333333333336%, 81.17647058823529%),
            hsl(289.0909090909091, 45.833333333333336%, 81.17647058823529%)
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
  > .seller {
    width: 100%;
    height: auto;
    padding: ${fixedHeight(5)}px 0;
    flex-direction: column;
    row-gap: ${fixedHeight(1)}px;
    > h1 {
      font-size: ${fixedHeight(5)}px;
    }
    > p {
      font-size: ${fixedHeight(2)}px;
    }
    > ul {
      padding: ${fixedHeight(2.5)}px 12.5% 0;
      width: 100%;
      height: auto;
      list-style-type: none;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(1, 1fr);
      column-gap: ${fixedWidth(1)}px;
      > li {
        width: 100%;
        height: ${fixedHeight(40)}px;
        > .slab {
          border-radius: 15px;
          background: linear-gradient(
            -45deg,
            hsl(288.75, 32.78688524590165%, 52.156862745098046%),
            hsl(289.0909090909091, 45.833333333333336%, 81.17647058823529%)
          );
          padding: ${fixedHeight(2.5)}px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          box-shadow: 0 2px 3.75px rgba(72, 40, 96, 0.075),
            0 4px 7.5px rgba(145, 100, 175, 0.1),
            0 1px 2.5px rgba(0, 0, 0, 0.0375);
          > .icon {
            width: ${fixedHeight(5)}px;
            height: ${fixedHeight(5)}px;
            border-radius: 7.5px;
            background: linear-gradient(
              135deg,
              hsl(41, 90%, 75%),
              hsl(40.7, 90.6%, 49.8%)
            );
            box-shadow: 0 2px 10px rgba(252, 214, 116, 0.6),
              0 4px 20px rgba(107, 74, 133, 0.4);
            font-size: ${fixedHeight(3)}px;
            color: white;
          }
          > .mid {
            display: flex;
            flex-direction: column;
            row-gap: ${fixedHeight(1)}px;
            > h4 {
              font-size: ${fixedHeight(2.5)}px;
            }
            > p {
              font-size: ${fixedHeight(1.75)}px;
            }
          }
          > button {
            height: ${fixedHeight(5)}px;
            padding: 0 ${fixedWidth(1)}px;
            border-radius: 15px;
            /* background: #1a1e3a; */
            color: white;
            font-size: ${fixedHeight(1.75)}px;
            box-shadow: 0 0.1px 2px rgba(72, 40, 96, 0.05),
              0 4px 8px rgba(0, 0, 0, 0.125); /* Neutral shadow for depth */
            background: linear-gradient(
              135deg,
              hsl(288.75, 40%, 30%),
              hsl(289.09, 55%, 45%) /* Medium purple */
            );
          }
        }
      }
    }
  }
  > .serves {
    width: 100%;
    height: ${fixedHeight(100)}px;
    padding: ${fixedHeight(1)}px;
    > .slab {
      width: 100%;
      height: 100%;
      background: #9e5dad;
      border-radius: 25px;
      padding: 0 5%;
      > h1 {
        font-size: ${fixedHeight(5)}px;
        line-height: ${fixedHeight(22.5)}px;
        color: white;
        /* border: 1px solid red; */
      }
      > ul {
        width: 100%;
        height: 65%;
        list-style-type: none;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        column-gap: ${fixedWidth(1)}px;
        padding: 0 8%;
        > li {
          display: flex;
          flex-direction: column;
          width: 50%;
          height: 100%;
          background: #ddb9e5;
          border-radius: 20px;
          box-shadow: 0 2px 7.5px rgba(72, 40, 96, 0.15),
            0 4px 15px rgba(145, 100, 175, 0.2), 0 1px 5px rgba(0, 0, 0, 0.075);
          > img {
            position: absolute;
            z-index: 1;
            object-fit: contain;
            scale: 0.65;
          }
          .slab {
            z-index: 2;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            > .top {
              width: 100%;
              height: 20%;
              > h1 {
                font-size: ${fixedHeight(3.5)}px;
                text-transform: uppercase;
                /* color: #9e5dad; */
                color: hsl(288.75, 40%, 30%);
                font-weight: 900;
              }
            }
            > .bottom {
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: column;
              row-gap: ${fixedHeight(1.25)}px;
              padding: ${fixedHeight(5)}px ${fixedWidth(2)}px;
              > h3 {
                font-size: ${fixedHeight(2.5)}px;
              }
              > p {
                font-size: ${fixedHeight(1.75)}px;
              }
            }
          }
        }
      }
    }
  }
  > .numbers {
    width: 100%;
    height: auto;
    padding: ${fixedHeight(10)}px 0;
    flex-direction: column;
    row-gap: ${fixedHeight(5)}px;
    > h1 {
      font-size: ${fixedHeight(5)}px;
      text-align: center;
    }
    > ul {
      width: 100%;
      height: auto;
      list-style-type: none;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(1, 1fr);
      column-gap: ${fixedWidth(1)}px;
      padding: 0 12.5%;
      > li {
        width: 100%;
        height: auto;
        aspect-ratio: 1/1;
        background: #ddb9e5;
        border-radius: 15px;
        padding: ${fixedWidth(1)}px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        > .icon {
          width: auto;
          height: auto;
          > ion-icon {
            font-size: ${fixedHeight(2.5)}px;
            color: hsl(288.75, 40%, 30%);
          }
        }
        > h1 {
          /* color: hsl(288.75, 40%, 30%); */
          background: linear-gradient(
            135deg,
            hsl(40.7, 90.6%, 49.8%),
            hsl(41, 90%, 75%)
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          font-size: ${fixedHeight(7.5)}px;
        }
        > h5 {
          font-size: ${fixedHeight(1.75)}px;
          color: #9e5dad;
        }
      }
    }
  }
  > .cover {
    width: 100%;
    height: ${fixedHeight(70)}px;
    padding: ${fixedHeight(1)}px;
    > .slab {
      width: 100%;
      height: 100%;
      background: rgb(158, 93, 173, 0.125);
      border-radius: 25px;
      overflow: hidden;
      > img {
        position: absolute;
        z-index: 1;
        filter: brightness(0.35);
        mix-blend-mode: multiply;
      }
      > .text {
        z-index: 2;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: ${fixedHeight(2.5)}px;
        > h1 {
          font-size: ${fixedHeight(5)}px;
          padding: 0 15%;
          color: white;
        }
        > p {
          color: silver;
          font-size: ${fixedHeight(2)}px;
          line-height: ${fixedHeight(3)}px;
          padding: 0 20%;
        }
        > button {
          width: auto;
          height: ${fixedHeight(5)}px;
          padding: 0 5%;
          background: white;
          color: black;
          font-size: ${fixedHeight(2)}px;
          border-radius: 15px;
        }
      }
    }
  }
`;

export const StyledUser = styled(motion.main)`
  width: 100%;
  height: ${fixedHeight(100)}px;
  background: #e8d7fa;

  > .routes {
    width: 100%;
    height: calc(100% - 7.5%);
    display: flex;
    flex-direction: column;
  }

  #dashboard {
    /* border: 2px solid gold; */
    width: 100%;
    min-height: ${fixedHeight(149)}px;
    height: auto;
    display: flex;
    flex-direction: column;
    row-gap: ${fixedHeight(2.5)}px;
    > .trades {
      width: 100%;
      height: ${fixedHeight(7.5)}px;
      padding: 0 2.5% 0;
      > .slab {
        width: 100%;
        height: 100%;
        border-radius: ${fixedHeight(50)}px;
        background: #9e5dad;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${fixedWidth(0.5)}px;
        > .balance {
          width: auto;
          display: flex;
          align-items: center;
          column-gap: ${fixedHeight(0.5)}px;
          > .icon {
            width: ${fixedHeight(5)}px;
            height: ${fixedHeight(5)}px;
            border-radius: 50%;
            background: white;
            > ion-icon {
              font-size: ${fixedHeight(2.5)}px;
            }
          }
          .text {
            display: flex;
            flex-direction: column;
            > h5 {
              font-size: ${fixedHeight(1.5)}px;
              color: #fff;
            }
            > h3 {
              font-size: ${fixedHeight(2.5)}px;
              background: linear-gradient(
                90deg,
                hsl(40.69565217391305, 90.5511811023622%, 49.80392156862745%),
                hsl(289.0909090909091, 45.833333333333336%, 81.17647058823529%),
                hsl(289.0909090909091, 45.833333333333336%, 81.17647058823529%)
              );
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
        > .otherIcons {
          display: flex;
          align-items: center;
          justify-self: flex-end;
          column-gap: ${fixedWidth(0.5)}px;
          > button {
            width: ${fixedHeight(5)}px;
            height: ${fixedHeight(5)}px;
            border-radius: 50%;
            background: white;
            > ion-icon,
            i {
              font-size: ${fixedHeight(2.5)}px;
            }
          }
        }
      }
    }
    > .top {
      width: 100%;
      height: ${fixedHeight(55)}px;
      max-height: ${fixedHeight(55)}px;
      padding: 0 2.5%;
      display: grid;
      grid-template-columns: 1fr 2.5fr 1.25fr;
      column-gap: ${fixedWidth(1)}px;

      > div {
        /* height: 100%; */
        display: flex;
        flex-direction: column;
        row-gap: ${fixedHeight(1.25)}px;
        padding: ${fixedWidth(0.5)}px;
        height: 100%;
        background: linear-gradient(
          -45deg,
          hsl(288.75, 32.78688524590165%, 52.156862745098046%),
          hsl(289.0909090909091, 45.833333333333336%, 81.17647058823529%)
        );
        border-radius: 15px;
        box-shadow: 0 2px 3.75px rgba(72, 40, 96, 0.075),
          0 4px 7.5px rgba(145, 100, 175, 0.1),
          0 1px 2.5px rgba(0, 0, 0, 0.0375);
        > .title {
          width: 100%;
          height: 7.5%;
          > h3 {
            font-size: ${fixedHeight(1.75)}px;
          }
          > .bar {
            width: 100%;
            height: 100%;
            border-radius: 7.5px;
            background: #e8d7fa;
            display: flex;
            padding: ${fixedWidth(0.2)}px;
            column-gap: ${fixedWidth(0.2)}px;
            > a {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0.1px 2px rgba(72, 40, 96, 0.1),
                0 4px 8px rgba(0, 0, 0, 0.25);
              border-radius: 5px;
              font-size: ${fixedHeight(1.6)}px;
              color: hsl(288.75, 40%, 30%);
              background: #ddb9e5;

              &.active {
                background: linear-gradient(
                  135deg,
                  hsl(288.75, 40%, 30%),
                  hsl(289.09, 55%, 45%) /* Medium purple */
                );
                color: white;
              }
            }
          }
        }
      }
      > .left {
        > ul {
          list-style-type: none;
          width: 100%;
          /* height: auto; */
          height: ${fixedHeight(47.5)}px;
          display: flex;
          flex-direction: column;
          row-gap: ${fixedHeight(1.25)}px;
          > li {
            background: #e8d7fa;
            border-radius: 15px;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            padding: ${fixedWidth(0.5)}px;
            column-gap: ${fixedWidth(0.5)}px;
            > .icon {
              width: ${fixedHeight(5)}px;
              height: ${fixedHeight(5)}px;
              border-radius: 50%;
              background: linear-gradient(
                135deg,
                hsl(41, 90%, 75%),
                hsl(40.7, 90.6%, 49.8%)
              );
              color: white;
              > i,
              ion-icon {
                font-size: ${fixedHeight(2.25)}px;
              }
            }
            > .info {
              display: flex;
              flex-direction: column;
              row-gap: ${fixedHeight(1)}px;
            }
          }
        }
      }
      > .mid {
        > .slab {
          display: flex;
          align-items: center;
          width: 100%;
          height: 90%;
          column-gap: ${fixedWidth(0.5)}px;
          > .left {
            border-radius: 15px;
            width: 45%;
            height: 100%;
            /* background: red; */
            overflow: hidden;
            > img {
              position: absolute;
              z-index: 1;
            }
            > .txt {
              z-index: 2;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                to top,
                rgba(0, 0, 0, 0.6),
                /* Top blackish overlay */ rgba(26, 30, 58, 0.8) 50%,
                /* Deep theme-based overlay */ rgba(232, 215, 250, 0.3)
                  /* Bottom-light theme hint */
              );
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              padding: ${fixedHeight(2)}px ${fixedHeight(2)}px;
              color: white;
              row-gap: ${fixedHeight(1)}px;

              > h1 {
                font-size: ${fixedHeight(2.5)}px;
              }
              > p {
                font-size: ${fixedHeight(1.75)}px;
              }
            }
          }
          > .right {
            width: 55%;
            height: 100%;

            > ul {
              list-style-type: none;
              width: 100%;
              /* height: auto; */
              height: ${fixedHeight(47.5)}px;
              display: flex;
              flex-direction: column;
              row-gap: ${fixedHeight(1.25)}px;
              > li {
                width: 100%;
                min-height: ${fixedHeight(12.5)}px;
                background: #e8d7fa;
                border-radius: 15px;
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                padding: ${fixedWidth(0.5)}px;
                column-gap: ${fixedWidth(0.5)}px;
                > .icon {
                  width: 25%;
                  height: 100%;
                  overflow: hidden;
                  background: linear-gradient(
                    135deg,
                    hsl(40.7, 90.6%, 49.8%),
                    hsl(41, 90%, 75%)
                  );
                  color: white;
                  border-radius: 7.5px;
                  > i,
                  ion-icon {
                    font-size: ${fixedHeight(2.25)}px;
                  }
                  > img {
                    mix-blend-mode: multiply;
                  }
                }
                > .info {
                  width: 75%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  row-gap: ${fixedHeight(1)}px;
                }
              }
            }
          }
        }
      }
      > .right {
        > .opt {
          height: 17.5%;
          width: 100%;
          padding: ${fixedWidth(0.5)}px;
          background: #e8d7fa;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 7.5px;
          isolation: isolate;
          /* row-gap: 10%; */

          > h4 {
            font-size: ${fixedHeight(1.75)}px;
          }
          > .select {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid #ddb9e5;
            height: 60%;
            border-radius: 100px;
            z-index: 2;
            isolation: isolate;
            /* overflow: hidden; */
            > .selector {
              border: 1px solid rgb(96, 46, 107, 0.5);
              min-width: 25%;
              width: 27.5%;
              height: 100%;
              border-radius: 100px;
              z-index: 3;
              > .val {
                cursor: pointer;
                z-index: 1;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 2.5%;
                column-gap: 2.5%;
                > img {
                  width: ${fixedHeight(3.5)}px;
                  height: ${fixedHeight(3.5)}px;
                  object-fit: contain;
                  border-radius: 50%;
                }
                > p {
                  font-size: ${fixedHeight(1.5)}px;
                }
                > ion-icon {
                  justify-self: flex-end;
                }
              }
              > .options {
                position: absolute;
                z-index: 2;
                top: 115%;
                left: 0;
                border-radius: 15px;
                width: 200%;
                height: ${fixedHeight(30)}px;
                list-style-type: none;
                display: flex;
                flex-direction: column;
                background: #ddb9e5;
                box-shadow: 0 2px 3.75px rgba(72, 40, 96, 0.075),
                  0 4px 7.5px rgba(145, 100, 175, 0.1),
                  0 1px 2.5px rgba(0, 0, 0, 0.0375);
                > li {
                  cursor: pointer;
                  width: 100%;
                  height: auto;
                  min-height: ${fixedHeight(5)}px;
                  display: flex;
                  align-items: center;
                  column-gap: 2.5%;
                  padding: 0 2.5%;
                  background: transparent;
                  transition: 125ms ease-in-out;
                  > img {
                    width: ${fixedHeight(3.5)}px;
                    height: ${fixedHeight(3.5)}px;
                    object-fit: contain;
                    border-radius: 50%;
                  }
                  > p {
                    font-size: ${fixedHeight(1.5)}px;
                  }
                  &:hover {
                    background: #e8d7fa;
                  }
                }
                > form {
                  width: 100%;
                  height: auto;
                  padding: 2.5%;
                  display: flex;
                  align-items: center;
                  background: #ddb9e5;
                  position: sticky;
                  top: 0;
                  z-index: 2;
                  input {
                    z-index: 1;
                    padding: 0 2.5%;
                    font-size: ${fixedHeight(1.3)}px;
                    width: 100%;
                    height: ${fixedHeight(4)}px;
                    border-radius: 10px;
                    background: #e8d7fa;
                  }
                }
              }
            }
            > .amt {
              width: 70%;
              padding-right: ${fixedWidth(0.5)}px;
              font-size: ${fixedHeight(1.5)}px;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              > input {
                width: 100%;
                height: 100%;
                text-align: right;
                font-size: ${fixedHeight(1.75)}px;
                background: transparent;
                font-weight: 700;
                font-family: Aeonik Regular;
                border: none;
                outline: none;
              }
            }
          }
          > .input {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid #ddb9e5;
            height: 60%;
            border-radius: 100px;
            overflow: hidden;

            > input {
              width: 100%;
              height: 100%;
              background: transparent;
              border: none;
              outline: none;
              padding: 0 2.5%;
            }
            > button {
              width: 30%;
              height: 100%;
            }
          }
          > select {
            background: transparent;
            width: 100%;
            height: 60%;
            border-radius: 100px;
            overflow: hidden;
            border: 1px solid #ddb9e5;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${fixedHeight(1.5)}px;
            > option {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          &:nth-child(2) {
            z-index: 5;
          }
          &:nth-child(3) {
            z-index: 4;
          }
        }
        > .times {
          background: #e8d7fa;
          border-radius: 100px;
          width: 100%;
          max-width: 100%;
          height: 7.5%;
          display: flex;
          align-items: center;
          isolation: isolate;
          z-index: 2;
          

          > h5 {
            z-index: 1;
            font-size: ${fixedHeight(1.5)}px;
            display: flex;
            align-items: center;
            column-gap: ${fixedWidth(0.25)}px;
            width: 100%;
            max-width: ${fixedWidth(20)}px;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            > ion-icon {
              font-size: ${fixedHeight(2)}px;
            }

          }
          > .wallets {
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 100px;
            background: transparent;
            > button {
              background: transparent;
              border-radius: 100px;
              width: 100%;
              height: 100%;
            }
            > .slab {
              position: absolute;
              top: 115%;
              left: 0;
              width: 100%;
              height: auto;
              background: #ddb9e5;
              border-radius: 15px;
              list-style-type: none;
              display: flex;
              flex-direction: column;
              row-gap: ${fixedWidth(0.5)}px;
              padding: ${fixedWidth(0.5)}px;
              > li {
                background: #e8d7fa;
                width: 100%;
                height: ${fixedHeight(5)}px;
                border-radius: 10px;
                overflow: hidden;
                > button {
                  width: 100%;
                  height: 100%;
                  background: transparent;
                  > ion-icon {
                    font-size: ${fixedHeight(2.5)}px;
                  }
                }
                > form {
                  display: flex;
                  align-items: center;
                  column-gap: ${fixedWidth(0.5)}px;
                  width: 100%;
                  height: 100%;
                  > input {
                    width: 80%;
                    height: 100%;
                    background: transparent;
                    padding: 0 0 0 2.5%;
                    outline: none;
                    border: none;
                  }
                  > .buttons {
                    width: 20%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    > button {
                      width: ${fixedHeight(2.5)}px;
                      height: ${fixedHeight(2.5)}px;
                      border-radius: 50%;
                      color: white;
                      > ion-icon {
                        font-size: ${fixedHeight(2)}px;
                      }
                      &:nth-child(1) {
                        background: limegreen;
                      }
                      &:nth-child(2) {
                        background: red;
                      }
                    }
                  }
                }
              }
            }
            > form {
              display: flex;
              align-items: center;
              column-gap: ${fixedWidth(0.5)}px;
              width: 100%;
              height: 100%;
              border-radius: 100px;
              > input {
                border-radius: 100px;
                width: 80%;
                height: 100%;
                background: #e8d7fa;
                padding: 0 0 0 2.5%;
                outline: none;
                border: none;
              }
              > .buttons {
                width: 20%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                > button {
                  min-width: ${fixedHeight(2.5)}px;
                  width: auto;
                  height: ${fixedHeight(2.5)}px;
                  border-radius: 50px;
                  padding: 0 5px;
                  color: white;
                  font-size: ${fixedHeight(1.5)}px;
                  > ion-icon {
                    font-size: ${fixedHeight(2)}px;
                  }
                  &:nth-child(1) {
                    background: limegreen;
                  }
                  &:nth-child(2) {
                    background: red;
                  }
                }
              }
            }
          }
        }
        > .stat {
          width: 100%;
          height: 30%;
          padding: 0 1.25%;
          > .line {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #9e5dad;
            height: calc(100% / 3);
            > h3 {
              font-size: ${fixedHeight(1.75)}px;
              color: hsl(288.75, 40%, 30%);
            }
            > p {
              font-size: ${fixedHeight(1.75)}px;
              color: #e8d7fa;
            }
          }
        }
        > button {
          width: 100%;
          height: 10%;
          border-radius: 100px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.125),
            0 0.1px 2px rgba(72, 40, 96, 0.05);
          background: linear-gradient(
            135deg,
            hsl(288.75, 40%, 30%),
            hsl(289.09, 55%, 45%) /* Medium purple */
          );
          justify-self: flex-end;
          color: white;
          /* top: 4%; */
          font-size: ${fixedHeight(1.75)}px;
        }
      }
    }
    > .bottom {
      width: 100%;
      padding: 0 2.5%;
      height: auto;
    }
  }
`;
