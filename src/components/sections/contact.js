import React, { useRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion } from "framer-motion"

import { useOnScreen } from "../../hooks"
import ContentWrapper from "../../styles/contentWrapper"
import Underlining from "../../styles/underlining"
import Social from "../social"

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
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 6rem;
  display: flex;
  justify-content: center;
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    /* Don't stretch container over the full page width */
    max-width: 45rem;
    height: 100%;
    display: inline-block;
    p {
      margin-top: 0;
      margin-bottom: 0;
    }
    .section-title {
      font-family: "Khand";
    }
    .section-subtitle {
      font-size: 1.2rem;
      font-family: "Barlow Semi Condensed";
    }
    .profile {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-top: 3rem;
      margin-bottom: 2rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        flex-direction: row;
        align-items: center;
        margin-bottom: 3rem;
      }
      .avatar {
        width: 80%;
        max-width: 6.75rem;
        border-radius: 5%;
        margin-right: 1rem;
        margin-bottom: 1rem;
        @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
          margin-bottom: 0;
        }
      }
      .details {
        font-family: "Barlow Semi Condensed";
        font-size: 1.25rem;
        line-height: 2rem;
      }
    }
  }
`

const Contact = ({ content }) => {
  const { body, frontmatter } = content[0].node

  // Required for animation
  const ref = useRef()
  const onScreen = useOnScreen(ref)
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <StyledSection
      id="contact"
      ref={ref}
      variants={variants}
      animate={onScreen ? "visible" : "hidden"}
    >
      <StyledContentWrapper>
        <h3 className="section-title">{frontmatter.title}</h3>
        <p className="section-subtitle">
          <MDXRenderer>{body}</MDXRenderer>
        </p>
        <div className="profile">
          <GatsbyImage
            className="avatar"
            image={frontmatter.profileImage.childImageSharp.gatsbyImageData}
          />
          <div className="details">
            <strong>{frontmatter.name}</strong>
            <br />
            <a href={`mailto:${frontmatter.email}`}>
              <Underlining highlight>{frontmatter.email}</Underlining>
            </a>
          </div>
        </div>
        <Social width="9rem" padding="0.5rem 1.25rem" withIcon />
      </StyledContentWrapper>
    </StyledSection>
  )
}

Contact.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Contact
