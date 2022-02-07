import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useAnimation } from "framer-motion"

import Context from "../../context/"
import ContentWrapper from "../../styles/contentWrapper"
import heroUnderlining from "../../styles/herounderlining"
// change compoenent below to professional social
import ProfessionalSocial from "../professionalsocial"
import { lightTheme, darkTheme } from "../../styles/theme"

const StyledSection = styled.section`
  /* border: 1px solid red; */
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    cursor: pointer;
    width: 100%;
    height: 100%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 6rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-bottom: 4rem;
    }
    .greetings {
      font-family: "Khand";
      letter-spacing: 0.2rem;
      text-shadow: 4px 4px 0px #d5d5d5, 9px 9px 0px rgba(0, 0, 0, 0.2);
      color: ${({ theme }) => theme.colors.primary};
      display: flex;
      opacity: 0.95;
      justify-content: flex-start;
      align-items: center;
    }
    .emoji {
      margin-left: 0.75rem;
      width: 5rem;
      height: 5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-left: 1rem;
        width: 4rem;
        height: 4rem;
      }
    }
    .title {
      margin-bottom: 1.5rem;
      margin-top: -2rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-bottom: 0;
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        margin-top: 0rem;
        margin-bottom: 0;
      }
    }
    .subtitle {
      border-radius: inherit;
      color: ${({ theme }) => theme.colors.subtitleText};
      margin-top: -1rem;
      padding: 0.4rem !important;
      font-family: "Khand";
      letter-spacing: 1px;
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        font-size: 1.75rem;
      }
    }
    .description {
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }
    .logo-watermark {
      /* border: 1px solid blue; */
      position: absolute;
      top: 0;
      left: 0;
      width: 95%;
      margin-top: 6rem;
      z-index: auto;
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        margin-left: 2rem;
        width: 55%;
      }
    }
  }
`

// using local styled component to handle substring animation of subtitle section
const AnimatedUnderlining = motion(heroUnderlining)

// using framer motion to control hover functionality of subtitle section
const subtitleVariants = {
  initial: {
    opacity: 0.3,
    backgroundColor: "inherit",
    // borderRadius: "inherit",
    boxShadow: "inherit",
    transform: "translateY(0px)",
    transition:
      "transform 300ms, backgroundColor 300ms, boxShadow 300ms, borderRadius 300ms",
  },
  hover: {
    opacity: 1,
    // boxShadow: "2px 1px 8px 2px rgba(66,66,66, 0.4)",
    borderRadius: "1rem",
    backgroundColor: "rgba(193,189,180, 0.45)",
    transform: "translateY(17px)",
  },
}

const Hero = ({ content }) => {
  const { frontmatter, body } = content[0].node
  const { isIntroDone, darkMode } = useContext(Context).state

  // controls to orchestrate animations of greetings, emoji, social profiles, underlining using framer-motion module
  const gControls = useAnimation()
  const eControls = useAnimation()
  const sControls = useAnimation()
  const uControls = useAnimation()

  const variants = {
    initial: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { delay: 1 } },
  }

  // start animations after the splashScreen sequence is done
  useEffect(() => {
    const pageLoadSequence = async () => {
      if (isIntroDone) {
        eControls.start({
          rotate: [0, -10, 12, -10, 9, 0, 0, 0, 0, 0, 0],
          transition: { duration: 2.5, loop: 3, repeatDelay: 1 },
        })
        await gControls.start({
          opacity: 1,
          y: 0,
          transition: { delay: 0.4 },
        })
        await sControls.start({
          opacity: 1,
          x: 0,
        })
        // Animate underlining to hover state
        await uControls.start({
          color: "rgba(247,247,247, 0.85)",
          transition: { delay: 0.3 },
        })
      }
    }
    pageLoadSequence()
  }, [isIntroDone, darkMode, eControls, gControls, sControls, uControls])

  return (
    <StyledSection id="hero">
      <StyledContentWrapper>
        <motion.img
          alt="logo-watermark"
          src="https://res.cloudinary.com/dzmc7doja/image/upload/v1643198785/design-assets/design-icon-assets/Logo-Watermark-D.png"
          className="logo-watermark"
          variants={variants}
          initial={variants.initial}
          animate={variants.visible}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gControls}
          data-testid="animated-heading"
        >
          {/**using a nested framer motion component to handle subtitle animations */}
          <motion.div initial="initial" whileHover="hover" whileTap="hover">
            <h1 className="title">
              <div className="greetings">
                {frontmatter.greetings}
                <motion.div
                  animate={eControls}
                  style={{ originX: 0.7, originY: 0.7 }}
                >
                  <GatsbyImage
                    className="emoji"
                    image={frontmatter.icon.childImageSharp.gatsbyImageData}
                  />
                </motion.div>
              </div>
              {frontmatter.title}
            </h1>
            <motion.div variants={subtitleVariants}>
              <h2 className="subtitle">
                {frontmatter.subtitlePrefix}{" "}
                {/**local styled component to handle substring animation of subtitle */}
                <AnimatedUnderlining animate={uControls}>
                  <span>{frontmatter.subtitle}</span>
                </AnimatedUnderlining>
              </h2>
            </motion.div>
          </motion.div>
          <div className="description">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={sControls}>
            <ProfessionalSocial padding=".2rem 1.5rem" width="auto" withIcon />
          </motion.div>
        </motion.div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

Hero.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Hero
