import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { motion, useAnimation } from "framer-motion"

import Context from "../context/"

const StyledFloatingButton = motion(styled.div`
  position: fixed;
  right: 0;
  bottom: 2rem;
  width: 20%;
  margin: 0;
  .decal-cta {
    float: right;
    padding: 1rem;
    width: 5rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 9rem;
    }
  }
`)

const FloatingButton = () => {
  const controls = useAnimation()
  const { isIntroDone } = useContext(Context).state

  useEffect(() => {
    if (isIntroDone) {
      controls.start({
        opacity: 1,
      })
    }
  }, [isIntroDone])

  if (!isIntroDone) return null

  return (
    <StyledFloatingButton initial={{ opacity: 0 }} animate={controls}>
      <motion.img
        whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
        whileTap={{ scale: 0.8 }}
        className="decal-cta"
        alt="floating-button"
        src="https://res.cloudinary.com/dzmc7doja/image/upload/v1640411837/portfolio-site/logo-initials.png"
      />
    </StyledFloatingButton>
  )
}

export default FloatingButton
