import React, { useEffect, useContext } from "react"
import styled from "styled-components"
import Helmet from "react-helmet"
import { motion, MotionContext, useAnimation } from "framer-motion"

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
    // border: 1px solid white;
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
  .floating-decal {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    border: 1px solid white;
    height: 100%;
    width: 100%;
  }
  .initials-j {
    float: left;
    // position: fixed;
    // bottom: 0;
    // right: 0;
    padding: 1rem;
    // border: 1px solid red;
    height: 5rem;
  }
  .initials-b {
    float: left;
    // position: fixed;
    // bottom: 50;
    // right: 50;
    margin-left: -2.7rem;
    padding: 1rem;
    // border: 1px solid red;
    height: 4.5rem;
  }
`

const SplashScreen = () => {
  const { state, setState } = useContext(Context)

  const backgroundControls = useAnimation()
  const backdropControls = useAnimation()
  const decalControls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await backgroundControls.start({ opacity: 0.8 })
      await backdropControls.start({ height: "0%", transition: { delay: 0.7 } })
      await decalControls.start({ opacity: 0.9, scale: 1 })
      await backgroundControls.start({ opacity: 0, transition: { delay: 30 } })
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
      <motion.div className="floating-decal">
        <img
          className="initials-j"
          src="https://res.cloudinary.com/dzmc7doja/image/upload/v1639985819/design-assets/design-icon-assets/letter-j.png"
          initial={{ opacity: 0, scale: 0 }}
          animate={decalControls}
        />
        <img
          className="initials-b"
          src="https://res.cloudinary.com/dzmc7doja/image/upload/v1639985819/design-assets/design-icon-assets/letter-b.png"
          initial={{ opacity: 0, scale: 0 }}
          animate={decalControls}
        />
      </motion.div>
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
