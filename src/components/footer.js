import React, { useContext } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import ContentWrapper from "../styles/contentWrapper"
import Context from "../context"
import { lightTheme, darkTheme } from "../styles/theme"
import { footerLinks } from "../../config"

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

const StyledFooter = styled.footer`
  width: 100%;
  height: ${({ theme }) => theme.footerHeight};
  background: linear-gradient(
    132deg,
    rgba(31, 32, 33, 0.2) 0%,
    rgba(216, 216, 216, 0.2) 100%,
    rgba(181, 181, 181, 0.2) 100%
  );
  box-shadow: 0.5rem 0.5rem black, -0.5rem -0.5rem rgba(97, 97, 97, 0.3),
    -1rem -1rem rgba(163, 163, 163, 0.4),
    -1.5rem -1.5rem rgba(204, 204, 204, 0.9);
  border-top: 1px solid rgba(143, 143, 144, 0.5);
  margin-top: 5rem;
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .footer-links {
      /* Adjust width of links wrapper accordingly */
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 25rem;
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      }
    }
  }
`

const StyledLink = styled(Link)`
  font-family: "Khand";
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme, $darkMode }) =>
    $darkMode ? theme.colors.primary : theme.colors.primary};
  letter-spacing: 0.4px;
`

const Footer = () => {
  const { darkMode } = useContext(Context).state
  return (
    <StyledFooter darkMode={darkMode}>
      <StyledContentWrapper>
        <div className="footer-links" data-testid="footer-links">
          {footerLinks.map(({ name, url }, key) => (
            <StyledLink key={key} to={url} $darkMode={darkMode}>
              {name}
            </StyledLink>
          ))}
        </div>
      </StyledContentWrapper>
    </StyledFooter>
  )
}

export default Footer
