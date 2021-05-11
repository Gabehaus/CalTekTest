import React, { useState } from "react"
import { Row, Col, Alert } from "react-bootstrap"
import axios from "axios"

const ContactHome = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [sent, setSent] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    console.log("email", email)
    console.log("name", name)
    console.log("message", message)
    let data = {
      name: name,
      email: email,
      message: message
    }

    axios
      .post(`https://caltekshopbackend1.herokuapp.com/api/mail/`, data)
      .then(res => {
        setSent(true)
        resetForm()
      })
      .catch(() => {
        console.log("message not sent")
        setSent(false)
      })
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setMessage("")

    setTimeout(() => {
      setSent(null)
    }, 3000)
  }

  const updateEmail = e => {
    setEmail(e.target.value)
  }

  const updateName = e => {
    setName(e.target.value)
  }

  const updateMessage = e => {
    setMessage(e.target.value)
  }

  return (
    <Row id='contact'>
      <Col lg={8} md={12} className='ml-auto mr-auto mt-5'>
        <Row>
          <Col lg={12} className='mt-5'>
            <h1
              className='servicesHeading'
              style={{ textAlign: "center" }}
              data-aos='zoom-in'
            >
              Contact
            </h1>
          </Col>
          <Col lg={6} md={12} className=' mt-5' data-aos='fade-right'>
            <form
              onSubmit={handleSubmit}
              md={12}
              style={{
                padding: "20px",
                border: "solid 8px black",
                background: "#2ce692"
              }}
            >
              <h3 style={{ color: "black" }}>Write To Us</h3>
              {sent ? (
                <Alert color='success'>Email successfully sent!</Alert>
              ) : null}
              {sent == false ? (
                <Alert
                  style={{
                    color: "red",
                    fontSize: "20px",
                    marginTop: "0",
                    marginBottom: "0"
                  }}
                >
                  Email not sent!
                </Alert>
              ) : null}
              <div className='form-group mt-5'>
                <h4 for='exampleInputEmail1'>Full Name</h4>
                <input
                  type='text'
                  class='form-control'
                  id='name'
                  name='name'
                  aria-describedby='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={updateName}
                />
              </div>
              <div class='form-group'>
                <h4 for='exampleInputEmail1'>Email address</h4>
                <input
                  type='email'
                  class='form-control'
                  name='email'
                  id='exampleEmail'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                  value={email}
                  onChange={updateEmail}
                />
                <small id='emailHelp' class='form-text text-muted'>
                  We'll never share your email with anyone else.
                </small>
              </div>

              <div class='form-group'>
                <h4 for='exampleTextarea'>Message</h4>
                <textarea
                  class='form-control'
                  name='message'
                  id='message'
                  value={message}
                  onChange={updateMessage}
                  rows='5'
                ></textarea>
              </div>

              <button
                class='btn btn-primary btn-lg'
                href='#'
                id='homeButton'
                role='button'
                style={{ color: "#2ce692" }}
              >
                Submit
              </button>
            </form>
          </Col>
          <Col
            lg={6}
            md={12}
            className='mt-5'
            style={{ padding: "0" }}
            data-aos='fade-left'
          >
            {" "}
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d714164.3982297602!2d-123.21156202491417!3d45.636668646620045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495a4ac438fdd4d%3A0x19786086356e31ae!2sPortland%20Metropolitan%20Area!5e0!3m2!1sen!2sus!4v1614057438883!5m2!1sen!2sus'
              frameborder='0'
              allowfullscreen=''
              aria-hidden='false'
              tabindex='0'
              style={{
                border: "solid 8px black",
                width: "80%",
                height: "100%",
                marginLeft: "10%"
              }}
            ></iframe>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ContactHome
