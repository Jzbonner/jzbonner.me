import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import GlobalStateProvider from "../context/provider"
import ContentWrapper from "../styles/contentWrapper"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { seoTitleSuffix } from "../../config"

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

const StyledSection = styled.section`
  width: 100%;
  max-width: 62.5rem;
  margin: 0 auto;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1.25rem;
  }
  h3 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    // border: 1px solid black;
    width: 100%;
    max-width: 36rem;
    margin: 0;
    padding: 0;
    height: 10%;
  }
  .section-title {
    font-family: "Khand";
    margin-left: 2rem;
  }
`

const StyledRevealerLayout = styled(ContentWrapper)`
  && {
    // border: 1px solid blue;
    margin-bottom: 2rem;
    width: 100%;
    margin-top: -4rem;
    height: 80rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    font-family: "Barlow Semi Condensed";
    overflow: hidden;
  }

  // secondary content container styles and positioning
  .content-container-secondary {
    border: 1px solid black;
    background: rgba(213, 213, 213, 0.9);
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    // border: 1px solid rgba(213, 213, 213, 0.9);
    border-radius: 1rem;
    // display: flex;
    // flex-direction: column;
    // flex-basis: 100%;
    // flex: auto;
    margin-top: -3rem;
    margin-bottom: 4rem;
    // overflow: hidden;
    transition: all 0.2s ease-in-out;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      position: relative;
      top: -80rem;
      left: 0rem;
      // margin-top: -3 rem;
      // margin-bottom: 7rem;
      // margin-left: -2rem;
    }
    // &:hover {
    //   background: rgba(213, 213, 213, 0);
    // }
  }
  .content-container-secondary[offFocus="1"] {
    animation: exitRight 1s 1;
    left: 63rem;
  }
  @keyframes exitRight {
    from {
      left: 0rem;
    }
    to {
      left: 63rem;
    }
  }

  //toggle button styles and positioning
  .toggle-button {
    position: relative;
    top: 1.3rem;
    z-index: 1;
    border: 4px solid rgba(165, 156, 145, 0.8);
    border-radius: 5rem;
    background: rgba(202, 202, 202, 1);
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    margin-top: 1rem;
    padding: 1rem;
    // display: flex;
    height: 4rem;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: rgba(165, 156, 145, 0.5);
    }
  }
  .toggle-button[wobble="1"] {
    animation: wobble 1s 1;
    background: rgba(165, 156, 145, 0.8);
  }
  @keyframes wobble {
    25% {
      transform: rotate(15deg);
    }
    50% {
      transform: rotate(-30deg);
    }
    75% {
      transform: rotate(5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  //initial content container styles and conditioning
  .content-container {
    // border: 1px solid red;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: auto;
    margin-top: -5rem;
    margin-bottom: 4rem;
    margin-left: -1rem;
    // overflow: hidden;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: -4rem;
      margin-bottom: 10rem;
      margin-left: 0rem;
    }
  }

  // image styles for graphic illustration
  .dev-experience {
    // border: 1px solid black;
    padding: 1rem;
    display: flex;
    width: 24rem;
    filter: blur(0.4rem) grayscale(1);
    transition: all 0.2s ease-in-out;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: -5rem;
      margin-left: -3rem;
      width: 68rem;
      padding: 6rem;
    }
    // &:hover {
    //   filter: blur(0rem) grayscale(0);
    // }
  }
  .dev-experience[activated="1"] {
    filter: blur(0rem) grayscale(0);
  }
  .text-description {
    padding: 2rem;
    margin-top: -2rem;
  }
`

const DevProjects = ({ data }) => {
  const { body, frontmatter } = data.devprojects.edges[0].node
  const { title, seoTitle, useSeoTitleSuffix, useSplashScreen } = frontmatter

  const globalState = {
    isIntroDone: useSplashScreen ? false : true,
    darkMode: false,
  }

  const [wobble, setWobble] = useState(0)
  const [offFocus, setoffFocus] = useState(0)
  const [activated, setActivated] = useState(0)

  return (
    <GlobalStateProvider initialState={globalState}>
      <Layout>
        <SEO
          title={
            useSeoTitleSuffix
              ? `${seoTitle} - ${seoTitleSuffix}`
              : `${seoTitle}`
          }
          meta={[{ name: "robots", content: "noindex" }]}
        />
        <StyledSection id={title}>
          <StyledContentWrapper>
            <h1 className="section-title" data-testid="heading">
              {title}
            </h1>
          </StyledContentWrapper>
          <StyledRevealerLayout>
            <img
              className="toggle-button"
              onClick={() => {
                setWobble(1)
                setoffFocus(1)
                setActivated(1)
              }}
              onAnimationEnd={() => {
                setWobble(0)
              }}
              wobble={wobble}
              src="https://res.cloudinary.com/dzmc7doja/image/upload/v1639815152/design-assets/design-icon-assets/feather-pen.png"
            />
            <div className="content-container">
              <img
                className="dev-experience"
                activated={activated}
                src="https://res.cloudinary.com/dzmc7doja/image/upload/v1637433075/portfolio-site/devprojects-graphic.png"
              />
            </div>
            <div className="content-container-secondary" offFocus={offFocus}>
              <p className="text-description">
                <MDXRenderer>{body}</MDXRenderer>
              </p>
            </div>
          </StyledRevealerLayout>
        </StyledSection>
      </Layout>
    </GlobalStateProvider>
  )
}

DevProjects.propTypes = {
  data: PropTypes.shape({
    devprojects: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            body: PropTypes.string.isRequired,
            frontmatter: PropTypes.object.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export default DevProjects

export const pageQuery = graphql`
  {
    devprojects: allMdx(
      filter: { fileAbsolutePath: { regex: "/devprojects/" } }
    ) {
      edges {
        node {
          body
          frontmatter {
            title
            seoTitle
            useSeoTitleSuffix
            useSplashScreen
          }
        }
      }
    }
  }
`
