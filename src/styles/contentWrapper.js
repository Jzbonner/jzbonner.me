import styled from "styled-components"
import { motion } from "framer-motion"

const ContentWrapper = styled(motion.div)`
  max-width: ${({ theme }) => theme.pageWidth};
  margin: 0 auto;
  padding: 0 2.5rem;
`
export default ContentWrapper
