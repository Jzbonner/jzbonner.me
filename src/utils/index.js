import { sharedPreferences } from "../styles/theme"
import { useState, useEffect } from "react"

// breakpoints.lg needs to be cleaned and parsed since it is a string like '1200px'
export const detectMobileAndTablet = (windowWidth) =>
  windowWidth <
  parseInt(sharedPreferences.breakpoints.lg.match(/\d+/gi).join(""))

// detect server-side-rendering to fix bugs while gatsby build
export const isSSR = typeof window === "undefined"

// used to parse the publication date of medium articles
export const parseDate = (date) => {
  const year = date.substring(0, 4)
  const month = date.substring(5, 7)
  const day = date.substring(8, 10)

  switch (month) {
    case "01":
      return day + " January " + year
    case "02":
      return day + " February " + year
    case "03":
      return day + " March " + year
    case "04":
      return day + " April " + year
    case "05":
      return day + " May " + year
    case "06":
      return day + " June " + year
    case "07":
      return day + " July " + year
    case "08":
      return day + " August " + year
    case "09":
      return day + " September " + year
    case "10":
      return day + " October " + year
    case "11":
      return day + " November " + year
    case "12":
      return day + " December " + year
    default:
      return "No publication date"
  }
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    }
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])
  return matches
}

export const useIsSmallScreen = () => useMediaQuery("(max-width: 480px)")
