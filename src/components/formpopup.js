import React from "react"
import styled, { ThemeProvider } from "styled-components"
import PropTypes from "prop-types"
import { motion } from "framer-motion"
import { useForm, ValidationError } from "@formspree/react"
import { lightTheme, darkTheme } from "../styles/theme"

const StyledPopupBox = styled(motion.section)`
  position: fixed;
  z-index: 3;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  .close-icon {
    /* border: 2px solid rgb(255, 255, 255); */
    border-radius: 0.2rem;
    padding: 0.6rem;
    cursor: pointer;
    position: relative;
    top: 0.7rem;
    left: calc(100vw - 7rem);
    line-height: 15px;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    color: rgba(53, 50, 50, 0.9);
    background-color: rgba(164, 164, 163, 0.8);
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: rgba(164, 164, 163, 0.3);
      color: rgba(255, 255, 255, 0.9);
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      top: 0.85rem;
      left: 25rem;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      top: 0.85rem;
      left: 25rem;
    }
  }
`

const StyledBox = styled(motion.div)`
  position: relative;
  margin: 0 auto;
  height: auto;
  width: 90%;
  max-height: 70vh;
  margin-top: calc(100vh - 85vh - 20px);
  background: rgba(237, 239, 238, 0.98);
  box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
  border-radius: 1rem;
  border: 0.25rem solid white;
  padding: 1rem;
  z-index: 3;
  overflow: auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 60%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 25%;
  }
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
    font-family: "Khand";
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
    width: 11%;
    height: 11%;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 8%;
      height: 8%;
    }
  }
`
const StyledSuccessMessage = styled(motion.div)`
  position: absolute;
  right: calc(100vw - 25rem);
  top: 0rem;
  width: 85vw;
  padding: 0.25rem;
  font-family: "Khand";
  background: rgba(237, 239, 238, 0.9);
  border-top: 0.25rem solid white;
  border-bottom: 0.25rem solid white;
  border-left: 0.25rem solid white;
  border-right: 0;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    right: 0rem;
    top: 0rem;
    width: 50vw;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    right: 0rem;
    top: 0.9rem;
    width: 25vw;
  }
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
        <motion.span className="close-icon" onClick={data.handleClose}>
          X
        </motion.span>
        <StyledFormHeader>
          <img
            alt="signup"
            className="signup-decal"
            src="https://res.cloudinary.com/dzmc7doja/image/upload/v1642663225/design-assets/design-icon-assets/google-forms.png"
          />
          <h3 className="form-header">sign up form</h3>
        </StyledFormHeader>
        <p className="form-description">
          Please reach out, I am passionately searching for collaborative
          opportunities! I will also be starting a newsletter in the coming
          weeks and would love to drop helpful tech articles in your inbox. Just
          indicate below if this is something you are interested in!
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
