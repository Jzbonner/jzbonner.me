import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { lightTheme, darkTheme } from "../../styles/theme"

const StyledLogo = styled(motion.img)`
  margin-right: 1.1rem;
  width: 15%;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 4rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 15%;
  }
`

const Twitter = () => {
  return (
    <StyledLogo
      alt="twitter"
      src="https://res.cloudinary.com/dzmc7doja/image/upload/v1643181521/design-assets/icon-assets/twitter-svgrepo-com.svg"
    />
  )
}

export default Twitter
