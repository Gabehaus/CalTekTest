import React from "react"
import CarouselHomePage from "./CarouselHomePage.js"

const ShopJumbo = () => {
  return (
    <div className='jumbotron'>
      <h1
        className='servicesHeading'
        data-aos='zoom-in'
        style={{ textAlign: "center" }}
      >
        Shop
      </h1>

      <CarouselHomePage />
      <p
        style={{
          fontSize: "25px",
          color: "black",
          textAlign: "center"
        }}
        className='mt-5'
        data-aos='fade-in'
      >
        Check out our{" "}
        <span style={{ color: "#2ce692", textShadow: "1px 1px black" }}>
          custom circuit boards{" "}
        </span>
        , appliances for your{" "}
        <span style={{ color: "#2ce692", textShadow: "1px 1px black" }}>
          smart home or business
        </span>
        , and{" "}
        <span style={{ color: "#2ce692", textShadow: "1px 1px black" }}>
          refurbished electronics{" "}
        </span>
        !
      </p>

      <p class='lead' data-aos='zoom-in'>
        <a
          className='btn btn-primary btn-lg mt-3 homeShopButton'
          href='/shop'
          role='button'
        >
          Enter Shop!
        </a>
      </p>
    </div>
  )
}

export default ShopJumbo
