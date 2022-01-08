import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { motion, useAnimation } from "framer-motion"

import { detectMobileAndTablet, isSSR } from "../../utils"
import { useOnScreen } from "../../hooks/"
import ContentWrapper from "../../styles/contentWrapper"
import Button from "../../styles/button"

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
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 6rem;
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
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
  }
`

const StyledInterests = styled.div`
  display: grid;
  /* Calculate how many columns are needed, depending on interests count */
  grid-template-columns: repeat(
    ${({ itemCount }) => Math.ceil(itemCount / 2)},
    15.625rem
  );
  grid-template-rows: repeat(2, auto);
  grid-auto-flow: column;
  column-gap: 1rem;
  row-gap: 1rem;
  padding: 0 2.5rem 1.25rem 2.5rem;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  /* Workaround: https://stackoverflow.com/questions/38993170/last-margin-padding-collapsing-in-flexbox-grid-layout */
  &::after {
    content: "";
    width: ${({ itemCount }) =>
      Math.ceil(itemCount / 2) % 2 === 1 ? "17.125rem" : "2.5rem"};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 15.625rem);
    overflow: visible;
    padding: 0;
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
  .interest {
    width: 15.625rem;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-radius: 4%;
    background: rgba(246, 249, 248, 0.5);
    .icon {
      margin-right: 1rem;
    }
    font-family: "Barlow Semi Condensed";
  }
  .card-decal {
    position: relative;
    left: 1.8rem;
    top: 2rem;
    z-index: 2;
    width: 2rem;
    --webkit-filter: invert(30%);
    filter: invert(30%);
  }
`

const Interests = ({ content }) => {
  const { exports, frontmatter } = content[0].node
  // exports may need to be a node as well
  const { shownItems, interests } = exports

  const [shownInterests, setShownInterests] = useState(shownItems)

  const ref = useRef()
  const onScreen = useOnScreen(ref)

  const iControls = useAnimation()
  const bControls = useAnimation()

  useEffect(() => {
    // If mobile or tablet, show all interests initially
    // Otherwise interests.mdx will determine how many interests are shown
    // (isSSR) is used to prevent error during gatsby build
    if (!isSSR && detectMobileAndTablet(window.innerWidth)) {
      setShownInterests(interests.length)
    }
  }, [interests])

  useEffect(() => {
    const sequence = async () => {
      if (onScreen) {
        // i receives the value of the custom prop - can be used to stagger
        // the animation of each "interest" element
        await iControls.start((i) => ({
          opacity: 1,
          scaleY: 1,
          transition: { delay: i * 0.1 },
        }))
        await bControls.start({ opacity: 1, scaleY: 1 })
      }
    }
    sequence()
  }, [onScreen, shownInterests, iControls, bControls])

  const showMoreItems = () => setShownInterests(shownInterests + 6)
  console.log(exports.interests.icon)

  return (
    <StyledSection id="skillset">
      <StyledContentWrapper>
        <h3 className="section-title">{frontmatter.title}</h3>
        <StyledInterests itemCount={interests.length} ref={ref}>
          {interests.slice(0, shownInterests).map(({ name, icon }, key) => (
            <motion.div
              className="interest"
              key={key}
              custom={key}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={iControls}
            >
              <GatsbyImage className="icon" image={icon} />
              {name}
              <img
                className="card-decal"
                src="https://res.cloudinary.com/dzmc7doja/image/upload/v1634103191/design-assets/design-icon-assets/grey-dots.png"
              />
            </motion.div>
          ))}
          {shownInterests < interests.length && (
            <motion.div initial={{ opacity: 0, scaleY: 0 }} animate={bControls}>
              <Button
                onClick={() => showMoreItems()}
                type="button"
                textAlign="left"
              >
                + view all
              </Button>
            </motion.div>
          )}
        </StyledInterests>
      </StyledContentWrapper>
    </StyledSection>
  )
}

Interests.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        exports: PropTypes.shape({
          interests: PropTypes.array.isRequired,
          shownItems: PropTypes.number.isRequired,
        }).isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Interests
