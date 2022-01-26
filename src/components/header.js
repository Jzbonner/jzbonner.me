import React, { useState, useEffect, useContext } from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"
import styled from "styled-components"
import { motion, useAnimation } from "framer-motion"

import Context from "../context"
import { detectMobileAndTablet, isSSR } from "../utils/"
import ContentWrapper from "../styles/contentWrapper"
import Sidebar from "./sidebar"
import Navbar from "./navbar"

const StyledHeader = motion(styled.header`
  width: 100%;
  height: ${({ theme }) => theme.headerHeight};
  background: ${({ theme }) => theme.colors.background};
`)

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: auto;
    /* border: 1px solid white; */
    height: auto;
    display: flex;
    justify-content: center;
    border-radius: 0.5rem;
    /* background: rgba(146, 146, 146, 0.5); */
    align-items: center;
    margin-top: 2rem;
  }
  .logo-decal {
    width: 50%;
    margin-top: 0.5rem;
  }
`

// https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/
const StyledBurger = styled.button`
  z-index: 12;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  padding: 0.25rem;

  &:focus-within {
    outline: none;
    background: ${({ theme }) => theme.colors.secondary};
  }
  &:after {
    background: ${({ theme }) => theme.colors.secondary};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 0.625rem;
    transition: all 0.3s ease-in-out;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`

const Header = () => {
  const { isIntroDone } = useContext(Context).state
  const [open, setOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    let handleWindowSizeChange
    // if (isSSR) is necessary to prevent error during the gatsby build
    if (!isSSR) {
      handleWindowSizeChange = () => setWindowWidth(window.innerWidth)
      // set initial innerWidth when component mounts
      setWindowWidth(window.innerWidth)
    }
    // Add event listener to update windowWidth in state
    window.addEventListener("resize", handleWindowSizeChange)
    return () => window.removeEventListener("resize", handleWindowSizeChange)
  }, [windowWidth])

  // Required for animation - start after the splashScreen sequence is done
  const controls = useAnimation()
  useEffect(() => {
    if (isIntroDone)
      controls.start({ opacity: 1, y: 0, transition: { delay: 0.2 } })
  }, [isIntroDone, controls])

  let navigation
  if (detectMobileAndTablet(windowWidth)) {
    navigation = (
      <>
        <StyledBurger
          aria-controls="sidebar"
          open={open}
          onClick={() => setOpen(!open)}
        >
          <div />
          <div />
          <div />
        </StyledBurger>
        <Sidebar id="sidebar" open={open} setOpen={setOpen} />
      </>
    )
  } else {
    navigation = <Navbar />
  }

  return (
    <StyledHeader initial={{ opacity: 0, y: -10 }} animate={controls}>
      {/* add blur class to body when sidebar is opened */}
      <Helmet bodyAttributes={{ class: open ? "blur" : "" }} />
      <StyledContentWrapper>
        <Link to="/" aria-label="home">
          <img
            alt="logo-decal"
            className="logo-decal"
            src="https://res.cloudinary.com/dzmc7doja/image/upload/v1643199347/design-assets/design-icon-assets/Logo-Branding-B.png"
          />
        </Link>
        {navigation}
      </StyledContentWrapper>
    </StyledHeader>
  )
}

export default Header
