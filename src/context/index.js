import { createContext } from "react"

const Context = createContext({
  defaultParam: false,
  setDefaultParam: () => {},
  isIntroDone: false,
  setIsIntroDone: () => {},
  darkMode: false,
  setDarkMode: () => {},
})

export default Context
