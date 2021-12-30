import React, { useEffect, useContext } from "react"
import styled from "styled-components"
import Helmet from "react-helmet"
import { motion, useAnimation } from "framer-motion"

import { lightTheme, darkTheme } from "../styles/theme"
import Context from "../context/"
import Logo from "./logo"

const StyledSplashScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0%;
  z-index: 900;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.background : theme.colors.primary};
  .logo-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110%; // adjust to fit logo size, hides logo on intial splash screen load
    height: 6rem;
  }
  .decal-wrapper {
    // border: 1px solid white;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: ${({ theme, darkMode }) =>
      darkMode ? theme.colors.background : theme.colors.primary};
  }
  .initials {
    display: flex;
    margin-top: 12rem;
    margin-left: 34vw;
    height: 8rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-top: 15rem;
      margin-left: 46vw;
      height: 9rem;
    }
  }
  .bounce-in-top {
    -webkit-animation: bounce-in-top 2.1s both;
    animation: bounce-in-top 2.1s both;
  }
  /**
 * ----------------------------------------
 * animation bounce-in-top
 * ----------------------------------------
 */
  @-webkit-keyframes bounce-in-top {
    0% {
      -webkit-transform: translateY(-500px);
      transform: translateY(-500px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
    }
    38% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
    }
    55% {
      -webkit-transform: translateY(-65px);
      transform: translateY(-65px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    72% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    81% {
      -webkit-transform: translateY(-28px);
      transform: translateY(-28px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    90% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    95% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
  @keyframes bounce-in-top {
    0% {
      -webkit-transform: translateY(-500px);
      transform: translateY(-500px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
    }
    38% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
    }
    55% {
      -webkit-transform: translateY(-65px);
      transform: translateY(-65px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    72% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    81% {
      -webkit-transform: translateY(-28px);
      transform: translateY(-28px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    90% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    95% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
`

const SplashScreen = () => {
  const { state, setState } = useContext(Context)

  const backgroundControls = useAnimation()
  const backdropControls = useAnimation()
  const decalControls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await backgroundControls.start({ opacity: 0.7 })
      await decalControls.start({
        opacity: 1,
        transition: { delay: 0.6 },
      })
      await backdropControls.start({
        height: "0%",
        transition: { delay: 0.7, type: "spring", stiffness: 80 },
      })
      await backgroundControls.start({ opacity: 0, transition: { delay: 2.3 } })
      setState({ ...state, isIntroDone: true })
    }
    sequence()
  }, [backgroundControls, backdropControls, setState, state])

  return (
    <StyledSplashScreen
      initial={{ opacity: 0.85 }}
      animate={backgroundControls}
      darkMode={state.darkMode}
    >
      {/* Add splashScreen class to body (prevents scrolling during splashScreen) */}
      <Helmet
        bodyAttributes={{ class: !state.isIntroDone ? "splashScreen" : "" }}
      />
      <div className="decal-wrapper">
        <motion.div initial={{ opacity: 0 }} animate={decalControls}>
          <img
            className="initials bounce-in-top"
            src="https://res.cloudinary.com/dzmc7doja/image/upload/v1640411837/portfolio-site/logo-initials.png"
          />
        </motion.div>
      </div>
      <div className="logo-wrapper">
        <motion.div
          className="backdrop"
          initial={{ height: "100%" }}
          animate={backdropControls}
        />
        <Logo
          size="4.5rem"
          color={
            state.darkMode
              ? darkTheme.colors.primary
              : lightTheme.colors.backgroundText
          }
        />
      </div>
    </StyledSplashScreen>
  )
}

export default SplashScreen
