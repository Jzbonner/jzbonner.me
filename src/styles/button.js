import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { motion } from "framer-motion"

// import google fonts from webfontloader module
const WebFont = require("webfontloader")

WebFont.load({
  google: {
    families: [
      "Caveat",
      "Khand",
      "Roboto Condensed:400",
      "Barlow Semi Condensed",
    ],
  },
})

const StyledButton = styled(motion.button)`
  width: 15.625rem;
  height: 3rem;
  /* background-color: ${({ theme }) => theme.colors.primary}; */
  /* background-color: rgba(151, 151, 151, 0.4); */
  background-color: rgba(239, 239, 238, 0.8);
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem;
  margin: 0 ${({ center }) => (center ? "auto" : "0")};
  font-size: 0.95rem;
  font-weight: 700;
  font-family: "Barlow Semi Condensed";
  border-radius: 0.85rem;
  text-decoration: none;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    outline: none;
  }
  = svg {
    height: 1rem;
    width: 1rem;
    margin-right: 0.3rem;
    margin-bottom: -0.175rem;
  }
`

const Button = ({ onClick, textAlign, center, children }) => (
  <StyledButton
    onClick={onClick}
    whileHover={{
      translateY: -2,
      boxShadow: `0 0rem 1rem rgba(0, 0, 0, 0.25)`,
    }}
    textAlign={textAlign}
    center={center}
  >
    {children}
  </StyledButton>
)

Button.propTypes = {
  onClick: PropTypes.func,
  textAlign: PropTypes.string,
  center: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Button
