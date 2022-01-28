import React, { useEffect, useContext } from "react"
import styled from "styled-components"
import Helmet from "react-helmet"
import { motion, useAnimation } from "framer-motion"

import { lightTheme, darkTheme } from "../styles/theme"
import Context from "../context/index"

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
  .decal-wrapper {
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
      margin-top: 20rem;
      margin-left: 46vw;
      height: 9rem;
    }
  }

  // Animations Section
  .bounce-in-top {
    -webkit-animation: bounce-in-top 1.8s both;
    animation: bounce-in-top 1.8s both;
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

  .exit-animation {
    -webkit-animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
      both;
    animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    animation-delay: 2s;
  }
  @-webkit-keyframes slide-out-top {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateY(-1000px);
      transform: translateY(-1000px);
      opacity: 0;
    }
  }
  @keyframes slide-out-top {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateY(-1000px);
      transform: translateY(-1000px);
      opacity: 0;
    }
  }
`

const SplashScreen = () => {
  const { state, setState } = useContext(Context)
  const backgroundControls = useAnimation()
  const decalControls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await backgroundControls.start({ opacity: 0.7 })
      await decalControls.start({
        opacity: 1,
        transition: { delay: 0.3 },
      })
      await backgroundControls.start({ opacity: 0, transition: { delay: 2 } })
      setState({ ...state, isIntroDone: true })
    }
    sequence()
  }, [backgroundControls, decalControls, setState, state])

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
        <motion.div
          className="exit-animation"
          initial={{ opacity: 0 }}
          animate={decalControls}
        >
          <img
            className="initials bounce-in-top"
            alt="initials"
            src="https://res.cloudinary.com/dzmc7doja/image/upload/v1640411837/portfolio-site/logo-initials.png"
          />
        </motion.div>
      </div>
    </StyledSplashScreen>
  )
}

export default SplashScreen
