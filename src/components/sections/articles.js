import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import SkeletonLoader from "tiny-skeleton-loader-react"
import { motion, useAnimation } from "framer-motion"

import Context from "../../context"
import ContentWrapper from "../../styles/contentWrapper"
import Underlining from "../../styles/underlining"
import { parseDate } from "../../utils"
import { rssFeed, mediumRssFeed, shownArticles } from "../../../config"

import rssJson from "../../../feed/rss.json"
import { lightTheme, darkTheme } from "../../styles/theme"

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

const StyledSection = motion(styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
`)

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    padding-right: 0;
    padding-left: 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
    }
    .section-title {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
      font-family: "Khand";
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        padding-right: 0;
        padding-left: 0;
      }
    }
    .articles {
      display: flex;
      justify-content: flex-start;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      margin: -2rem 0 0 0;
      padding: 0 2rem;
      &::-webkit-scrollbar {
        display: none;
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        padding: 0 1rem;
      }
      /* Show scrollbar if desktop and wrapper width > viewport width */
      @media (hover: hover) {
        scrollbar-color: ${({ theme }) => theme.colors.scrollBar} transparent; // Firefox only
        &::-webkit-scrollbar {
          display: block;
          -webkit-appearance: none;
          max-width: 4px;
        }

        &::-webkit-scrollbar:horizontal {
          height: 0.8rem;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
          border: 0.2rem solid ${({ theme }) => theme.colors.background};
          background-color: ${({ theme }) => theme.colors.scrollBar};
        }

        &::-webkit-scrollbar-track {
          background-color: ${({ theme }) => theme.colors.background};
          border-radius: 8px;
        }
      }
    }
    .card-decal {
      display: block;
      position: relative;
      top: 3.5rem;
      left: 2rem;
      width: 2rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        left: 0.5rem;
      }
    }
    .card-details {
      border-left: 3px solid ${({ theme }) => theme.colors.primary};
      width: 16.25rem;
      height: 12rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
      margin: 2rem 1rem;
      box-shadow: 0 7px 15px ${({ theme }) => theme.colors.boxShadow};
      border-radius: ${({ theme }) => theme.borderRadius};
      background: ${({ theme }) => theme.colors.card};
      transition: box-shadow 0.3s ease-out;
      z-index: 0;
      &:hover {
        box-shadow: 0 5px 15px ${({ theme }) => theme.colors.boxShadowHover};
      }
      &:hover ${Underlining} {
        box-shadow: inset 0 -1rem 0 ${({ theme }) => theme.colors.secondary};
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        margin: 2rem 2.5rem 2rem 0;
      }
      .category {
        color: ${({ theme }) => theme.colors.primary};
        text-transform: uppercase;
        letter-spacing: +1px;
        font-weight: 700;
        font-family: "Barlow Semi Condensed";
      }
      .title {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
        font-family: "Khand";
      }
      .date {
        font-size: 0.75rem;
        color: ${({ theme }) => theme.colors.subtext};
        letter-spacing: 1px;
        font-family: "Khand";
      }
    }
  }
`

const Articles = () => {
  const MAX_ARTICLES = shownArticles

  const { isIntroDone, darkMode } = useContext(Context).state
  const [articles, setArticles] = useState()
  const articlesControls = useAnimation()

  // Load and display articles after the splashScreen sequence is done
  useEffect(() => {
    const loadArticles = async () => {
      if (isIntroDone) {
        await articlesControls.start({
          opacity: 1,
          y: 0,
          transition: { delay: 1 },
        })
        // if using the rssFeed or mediumRssFeed link uncomment the section below and remove the uncommented section where const newArticles and setArticles
        // fetch(rssFeed or mediumRssFeed).then((res) => res.json()).then((data) => data.items.slice(0, MAX_ARTICLES))
        // const newArticles = data
        // setArticles(newArticles)
        const newArticles = rssJson.items.slice(0, MAX_ARTICLES)
        setArticles(newArticles)
      }
    }
    loadArticles()
  }, [isIntroDone, articlesControls, MAX_ARTICLES])

  return (
    <StyledSection
      id="articles"
      initial={{ opacity: 0, y: 20 }}
      animate={articlesControls}
    >
      <StyledContentWrapper>
        <h3 className="section-title">articles.</h3>
        <div className="articles">
          {articles
            ? articles.map((item) => (
                <a
                  href={item.link}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  title={item.title}
                  aria-label={item.link}
                  key={item.link}
                >
                  <img
                    className="card-decal"
                    src="https://res.cloudinary.com/dzmc7doja/image/upload/v1632550761/design-assets/design-icon-assets/website.png"
                  />
                  <div className="card-details">
                    <span className="category">
                      <Underlining color="secondary" hoverColor="secondary">
                        {item.categories[1]}
                      </Underlining>
                    </span>
                    <h4 className="title">{item.title}</h4>
                    <span className="date">{parseDate(item.pubDate)}</span>
                  </div>
                </a>
              ))
            : [...Array(MAX_ARTICLES <= 3 ? MAX_ARTICLES : 3)].map((i, key) => (
                <div className="card-details" key={key}>
                  <SkeletonLoader
                    height="1.5rem"
                    style={{ marginBottom: ".5rem" }}
                    background={
                      darkMode
                        ? darkTheme.colors.secondary
                        : lightTheme.colors.secondary
                    }
                  />
                  <SkeletonLoader
                    height="4rem"
                    background={
                      darkMode
                        ? darkTheme.colors.secondary
                        : lightTheme.colors.secondary
                    }
                  />
                  <SkeletonLoader
                    height=".75rem"
                    width="50%"
                    style={{ marginTop: ".5rem" }}
                    background={
                      darkMode
                        ? darkTheme.colors.secondary
                        : lightTheme.colors.secondary
                    }
                  />
                </div>
              ))}
        </div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

export default Articles
