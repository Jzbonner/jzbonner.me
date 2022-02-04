import React, { useContext } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Context from "../context"
import Icon from "./professionalicons"
import { lightTheme, darkTheme } from "../styles/theme"
import { proSocialMedia } from "../../config"
import { motion } from "framer-motion"

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

const StyledSocialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -2.5rem;
  margin-right: -2.5rem;
  padding-left: 2.5rem;
  padding-right: 3.5rem;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: grid;
    justify-content: flex-start;
    grid-template-columns: repeat(${({ itemCount }) => itemCount + 1}, auto);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    overflow: visible;
  }

  /* Workaround: https://stackoverflow.com/questions/38993170/last-margin-padding-collapsing-in-flexbox-grid-layout */
  &::after {
    content: "";
    width: 2.5rem;
  }

  /* Show scrollbar if desktop and wrapper width > viewport width */
  @media (hover: hover) {
    scrollbar-color: ${({ theme }) => theme.colors.scrollBar} transparent; //Firefox only
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

  a {
    margin-right: 0.5rem;
    margin-bottom: 0.75rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-right: 1rem;
    }
  }
`

const StyledSocialProfile = styled(motion.a)`
  display: flex;
  flex-direction: row;
  width: 70%;
  height: auto;
  z-index: 1;
  background: ${({ theme }) => theme.colors.secondary};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary} 50%,
    ${({ theme }) => theme.colors.backgroundText} 50%
  );
  background-size: 205% 100%;
  background-position: right bottom;
  border-radius: 0.8rem;
  border: 0.3rem outset rgba(198, 198, 198, 0.8);
  padding: ${({ padding }) => (padding ? padding : ".3rem 1.25rem")};
  transition: all 0.1s ease-in-out;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1rem")};
  font-family: "Barlow Semi Condensed";
  font-weight: 600;
  /* color: rgb(234, 234, 234); */
  color: ${({ theme }) => theme.colors.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    color: rgb(234, 234, 234);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background-position: left bottom;
    color: ${({ theme }) => theme.colors.backgroundText};
    border: 0.3rem outset rgba(239, 239, 238, 0.8);
  }
  &:hover svg {
    filter: invert(1);
  }
  svg {
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
    margin-bottom: -0.05rem;
  }
`

const ProfessionalSocial = ({
  width,
  padding,
  fontSize,
  fontWeight,
  withIcon,
}) => {
  const { darkMode } = useContext(Context).state

  return (
    <StyledSocialWrapper itemCount={proSocialMedia.length}>
      {proSocialMedia.map(({ name, description, url }, key) => {
        return (
          <StyledSocialProfile
            key={key}
            href={url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label={name}
            width={width}
            padding={padding}
            fontSize={fontSize}
            fontWeight={fontWeight}
          >
            {withIcon ? (
              <Icon
                name={name}
                color={
                  darkMode
                    ? darkTheme.colors.primary
                    : lightTheme.colors.primary
                }
              />
            ) : null}{" "}
            {description}
          </StyledSocialProfile>
        )
      })}
    </StyledSocialWrapper>
  )
}

ProfessionalSocial.propTypes = {
  width: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  withIcon: PropTypes.bool,
}

export default ProfessionalSocial
