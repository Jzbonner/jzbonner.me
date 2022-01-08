import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { navLinks } from "../../config"

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

const StyledNav = styled.nav`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 31.25rem;
    background: ${({ theme }) => theme.colors.background};
    a {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  .nav-link {
    font-family: "Barlow Semi Condensed";
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-align: center;
    position: relative;
    padding: 0;
    &::before {
      transition: 200ms ease-out;
      height: 0.1563rem;
      content: "";
      position: absolute;
      background-color: ${({ theme }) => theme.colors.primary};
      width: 0%;
      bottom: -0.125rem;
    }
    &:hover::before {
      width: 100%;
    }
  }
  .cta-btn {
    width: auto;
    height: auto;
    font-family: "Barlow Semi Condensed";
    font-weight: 700;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 0.125rem solid ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
    transition: 20ms ease-out;
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
    margin: 0;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.backgroundText};
    }
  }
`

const Navbar = () => {
  const { menu, button } = navLinks
  return (
    <StyledNav>
      {menu.map(({ name, url }, key) => {
        return (
          <Link className="nav-link" key={key} to={url}>
            {name}
          </Link>
        )
      })}
      {button.useFileName ? (
        <a
          className="cta-btn"
          href={`/${button.fileName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {button.name}
        </a>
      ) : (
        <Link className="cta-btn" to={button.url}>
          {button.name}
        </Link>
      )}
    </StyledNav>
  )
}

export default Navbar
