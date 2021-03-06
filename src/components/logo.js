import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { siteMainTitle } from "../../config/index"

const StyledLogo = styled.div`
  position: relative;
  z-index: 13;
  font-family: "Caveat";
  font-size: ${({ size }) => (size ? size : "1.5rem")};
  font-weight: 600;
  color: ${({ theme, color }) => theme.colors[color] || color};
  /* border-top: 5px groove rgba(237, 239, 238, 0.2); */

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
