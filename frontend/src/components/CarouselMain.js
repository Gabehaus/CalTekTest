import React, { useEffect } from "react"
import fiber2 from "../images/fiber2.png"

const CarouselMain = () => {
  return (
    <div
      className='jumbotron'
      id='oneA'
      style={{ backgroundImage: `url(${fiber2})`, minHeight: "45vh" }}
    >
      <h1
        className='mainHeading'
        style={{ color: "white", textAlign: "center", marginTop: "8vh" }}
        data-aos='zoom-in'
      >
        Cal-Tek Solutions
      </h1>
      <p
        className='lead'
        data-aos='zoom-in'
        style={{ color: "#f2f2f2", textAlign: "center", fontSize: "1.5rem" }}
      >
        Solving your engineering challenges from home to factory
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

export default CarouselMain
