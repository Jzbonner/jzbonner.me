import React from "react"
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
  padding: 2.5rem 2.5rem;
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 100%;
    margin-bottom: 6rem;
    padding: 0;
  }
  .column-offset {
    display: flex;
    flex-direction: column;
    flex-basis: 25rem;
  }
  .column {
    border-radius: 0.8rem;
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    background: rgba(212, 203, 184, 0.5);
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: auto;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: rgba(212, 203, 184, 0);
    }
    &:hover h3 {
      transform: scale(1.1);
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      flex: 1;
      margin-bottom: 4rem;
    }
  }
  .column-contribution {
    // border: 1px solid black;
    border-radius: 0.8rem;
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    background: rgba(212, 203, 184, 0.4);
    display: flex;
    margin: 0 auto;
    margin-bottom: -8rem;
    flex-direction: column;
    flex-basis: 100%;
    // width: 50%;
    // flex: auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-basis: 50%;
      // flex: auto;
      margin-bottom: -4rem;
    }
  }
  .built-with {
    display: block;
    width: 17rem;
    margin: 0 auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 30rem;
    }
  }
  .section-title {
    border-radius: 0.4rem 0rem 0rem 0.4rem;
    background: rgba(154, 167, 173, 0.4);
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25);
    font-family: "Khand";
    font-size: 1.1rem;
    margin-top: 2.5rem;
    margin-left: 1rem;
    padding-left: 1rem;
    transition: all 0.2s ease-in-out;
  }
  .text-description {
    font-family: "Barlow Semi Condensed";
    font-weight: 600;
    font-size: 1rem;
    text-align: center;
    text-transform: uppercase;
  }
  .profile-card {
    display: block;
    width: 19rem;
    margin: 0 auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 30rem;
    }
  }
  .branding {
    position: relative;
    top: 5rem;
    height: 5rem;
    width: 5rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      top: 6rem;
      left: -15rem;
    }
  }
`

const Contributions = ({ data }) => {
  const { body, frontmatter } = data.contributions.edges[0].node
  const {
    title,
    seoTitle,
    useSeoTitleSuffix,
    useSplashScreen,
    subTitleDevelop,
    subTitleDesign,
  } = frontmatter

  const globalState = {
    isIntroDone: useSplashScreen ? false : true,
    darkMode: false,
  }

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
            <div className="column">
              <h3 className="section-title" data-testid="heading">
                {title}
              </h3>
              <img
                className="built-with"
                src="https://res.cloudinary.com/dzmc7doja/image/upload/v1637104957/portfolio-site/built-with.png"
                alt="built-with-design"
              />
            </div>
            <div className="column-offset"></div>
          </StyledContentWrapper>
          <StyledContentWrapper>
            <div className="column-offset"></div>
            <div className="column">
              <h3 className="section-title" data-testid="heading">
                {subTitleDesign}
              </h3>
              <img
                className="profile-card"
                src="https://res.cloudinary.com/dzmc7doja/image/upload/v1637104966/portfolio-site/jzb-card.png"
                alt="profile-card"
              />
            </div>
          </StyledContentWrapper>
          <StyledContentWrapper>
            <div className="column-contribution">
              <p className="text-description">
                <MDXRenderer>{body}</MDXRenderer>
              </p>
            </div>
            <img
              className="branding"
              src="https://res.cloudinary.com/dzmc7doja/image/upload/v1634103191/design-assets/design-icon-assets/line-graphic.png"
            />
          </StyledContentWrapper>
        </StyledSection>
      </Layout>
    </GlobalStateProvider>
  )
}

Contributions.propTypes = {
  data: PropTypes.shape({
    contributions: PropTypes.shape({
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

export default Contributions

export const pageQuery = graphql`
  {
    contributions: allMdx(
      filter: { fileAbsolutePath: { regex: "/contributions/" } }
    ) {
      edges {
        node {
          body
          frontmatter {
            title
            seoTitle
            useSeoTitleSuffix
            useSplashScreen
            subTitleDevelop
            subTitleDesign
          }
        }
      }
    }
  }
`
