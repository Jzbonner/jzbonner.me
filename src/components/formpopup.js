import React from "react"
import styled, { ThemeProvider } from "styled-components"
import PropTypes from "prop-types"
import { motion } from "framer-motion"
import { useForm, ValidationError } from "@formspree/react"

const StyledPopupBox = styled(motion.section)`
  position: fixed;
  z-index: 3;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  .close-icon {
    content: "x";
    cursor: pointer;
    position: fixed;
    right: calc(15% - 30px);
    top: calc(100vh - 85vh - 33px);
    background: #ededed;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    border: 1px solid #999;
    font-size: 20px;
  }
`

const StyledBox = styled(motion.div)`
  border: 1px solid red;
  position: relative;
  width: 70%;
  margin: 0 auto;
  height: auto;
  max-height: 70vh;
  margin-top: calc(100vh - 85vh - 20px);
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  border: 1px solid #999;
  z-index: 3;
  overflow: auto;
`

const FormPopup = (data) => {
  const [state, handleSubmit] = useForm("contactForm")
  if (state.succeeded) {
    return <p> Thanks for getting in contact, you will hear from me soon! </p>
  }

  return (
    <StyledPopupBox>
      <StyledBox>
        <span className="close-icon" onClick={data.handleClose}>
          x
        </span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" name="email" />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <textarea id="message" name="message" />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          <button type="submit" disabled={state.submitting}>
            Submit
          </button>
        </form>
      </StyledBox>
    </StyledPopupBox>
  )
}

FormPopup.PropTypes = {
  handleClose: PropTypes.any,
}

export default FormPopup
