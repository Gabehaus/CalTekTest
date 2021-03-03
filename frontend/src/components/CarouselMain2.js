import React, { useEffect } from "react"
import codeBG1 from "../images/codeBG1.png"

const CarouselMain2 = () => {
  return (
    <div
      className='jumbotron'
      id='oneA'
      style={{
        backgroundImage: `url(${codeBG1})`,
        minHeight: "40vh",
        marginTop: "10vh"
      }}
    >
      <h4
        className='mainHeading'
        id='two'
        data-aos='zoom-in'
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "8vh"
        }}
      >
        Software and Web Design
      </h4>
      <p
        className='lead'
        data-aos='zoom-in'
        style={{ color: "#f2f2f2", textAlign: "center", fontSize: "1.5rem" }}
      >
        From C++ to Javascript
      </p>

      {/*   <Carousel>
        <Carousel.Item style={{ maxHeight: "70vh" }}>
          <img className='d-block w-100' src={appDesign} alt='First slide' />
        </Carousel.Item>
        <Carousel.Item style={{ maxHeight: "70vh" }}>
          <img
            className='d-block w-100'
            src={fiberOpticInstall}
            alt='Second slide'
          />
        </Carousel.Item>
        <Carousel.Item style={{ maxHeight: "70vh" }}>
          <img className='d-block w-100' src={soldering} alt='Third slide' />
        </Carousel.Item>
      </Carousel> */}
    </div>
  )
}

export default CarouselMain2
