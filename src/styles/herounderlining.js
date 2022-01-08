import styled from "styled-components"

const heroUnderlining = styled.span`
  @property --offset {
    syntax: "<length>";
    inherits: false;
    initial-value: 0;
  }
  text-underline-offset: var(--offset, 0em);
  color: inherit;
  text-decoration: underline 0.15em #f2f2f2;
  transition: --offset 500ms, text-decoration-color 300ms;
  &:hover,
  &:focus {
    --offset: 0.3em;
    text-decoration-color: #605e5a;
  }
`

export default heroUnderlining
