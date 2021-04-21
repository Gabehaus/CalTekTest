import React from "react"
import { Row, Col } from "react-bootstrap"
import Romeo1 from "../images/Romeo1.jpg"
import meChichibu1 from "../images/meChichibu1.jpg"
import Jessica1 from "../images/Jessica1.jpg"
import Testimonial from "./Testimonial"

const Testimonials = () => {
  return (
    <div className='jumbotron' id='testimonials'>
      <h1
        className='servicesHeading'
        data-aos='zoom-in'
        style={{ textAlign: "center" }}
      >
        Testimonials
      </h1>
      <Row>
        <Col
          lg={6}
          md={12}
          sm={12}
          style={{ background: "none" }}
          className='ml-auto mr-auto'
        >
          <Row className='my-5'>
            <Col lg={12} md={12} sm={12} className='my-5' data-aos='fade-in'>
              <div className='testiPhoto'>
                <img
                  src={Romeo1}
                  style={{
                    maxWidth: "105%"
                  }}
                ></img>
              </div>
            </Col>
            <Col style={{ background: "none" }} data-aos='fade-in'>
              <p
                style={{
                  fontSize: "23px",
                  color: "black",
                  textAlign: "center"
                }}
                className='my-4 '
              >
                "Calvin has never failed to impress. His solutions to our
                engineering needs have saved us a fortune..."
              </p>
              <p
                style={{
                  fontSize: "21px",
                  color: "black",
                  textAlign: "center"
                }}
              >
                - Mark Romeo
              </p>
            </Col>
          </Row>
          <Row className='my-5'>
            <Col lg={12} md={12} sm={12} className='my-5' data-aos='fade-in'>
              <div className='testiPhoto' style={{ border: "solid 8px black" }}>
                <img
                  src={meChichibu1}
                  style={{
                    maxWidth: "105%"
                  }}
                ></img>
              </div>
            </Col>
            <Col style={{ background: "none" }} data-aos='fade-in'>
              <p
                style={{
                  fontSize: "23px",
                  color: "black",
                  textAlign: "center"
                }}
                className='my-4'
              >
                "I've consulted Cal-Tek Solutions on multiple projects and
                always get the help I need..."
              </p>
              <p
                style={{
                  fontSize: "21px",
                  color: "black",
                  textAlign: "center"
                }}
                className='my-4'
              >
                - Gabriel Hauschildt
              </p>
            </Col>
          </Row>
          <Row className='my-5'>
            <Col lg={12} md={12} sm={12} className='my-5' data-aos='fade-in'>
              <div className='testiPhoto'>
                <img
                  src={Jessica1}
                  style={{
                    maxWidth: "109%",
                    marginBottom: "-3px"
                  }}
                ></img>
              </div>
            </Col>
            <Col style={{ background: "none" }} data-aos='fade-in'>
              <p
                style={{
                  fontSize: "23px",
                  color: "black",
                  textAlign: "center"
                }}
                className='my-4'
              >
                "Cal-Tek always comes through with quality product at affordable
                prices!"
              </p>
              <p
                style={{
                  fontSize: "21px",
                  color: "black",
                  textAlign: "center"
                }}
                className='my-4'
              >
                - Jess Bechler
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Testimonials
