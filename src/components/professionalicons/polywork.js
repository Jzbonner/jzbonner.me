import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const StyledLogo = styled(motion.img)`
  margin-right: 1.2rem;
  width: 14%;
`

const Polywork = () => {
  return (
    <StyledLogo
      alt="polywork"
      src="https://res.cloudinary.com/dzmc7doja/image/upload/v1643151217/design-assets/icon-assets/polywork-svg.svg"
    />
  )
}

export default Polywork
