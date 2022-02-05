import React, { useRef, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useAnimation } from "framer-motion"

import { useOnScreen } from "../../hooks/"
import Context from "../../context/"
import ContentWrapper from "../../styles/contentWrapper"

// import google fonts from webfontloader module
// const WebFont = require("webfontloader")

// WebFont.load({
//   google: {
//     families: [
//       "Caveat",
//       "Khand",
//       "Roboto Condensed:400",
//       "Barlow Semi Condensed",
//     ],
//   },
// })

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 4rem;
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      flex-direction: row;
      justify-content: space-between;
    }
    .section-title {
      margin-bottom: 2rem;
      font-family: "Khand";
    }
    .inner-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .text-content {
      border: 0.4rem outset rgba(239, 239, 238, 0.8);
      border-radius: 9px 40px 9px 40px;
      box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
      background-color: rgba(202, 202, 202, 0.3);
      backdrop-filter: blur(2px);
      width: 100%;
      padding: 1rem;
      max-width: 31.25rem;
      font-family: "Barlow Semi Condensed";
      font-size: 1.1rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        padding: 2rem;
      }
    }
    .about-decal {
      position: relative;
      top: -4rem;
      left: 13rem;
      width: 27%;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 23%;
        left: 18rem;
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        width: 17%;
        left: 23rem;
      }
    }
    .image-content {
      width: 100%;
      max-width: 18rem;
      margin-left: 1.25rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-left: 2rem;
        margin-top: 6rem;
      }
    }
    .about-author {
      // border: 3px solid #A5A5A5;
      border-radius: 50% 30% / 10% 40%;
      box-shadow: rgba(180, 180, 180, 0.6) -5px 5px,
        rgba(180, 180, 180, 0.5) -10px 10px, rgba(180, 180, 180, 0.4) -15px 15px,
        rgba(180, 180, 180, 0.3) -20px 20px, rgba(180, 180, 180, 0.2) -25px 25px;
      filter: grayscale(20%) contrast(1) brightness(90%);
      transition: all 0.3s ease-out;
      &:hover {
        filter: grayscale(50%) contrast(1) brightness(90%);
        transform: translate3d(0px, -0.25rem, 0px);
        box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.32);
      }
    }
    .pulsate-fwd {
      -webkit-animation: pulsate-fwd 2.5s ease-in-out infinite both;
      animation: pulsate-fwd 2.5s ease-in-out infinite both;
    }
    @-webkit-keyframes pulsate-fwd {
      0% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      50% {
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
      }
      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
    @keyframes pulsate-fwd {
      0% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      50% {
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
      }
      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
  }
`

const About = ({ content }) => {
  const { frontmatter, body } = content[0].node
  const { isIntroDone } = useContext(Context).state
  const tControls = useAnimation()
  const iControls = useAnimation()

  // Required for animating the text content
  const tRef = useRef()
  const tOnScreen = useOnScreen(tRef)

  // Required for animating the image
  const iRef = useRef()
  const iOnScreen = useOnScreen(iRef)

  // Only trigger animations if the intro is done or disabled
  useEffect(() => {
    if (isIntroDone) {
      if (tOnScreen) tControls.start({ opacity: 1, y: 0 })
      if (iOnScreen) iControls.start({ opacity: 1, x: 0 })
    }
  }, [isIntroDone, tControls, iControls, tOnScreen, iOnScreen])

  return (
    <StyledSection id="about">
      <StyledContentWrapper>
        <motion.div
          className="inner-wrapper"
          ref={tRef}
          initial={{ opacity: 0, y: 20 }}
          animate={tControls}
        >
          <h3 className="section-title">{frontmatter.title}</h3>
          <div className="text-content">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
          <img
            alt="about-decal"
            className="about-decal"
            src="https://res.cloudinary.com/dzmc7doja/image/upload/v1642490418/design-assets/design-icon-assets/contact.png"
          />
        </motion.div>
        <motion.div
          className="image-content"
          ref={iRef}
          initial={{ opacity: 0, x: 20 }}
          animate={iControls}
        >
          <GatsbyImage
            className="about-author pulsate-fwd"
            image={frontmatter.image.childImageSharp.gatsbyImageData}
          />
        </motion.div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

About.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default About
