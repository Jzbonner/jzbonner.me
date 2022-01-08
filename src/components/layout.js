import React, { useContext } from "react"
import PropTypes from "prop-types"
import styled, { ThemeProvider } from "styled-components"

import { lightTheme, darkTheme } from "../styles/theme"
import { useDarkMode } from "../hooks"
import Context from "../context"
import GlobalStyle from "../styles/globalStyle"
import Header from "./header"
import Footer from "./footer"
import CookieBar from "../components/cookieBar"
import FloatingButton from "../components/floatingButton"
import SplashScreen from "../components/splashScreen"
import { useCookieBar, useFloatingButton } from "../../config"

import { MDXProvider } from "@mdx-js/react"
import Underlining from "../styles/underlining"

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]')
}

// you can set site background image here or default to background color specified in .config/index theme settings
const StyledLayoutWrapper = styled.div`
  background: linear-gradient(to bottom, transparent, #dcdcdc),
    url(https://res.cloudinary.com/dzmc7doja/image/upload/v1632253025/portfolio-site/main-bg.png);
  background-size: contain;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
`
const shortcodes = { Underlining }

const Layout = ({ children }) => {
  const { isIntroDone } = useContext(Context).state
  // Enables dark mode if the user's OS has an active dark theme
  const darkModeEnabled = useDarkMode()
  const theme = darkModeEnabled ? darkTheme : lightTheme

  return (
    <StyledLayoutWrapper id="layout-wrapper" data-useCookieBar={useCookieBar}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {isIntroDone ? (
          <>
            <Header />
            {/*using MDXProvider to incorporate shortcodes in child elements otherwise use: <main id="main-content">{children}</main>*/}
            <MDXProvider components={shortcodes}>{children}</MDXProvider>
            <Footer />
          </>
        ) : (
          <SplashScreen />
        )}
        {useCookieBar && <CookieBar />}
        {useFloatingButton && <FloatingButton />}
      </ThemeProvider>
    </StyledLayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
