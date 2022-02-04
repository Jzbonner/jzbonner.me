import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { lightTheme, darkTheme } from "../../styles/theme"

const StyledLogo = styled(motion.img)`
  margin-right: 1.5rem;
  width: 10%;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 3rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 10%;
  }
`

const Figma = () => {
  return (
    <StyledLogo
      alt="figma"
      src="https://res.cloudinary.com/dzmc7doja/image/upload/v1631673497/design-assets/icon-assets/figma-logo.png"
    />
  )
}

export default Figma
