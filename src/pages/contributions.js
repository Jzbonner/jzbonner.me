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
  .column {
    //border: 1px solid black;
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      flex: 1;
    }
  }
  .built-with {
    display: block;
    width: 85%;
  }
  .section-title {
    font-family: "Khand";
    font-size: 1.3rem;
    margin-top: 2.5rem;
  }
  .text-description {
    font-family: "Barlow Semi Condensed";
    font-size: 1.2rem;
  }
  .profile-card {
    display: block;
    width: 75%;
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
            </div>
            <div className="column">
              <img
                className="built-with"
                src="https://res.cloudinary.com/dzmc7doja/image/upload/v1634359847/portfolio-site/built-with.png"
                alt="built-with-design"
              />
            </div>
          </StyledContentWrapper>
          <StyledContentWrapper>
            <div className="column">
              <h3 className="section-title" data-testid="heading">
                {subTitleDesign}
              </h3>
            </div>
            <div className="column">
              <img
                className="profile-card"
                src="https://res.cloudinary.com/dzmc7doja/image/upload/v1634669959/portfolio-site/jzb_profile_card.png"
                alt="profile-card"
              />
            </div>
          </StyledContentWrapper>
          <StyledContentWrapper>
            <div className="column">
              <h3 className="section-title" data-testid="heading">
                {subTitleDevelop}
              </h3>
            </div>
            <div className="column">
              <p className="text-description">
                <MDXRenderer>{body}</MDXRenderer>
              </p>
            </div>
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
