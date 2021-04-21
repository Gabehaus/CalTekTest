import React, { useEffect } from "react"
import fiber2 from "../images/fiber2.png"
import { Row, Col } from "react-bootstrap"
import "aos/dist/aos.css"

const Services = () => {
  return (
    <div className='jumbotron' id='services'>
      <h1
        className='servicesHeading'
        data-aos='zoom-in'
        style={{ textAlign: "center" }}
      >
        Services
      </h1>
      <Row>
        <Col
          lg={6}
          md={12}
          sm={12}
          style={{ background: "none" }}
          className='ml-auto mr-auto'
          data-aos='zoom-in'
        >
          <Row>
            <Col style={{ background: "none" }} md={4} className='mt-3'>
              <Row>
                {" "}
                <Col>
                  <div className='circle' style={{ margin: "auto" }}>
                    <i className='fas fa-wifi '></i>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className='center'>
                  <h4 className='mt-3'>Installation</h4>
                </Col>
              </Row>
            </Col>
            <Col style={{ background: "none" }} md={4} className='mt-3'>
              <Row>
                {" "}
                <Col>
                  <div className='circle' style={{ margin: "auto" }}>
                    <i className='fas fa-screwdriver'></i>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className='center'>
                  <h4 className='mt-3'>Repairs</h4>
                </Col>
              </Row>
            </Col>
            <Col style={{ background: "none" }} md={4} className='mt-3'>
              <Row>
                {" "}
                <Col>
                  <div className='circle' style={{ margin: "auto" }}>
                    <i className='fas fa-drafting-compass'></i>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className='center'>
                  <h4 className='mt-3'>Manufacturing</h4>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <p
        className='lead'
        className='mt-3 center'
        data-aos='fade-in'
        style={{ color: "black" }}
      >
        From fiber-optic installs, to motherboard repairs, to product design and
        manufacturing - we're here to meet your engineering needs...
      </p>

      <Row>
        <Col md={20} className='ml-auto mr-auto mt-5'>
          <Row>
            <Col md={12} className='mt-5' data-aos='zoom-in'>
              <h1 className='text-center '>We Can Help You With</h1>
            </Col>
            <Col lg={4} className='mt-3' data-aos='fade-right'>
              <div className='servBorder'>
                <div className='borderBottom job'>
                  <h4>Circuit Board Design</h4>
                </div>
                <div className='borderBottom job'>
                  <h4>Manufacturing</h4>
                </div>
                <div className='borderTop job'>
                  <h4>Project Overhauls</h4>
                </div>
              </div>
            </Col>
            <Col lg={4} className='mt-3' data-aos='fade-in'>
              <div className='servBorder'>
                <div className='borderBottom job'>
                  <h4>Electric Motors</h4>
                </div>
                <div className='borderBottom job'>
                  <h4>Robotic Assembly</h4>
                </div>
                <div className='borderTop job'>
                  <h4>Debugging</h4>
                </div>
              </div>
            </Col>
            <Col lg={4} className='mt-3' data-aos='fade-left'>
              <div className='servBorder'>
                <div className='borderBottom job'>
                  <h4>Sensors + Controllers</h4>
                </div>
                <div className='borderBottom job'>
                  <h4>Mobile / Web Apps</h4>
                </div>
                <div className='borderTop job'>
                  <h4>Installation</h4>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Services
