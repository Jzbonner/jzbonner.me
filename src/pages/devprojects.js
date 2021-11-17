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
  // padding: 0 2.5rem;
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
    width: 100%;
    max-width: 40rem;
    margin: 0;
    padding: 0;
    height: 10%;
  }
  .section-title {
    font-family: "Khand";
  }
`

const StyledGridLayout = styled(ContentWrapper)`
  && {
    // border: 1px solid black;
    width: 100%;
    margin-top: -3rem;
    // padding: 0;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    font-family: "Barlow Semi Condensed";
  }
  .column {
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: auto;
    margin-bottom: 4rem;
  }
  .dev-experience {
    background: rgba(213, 213, 213, 0.9);
    border-radius: 2rem;
    margin: 0 auto;
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    display: flex;
    width: 60rem;
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
              <img
                className="dev-experience"
                src="https://res.cloudinary.com/dzmc7doja/image/upload/v1636663172/portfolio-site/dev-projects-experience.png"
              />
            </div>
            <div className="column">
              <MDXRenderer>{body}</MDXRenderer>
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
