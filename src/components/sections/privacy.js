import React, { useRef, useContext, useEffect } from "react"
import { useOnScreen } from "../../hooks/"
import PropTypes from "prop-types"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion } from "framer-motion"
import { lightTheme, darkTheme } from "../../styles/theme"

// import Context from "../../context/"
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

const StyledSection = styled(motion.section)`
  width: 100%;
  max-width: 62.5rem;
  margin: 0 auto;
  padding: 0 2.5rem;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  h1 {
    font-size: 1.5rem;
    font-family: "Khand";
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
    margin: 0;
    padding: 0;
    height: 100%;
  }
  .text-description {
    font-family: "Barlow Semi Condensed";
    font-size: 1.1rem;
    border: 1px solid white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    background: rgba(207, 207, 207, 0.8);
  }
  .policy-decal {
    position: relative;
    border-radius: 1rem;
    top: -3rem;
    left: 17rem;
    z-index: 2;
    width: 15%;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      top: -4rem;
      left: 30rem;
    }
  }
`

const Privacy = ({ content }) => {
  const { frontmatter, body } = content[0].node
  const { title } = frontmatter
  const textRef = useRef()
  const textOnScreen = useOnScreen(textRef)

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.9 } },
  }

  return (
    <StyledSection
      id={title}
      ref={textRef}
      initial={variants.hidden}
      variants={variants}
      animate={textOnScreen ? "visible" : "visible"}
    >
      <StyledContentWrapper>
        <h1 data-testid="heading">{title}</h1>
        <p className="text-description">
          <MDXRenderer>{body}</MDXRenderer>
        </p>
        <img
          alt="policy-decal"
          className="policy-decal"
          src="https://res.cloudinary.com/dzmc7doja/image/upload/v1642056643/design-assets/design-icon-assets/privacy-policy.png"
        />
      </StyledContentWrapper>
    </StyledSection>
  )
}

Privacy.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Privacy
