import React from "react"
import styled, { ThemeProvider } from "styled-components"
import PropTypes from "prop-types"
import { motion } from "framer-motion"
import { useForm, ValidationError } from "@formspree/react"

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

const StyledPopupBox = styled(motion.section)`
  position: fixed;
  z-index: 3;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  .close-icon {
    cursor: pointer;
    position: relative;
    top: 0.85rem;
    left: 25rem;
    line-height: 20px;
    text-align: center;
    font-size: 20px;
  }
`

const StyledBox = styled(motion.div)`
  position: relative;
  width: 25%;
  margin: 0 auto;
  height: auto;
  max-height: 70vh;
  margin-top: calc(100vh - 85vh - 20px);
  background: rgba(237, 239, 238, 0.98);
  box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
  border-radius: 1rem;
  padding: 1rem;
  border: 0.25rem solid white;
  z-index: 3;
  overflow: auto;
  .contact-form {
    border-top: 1px solid white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    margin-top: -1rem;
    width: 100%;
  }
  .label-input {
    font-family: "Khand";
    font-weight: bold;
  }
  .form-input {
    border: 1px solid black;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    padding: 1rem;
  }
  .form-input::placeholder {
    font-family: "Khand";
  }
  #mesasge {
    letter-spacing: 0px;
  }
  .form-button {
    font-family: "Barlow Semi Condensed";
    padding: 1rem;
  }
  .form-description {
    margin-top: -2.5rem;
    padding: 1rem;
    font-family: "Barlow Semi Condensed";
    font-size: 14px;
  }
  .form-checkbox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  .form-checkbox input {
    margin-top: 0.3rem;
  }
  .form-checkbox label {
    font-family: "Barlow Semi Condensed";
    font-weight: bold;
    font-size: 14px;
  }
`

const StyledFormHeader = styled(motion.div)`
  display: flex;
  flex-direction: row;
  margin-top: -3rem;
  .form-header {
    margin-left: 0.25rem;
    font-family: "Barlow Semi Condensed";
    text-transform: uppercase;
    font-weight: bold;
  }
  .signup-decal {
    padding: 0.2rem;
    margin-top: 1.85rem;
    width: 8%;
    height: 8%;
  }
`
const StyledSuccessMessage = styled(motion.div)`
  font-family: "Khand";
  background: rgba(237, 239, 238, 0.9);
  border-top: 0.25rem solid white;
  border-bottom: 0.25rem solid white;
  border-left: 0.25rem solid white;
  border-right: 0;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  padding: 1rem;
`

const FormPopup = (data) => {
  const [formState, handleSubmit] = useForm("contactSubmissionForm")
  if (formState.succeeded) {
    const variants = {
      successMessageExit: { opacity: 0, y: 20, transition: { delay: 3 } },
    }

    return (
      <StyledSuccessMessage
        variants={variants}
        animate={variants.successMessageExit}
      >
        <p> Thanks for getting in contact, you will hear from me soon! </p>
      </StyledSuccessMessage>
    )
  }

  const variants = {
    formEntry: { opacity: 1, y: 0, transition: { delay: 0.3 } },
    formInitial: { opacity: 0, y: 20 },
    formCloseExit: { opacity: 0, y: 20 },
  }

  return (
    <StyledPopupBox>
      <StyledBox
        variants={variants}
        initial={variants.formInitial}
        animate={variants.formEntry}
      >
        <span className="close-icon" onClick={data.handleClose}>
          ❎
        </span>
        <StyledFormHeader>
          <img
            alt="signup"
            className="signup-decal"
            src="https://res.cloudinary.com/dzmc7doja/image/upload/v1642663225/design-assets/design-icon-assets/google-forms.png"
          />
          <h3 className="form-header">sign up form</h3>
        </StyledFormHeader>
        <p className="form-description">
          If you would like to reach me, I can be contacted using the signup
          form below. I will also be starting a newsletter in the coming weeks
          and would love to drop helpful tech articles in your inbox. Just
          indicate indicate below if this is something you are interested in!
        </p>

        <motion.form
          variants={variants}
          initial={variants.formInitial}
          animate={variants.formEntry}
          onSubmit={handleSubmit}
          className="contact-form"
        >
          <label htmlFor="name" className="label-input">
            Name
          </label>
          <input
            id="name"
            type="name"
            name="name"
            className="form-input"
            placeholder="your name"
          />
          <ValidationError
            prefix="Name"
            field="name"
            errors={formState.errors}
          />
          <label htmlFor="email" className="label-input">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="example@mail.com"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={formState.errors}
          />
          <label htmlFor="name" className="label-input">
            Leave me a Message!
          </label>
          <textarea id="message" name="message" className="form-input" />
          <ValidationError
            prefix="Message"
            field="message"
            errors={formState.errors}
          />
          <div className="form-checkbox">
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              value="Interested in the Newsletter?"
            />
            <label htmlFor="checkbox">Interested in the Newsletter?</label>
          </div>
          <button
            type="submit"
            disabled={formState.submitting}
            className="form-button"
          >
            Submit
          </button>
        </motion.form>
      </StyledBox>
    </StyledPopupBox>
  )
}

FormPopup.PropTypes = {
  handleClose: PropTypes.any,
}

export default FormPopup
