import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { motion, useAnimation } from "framer-motion"
import FormPopup from "../components/formpopup"
import Context from "../context/"
import { FormspreeProvider } from "@formspree/react"

const StyledFloatingButton = motion(styled.div`
  position: fixed;
  right: 0;
  bottom: 2rem;
  width: 20%;
  margin: 0;
  z-index: 2;
  .decal-cta {
    float: right;
    padding: 1rem;
    border-radius: 6rem;
    width: 5rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 6.5rem;
    }
  }
`)

const FloatingButton = () => {
  const controls = useAnimation()
  const { isIntroDone } = useContext(Context).state

  const [formOpen, setFormOpen] = useState(false)

  const toggleForm = () => {
    setFormOpen(!formOpen)
  }

  useEffect(() => {
    if (isIntroDone) {
      controls.start({
        opacity: 1,
      })
    }
  }, [isIntroDone])

  if (!isIntroDone) return null

  return (
    <FormspreeProvider project="{1858830325950446621}">
      <StyledFloatingButton initial={{ opacity: 0 }} animate={controls}>
        <motion.img
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
          whileTap={{ scale: 0.8, boxShadow: `0 0 5rem rgba(0,0,0, 0.16)` }}
          onClick={() => toggleForm()}
          className="decal-cta"
          alt="floating-button"
          src="https://res.cloudinary.com/dzmc7doja/image/upload/v1640411837/portfolio-site/logo-initials.png"
        />
        {formOpen && <FormPopup handleClose={toggleForm} />}
      </StyledFloatingButton>
    </FormspreeProvider>
  )
}

export default FloatingButton
