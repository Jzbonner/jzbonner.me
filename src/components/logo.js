import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { siteMainTitle } from "../../config/index"

// import google fonts from webfontloader module
const WebFont = require("webfontloader")

WebFont.load({
  google: {
    families: ["Caveat", "Khand"],
  },
})

const StyledLogo = styled.div`
  position: relative;
  z-index: 13;

  font-family: "Caveat";
  font-size: ${({ size }) => (size ? size : "1.5rem")};
  font-weight: 600;
  color: ${({ theme, color }) => theme.colors[color] || color};

  /* Disable effects when sidebar is open */
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
`

const Logo = ({ size, color }) => (
  <StyledLogo color={color} size={size}>
    {siteMainTitle}
  </StyledLogo>
)

Logo.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
}

export default Logo
