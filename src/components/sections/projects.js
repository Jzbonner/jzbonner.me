import React, { useState, useEffect, useRef, useContext } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"
import VisibilitySensor from "react-visibility-sensor"
import { motion } from "framer-motion"

import { useOnScreen } from "../../hooks"
import Context from "../../context"
import ContentWrapper from "../../styles/contentWrapper"
import Underlining from "../../styles/underlining"
import Button from "../../styles/button"
import Icon from "../../components/icons"
import { lightTheme, darkTheme } from "../../styles/theme"

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
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 6rem;
  margin-bottom: 3rem;
  .cta-btn {
    display: block;
    text-align: center;
    margin: 0rem auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin: 0 auto;
    }
    transition: all 0.2s ease-in-out;
  }
  .cta-btn:hover {
  }
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 0;
    padding-left: 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
    }
    .section-title {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
      font-family: "Khand";
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        padding-right: 0;
        padding-left: 0;
      }
    }
    .projects {
      display: flex;
      flex-direction: row;
      margin-top: -2.5rem;
      padding: 2.5rem 2.5rem;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        flex-direction: column;
        margin-top: 0;
        padding: 0;
        overflow: visible;
      }
      /* Show scrollbar if desktop and wrapper width > viewport width */
      @media (hover: hover) {
        scrollbar-color: ${({ theme }) => theme.colors.scrollBar} transparent; // Firefox only
        &::-webkit-scrollbar {
          display: block;
          -webkit-appearance: none;
        }

        &::-webkit-scrollbar:horizontal {
          height: 0.8rem;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          border: 0.2rem solid ${({ theme }) => theme.colors.background};
          background-color: ${({ theme }) => theme.colors.scrollBar};
        }

        &::-webkit-scrollbar-track {
          background-color: ${({ theme }) => theme.colors.background};
          border-radius: 8px;
        }
      }
    }
    .counter {
      position: absolute;
      top: 3.4rem;
      right: 2.5rem;
      border: 0.05rem solid black;
      border-radius: 0.5rem;
      box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
      padding: 0.2rem;
      font-size: 1.125rem;
      font-weight: 600;
      font-family: "Barlow Semi Condensed";
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        display: none;
      }
    }
  }
`

const StyledProject = styled(motion.div)`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0;
  margin-bottom: 2rem;
  flex-shrink: 0;
  padding-right: 2.5rem;
  max-width: 20rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    max-width: 25rem;
    margin-top: 2rem;
    padding-right: 5rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: space-between;
    flex-shrink: 1;
    max-width: 62.5rem;
    margin-bottom: 10rem;
    padding-right: 0;
    /* Positioning of image and details should vary */
    flex-direction: ${({ position }) =>
      position % 2 !== 0 ? "row" : "row-reverse"};
  }
  .details {
    border-top: 9px solid rgba(225, 227, 226, 0.8);  
    border-bottom-right-radius: 1rem; 
    border-bottom-left-radius: 1rem; 
    background: rgba(225,227,226, 0.5);
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    width: 100%;
    max-width: 25rem;
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    padding: 1rem; 
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: 0;
    }
    .decal {
      // dispaly: flex; 
      //border: 1px solid black;  
      // margin: 0 auto; 
      // margin-top: 1rem; 
      width: 3rem; 
      height: 3rem; 
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) { 
        height: 4rem; 
        width: 4rem;
      }
    }
    .category {
      border-bottom: 2px solid rgba(178, 173, 168, 0.9); 
      border-radius: 1rem; 
      background: rgba(208, 208, 208, 0.2);
      box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
      display: flex; 
      justify-content: center; 
      align-items: center; 
      text-transform: uppercase;
      letter-spacing: +1px;
      font-family: "Khand";
    }
    .category-text {
      // border: 1px solid black; 
      margin-top: 2.5rem; 
      margin-bottom: 3rem; 
      margin-left: 0.5rem; 
      font-size: 1rem; 
      font-weight: bold; 
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        margin-top: 2rem;
        font-size: 1.3rem;  
      }
    }
    .title {
      margin-top: 1rem;
      margin-left: 1rem; 
      margin-bottom: 0.625rem;
      font-size: 1.1rem;
      line-height: 1.625rem;
      // font-weight: 700;
      font-family: "Barlow Semi Condensed";
      font-style: italic; 
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      margin-top: 1.5rem;
      line-height: 1.2rem;
      font-family: "Barlow Semi Condensed";
      font-weight: bold; 
      span {
        margin-right: 1rem;
        margin-bottom: 1rem;
      }
    }
    .description {
      font-family: "Barlow Semi Condensed";
    }
    .links {
      // border: 1px solid white; 
      border-radius: 1rem; 
      background: rgba(226, 228, 227, 1); 
      padding: 0.4rem; 
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 25%;
      margin-top: 1rem;
      a {
        display: inline-block;
        margin-right: 2rem;
      }
      svg {
        width: 1.3rem;
        height: 1.3rem;
        transition: all 0.3s ease-out;
      }
      svg:hover {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
  .screenshot-container {
    // border: 1px solid black; 
    width: 100%; 
    padding: 0px; 
    // overflow: hidden; 
    max-width: 25rem; 
    height: 18rem; 
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 20rem; 
    }
    &:hover .screenshot {
      transform: translate3d(0px, -0.8rem, 0px);
    }
    &:hover .screenshot-branding {
      transform: translate3d(0px, 1rem, 0px); 
    }
  }
  .screenshot {
    // border: 1px solid black; 
    width: 17rem;
    height: 17rem;
    margin-left: 0.25rem; 
    margin-top: 1rem; 
    border-radius: 1rem; 
    // box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    transition: all 0.3s ease-out;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      // border: 1px solid black; 
      margin-top: -0.8rem; 
      width: 24rem; 
      height: 24;rem;
    }
  }
  .screenshot-branding {
    height: 4rem; 
    width: 4rem; 
    margin-top: -3rem; 
    position: relative; 
    left: 12rem; 
    z-index: 1; 
    transition: all 0.2s ease-in-out; 
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      // height: 6rem; 
      width: 4rem; 
      left: 1rem; 
    }
  }
`

const Projects = ({ content }) => {
  const { darkMode } = useContext(Context).state
  const sectionDetails = content[0].node
  const projects = content.slice(1, content.length)

  // visibleProject is needed to show which project is currently
  // being viewed in the horizontal slider on mobile and tablet
  const [visibleProject, setVisibleProject] = useState(1)

  // projects don't track the visibility by using the onScreen hook
  // instead they use react-visibility-sensor, therefore their visibility
  // is also stored differently
  const [onScreen, setOnScreen] = useState({})
  const handleOnScreen = (el) => {
    if (!onScreen[el]) {
      const updatedOnScreen = { ...onScreen }
      updatedOnScreen[el] = true
      setOnScreen(updatedOnScreen)
    }
  }
  const pVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    // mobile and tablet only: set first project as visible in the
    // horizontal slider
    setVisibleProject(1)
    // required for animations: set visibility for all projects to
    // "false" initially
    let initial = {}
    projects.forEach((project) => {
      initial[project.node.frontmatter.position] = false
    })
    setOnScreen(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Required for animating the title
  const tRef = useRef()
  const tOnScreen = useOnScreen(tRef)
  const tVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  // Required for animating the button
  const bRef = useRef()
  const bOnScreen = useOnScreen(bRef)
  const bVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <StyledSection id="projects">
      <StyledContentWrapper>
        <motion.div
          ref={tRef}
          variants={tVariants}
          animate={tOnScreen ? "visible" : "hidden"}
        >
          <h3 className="section-title">{sectionDetails.frontmatter.title}</h3>
          <div className="counter">
            {visibleProject} / {projects.length}
          </div>
        </motion.div>
        <div className="projects">
          {projects.map((project, key) => {
            const { body, frontmatter } = project.node
            return (
              <VisibilitySensor
                key={key}
                onChange={() => handleOnScreen(key + 1)}
                partialVisibility={true}
                minTopValue={100}
              >
                <StyledProject
                  position={key + 1}
                  variants={pVariants}
                  animate={
                    onScreen[frontmatter.position] ? "visible" : "hidden"
                  }
                >
                  <div className="details">
                    <div className="category">
                      <GatsbyImage
                        className="decal"
                        image={
                          frontmatter.decal.childImageSharp.gatsbyImageData
                        }
                      />
                      <p className="category-text">{frontmatter.category}</p>
                    </div>
                    <div className="title">{frontmatter.title}</div>
                    <div className="description">
                      <MDXRenderer>{body}</MDXRenderer>
                    </div>
                    <div className="tags">
                      {frontmatter.tags.map((tag) => (
                        <Underlining key={tag} highlight>
                          {tag}
                        </Underlining>
                      ))}
                    </div>
                    <div className="links">
                      {frontmatter.github && (
                        <a
                          href={frontmatter.github}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          aria-label="External Link"
                        >
                          <Icon
                            name="github"
                            color={
                              darkMode
                                ? darkTheme.colors.subtext
                                : lightTheme.colors.subtext
                            }
                          />
                        </a>
                      )}
                      {frontmatter.external && (
                        <a
                          href={frontmatter.external}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          aria-label="External Link"
                        >
                          <Icon
                            name="blog"
                            color={
                              darkMode
                                ? darkTheme.colors.subtext
                                : lightTheme.colors.subtext
                            }
                          />
                        </a>
                      )}
                    </div>
                  </div>
                  {/* If image in viewport changes, update state accordingly */}
                  <VisibilitySensor
                    onChange={() => setVisibleProject(frontmatter.position)}
                  >
                    <div className="screenshot-container">
                      <GatsbyImage
                        className="screenshot"
                        image={
                          frontmatter.screenshot.childImageSharp.gatsbyImageData
                        }
                      />
                      <GatsbyImage
                        className="screenshot-branding"
                        image={
                          frontmatter.screenshotBranding.childImageSharp
                            .gatsbyImageData
                        }
                      />
                    </div>
                  </VisibilitySensor>
                </StyledProject>
              </VisibilitySensor>
            )
          })}
        </div>
      </StyledContentWrapper>
      {/*TODO: need to add hover animation to button element but only cta-btn class is accessible */}
      {sectionDetails.frontmatter.buttonVisible && (
        <motion.a
          ref={bRef}
          variants={bVariants}
          animate={bOnScreen ? "visible" : "hidden"}
          className="cta-btn"
          href={sectionDetails.frontmatter.buttonUrl}
          target="_self"
          rel="nofollow noopener noreferrer"
          aria-label="Internal Link"
        >
          <Button type="button" textAlign="center" center>
            {sectionDetails.frontmatter.buttonText}
          </Button>
        </motion.a>
      )}
    </StyledSection>
  )
}

Projects.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Projects
