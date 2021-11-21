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

const StyledGridLayout = styled(ContentWrapper)`
  && {
    margin-bottom: 2rem;
    width: 100%;
    margin-top: -3rem;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    font-family: "Barlow Semi Condensed";
  }
  .column {
    background: rgba(213, 213, 213, 0.4);
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    border: 1px solid rgba(213, 213, 213, 0.9);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: auto;
    margin-top: -5rem;
    margin-bottom: 4rem;
    margin-left: -2rem;
    // overflow: hidden;
    transition: all 0.2s ease-in-out;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: -6rem;
      margin-bottom: 7rem;
      margin-left: -2rem;
    }
    &:hover {
      background: rgba(213, 213, 213, 0.9);
    }
  }
  .column-modal {
    // border: 1px solid blue;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: auto;
    margin-top: -1rem;
    margin-bottom: 4rem;
    margin-left: -6rem;
    // overflow: hidden;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: -4rem;
      margin-bottom: 10rem;
      margin-left: -5rem;
    }
  }
  .dev-experience {
    padding: 1rem;
    display: flex;
    width: 24rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 67rem;
      padding: 1rem;
    }
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
          <StyledGridLayout>
            <div className="column">
              <p className="text-description">
                <MDXRenderer>{body}</MDXRenderer>
              </p>
            </div>
            <div className="column-modal">
              <img
                className="dev-experience"
                src="https://res.cloudinary.com/dzmc7doja/image/upload/v1637433075/portfolio-site/devprojects-graphic.png"
              />
            </div>
          </StyledGridLayout>
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
