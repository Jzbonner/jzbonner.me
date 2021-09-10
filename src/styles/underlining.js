import styled from "styled-components"

const Underlining = styled.span`
  box-shadow: inset 0 ${({ big }) => (big ? "-1rem" : "-.5rem")} 0
    ${({ theme, highlight }) =>
      highlight ? theme.colors.secondary : theme.colors.tertiary};
  transition: box-shadow 0.2s ease-out;
  &:hover {
    box-shadow: inset 0 ${({ big }) => (big ? "-3rem" : "-1.5rem")} 0
      ${({ theme }) => theme.colors.secondary};
  }
`

export default Underlining
