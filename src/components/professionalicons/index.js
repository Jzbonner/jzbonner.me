import React from "react"
import PropTypes from "prop-types"

import IconFigma from "./figma"
import IconPolywork from "./polywork"
import IconTwitter from "./twitter"

// Utility function to grab Icons by name
const Icon = ({ name, color }) => {
  switch (name.toLowerCase()) {
    case "figma":
      return <IconFigma color={color} />
    case "polywork":
      return <IconPolywork color={color} />
    case "twitter":
      return <IconTwitter color={color} />

    default:
      return null
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Icon
