import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import styled from "styled-components"
import { motion } from "framer-motion"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useOnScreen } from "../hooks/"
import GlobalStateProvider from "../context/provider"
import ContentWrapper from "../styles/contentWrapper"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { seoTitleSuffix } from "../../config"
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
import ReactTooltip from "react-tooltip"
import { useIsSmallScreen } from "../utils/index"

const StyledSection = styled(motion.section)`
  width: 100%;
  max-width: 62.5rem;
  margin: 0 auto;
  height: 100vh;
  margin-bottom: 0rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: auto;
  }
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
    max-width: 36rem;
    margin-left: 0.5rem;
    margin-bottom: 1rem;
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
    margin-bottom: 2rem;
    width: 100%;
    margin-top: -3rem;
    height: 95vh;
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    gap: 1rem;
    font-family: "Barlow Semi Condensed";
    overflow-x: hidden;
    overflow-y: visible;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 100vh;
      overflow-x: hidden;
      overflow-y: hidden;
      margin-top: -4rem;
      margin-bottom: 2rem;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      overflow: hidden;
      height: 120vh;
    }
  }

  .content-container-secondary {
    position: relative;
    top: -63rem;
    left: 0rem;
    height: auto;
    border: 1px solid white;
    background: rgba(213, 213, 213, 0.9);
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    border-radius: 1rem;
    margin-bottom: -70rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      top: -63rem;
      margin-bottom: -60rem;
      height: auto;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      position: relative;
      top: -70rem;
      left: 0rem;
      height: 72%;
    }
  }

  .toggle-indicator {
    position: relative;
    top: 1.3rem;
    z-index: 1;
    border: 4px solid rgba(165, 156, 145, 0.8);
    border-radius: 5rem;
    background: rgba(202, 202, 202, 1);
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    margin-top: 1rem;
    padding: 1rem;
    height: 4rem;
    width: 4rem;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: rgba(165, 156, 145, 0.8);
    }
  }

  .toggle-tip {
    font-family: "Barlow Semi Condensed";
    font-size: 1rem;
    padding: 0.5rem;
  }

  .content-container {
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: auto;
    margin-top: -5rem;
    margin-bottom: 4rem;
    margin-left: -1rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: -4rem;
      margin-bottom: 10rem;
      margin-left: 0rem;
    }
  }

  .dev-experience {
    padding: 1rem;
    display: flex;
    width: 250%;
    margin-top: 5rem;
    filter: blur(0.4rem) grayscale(1);
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-top: -5rem;
      margin-left: -3rem;
      margin-bottom: -10rem;
      width: 68rem;
      padding: 6rem;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: -5rem;
      margin-left: -3rem;
      width: 68rem;
      padding: 6rem;
    }
  }
  .text-description {
    padding: 2rem;
    margin-top: -2rem;
    font-size: 1rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 1rem;
    }
  }
`

const DevProjects = ({ data }) => {
  const { body, frontmatter } = data.devprojects.edges[0].node
  const { title, seoTitle, useSeoTitleSuffix, useSplashScreen } = frontmatter
  const contentRef = useRef()
  const contentOnScreen = useOnScreen(contentRef)
  const isSmall = useIsSmallScreen()

  const globalState = {
    isIntroDone: useSplashScreen ? false : true,
    darkMode: false,
  }

  const variants = isSmall
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.9 } },
        initial: { y: 0 },
        exit: { y: 950, transition: { type: "spring", stiffness: 80 } },
        blur: {
          filter: `blur(0.4rem) grayscale(1)`,
          transition: { type: "spring", stiffness: 100, duration: 0.2 },
        },
        unblur: {
          filter: `blur(0rem) grayscale(0)`,
          transition: { type: "spring", stiffness: 100, duration: 0.2 },
        },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.9 } },
        initial: { x: 0 },
        exit: { x: 940, transition: { type: "spring", stiffness: 80 } },
        blur: {
          filter: `blur(0.4rem) grayscale(1)`,
          transition: { type: "spring", stiffness: 100, duration: 0.2 },
        },
        unblur: {
          filter: `blur(0rem) grayscale(0)`,
          transition: { type: "spring", stiffness: 100, duration: 0.2 },
        },
      }

  const [buttonToggle, setButtonToggle] = useState(false)
  const [contentToggle, setContentToggle] = useState(false)
  const [imageToggle, setImageToggle] = useState(false)

  function revealToggle() {
    setImageToggle(!imageToggle)
    setButtonToggle(!buttonToggle)
    setContentToggle(!contentToggle)
  }

  return (
    <GlobalStateProvider initialState={globalState}>
      <SimpleReactLightbox>
        <Layout>
          <SEO
            title={
              useSeoTitleSuffix
                ? `${seoTitle} - ${seoTitleSuffix}`
                : `${seoTitle}`
            }
            meta={[{ name: "robots", content: "noindex" }]}
          />
          <StyledSection
            id={title}
            ref={contentRef}
            initial={variants.hidden}
            variants={variants}
            animate={contentOnScreen ? "visible" : "visible"}
          >
            <StyledContentWrapper>
              <h1 className="section-title" data-testid="heading">
                {title}
              </h1>
            </StyledContentWrapper>
            <StyledRevealerLayout>
              <img
                className="toggle-indicator"
                whileTap={{ scale: 3 }}
                onClick={() => revealToggle()}
                src="https://res.cloudinary.com/dzmc7doja/image/upload/v1639815152/design-assets/design-icon-assets/feather-pen.png"
                data-tip
                data-for="toggle-tip"
              />
              <ReactTooltip
                className="toggle-tip"
                id="toggle-tip"
                place="right"
                effect="solid"
              >
                Click to toggle infographic then click infographic to enlarge
              </ReactTooltip>
              <div className="content-container">
                <SRLWrapper>
                  <motion.img
                    className="dev-experience"
                    alt="dev-experience-graphic"
                    initial={variants.blur}
                    variants={variants}
                    animate={imageToggle ? "unblur" : "blur"}
                    src="https://res.cloudinary.com/dzmc7doja/image/upload/v1637433075/portfolio-site/devprojects-graphic.png"
                  />
                </SRLWrapper>
              </div>
              <motion.div
                className="content-container-secondary"
                initial={variants.initial}
                variants={variants}
                animate={contentToggle ? "exit" : "initial"}
              >
                <p className="text-description">
                  <MDXRenderer>{body}</MDXRenderer>
                </p>
              </motion.div>
            </StyledRevealerLayout>
          </StyledSection>
        </Layout>
      </SimpleReactLightbox>
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
