import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import HeaderMain from "../components/HeaderMain.js"
import CarouselMain from "../components/CarouselMain.js"
import CarouselMain2 from "../components/CarouselMain2.js"
import Services from "../components/Services.js"
import Projects from "../components/Projects.js"
import Testimonials from "../components/Testimonials.js"
import ShopJumbo from "../components/ShopJumbo.js"
import ContactHome from "../components/ContactHome.js"
import { listProjects } from "../actions/projectActions"
import Aos from "aos"
import "aos/dist/aos.css"

const HomeMain = () => {
  const dispatch = useDispatch()
  console.log("you can log to console from calteksolutions.com")
  useEffect(() => {
    Aos.init({
      duration: 2000,
      disable: function() {
        var maxWidth = 800
        return window.innerWidth < maxWidth
      }
    }) // initialize animate on scroll
  }, [])

  useEffect(() => {
    dispatch(listProjects())
  }, [dispatch])

  return (
    <div style={{ position: "absolute", top: "0", left: "0", width: "100vw" }}>
      <HeaderMain />
      <CarouselMain />
      <Services />
      <CarouselMain2 />
      <Projects />
      <Testimonials />
      <ShopJumbo />
      <ContactHome />
    </div>
  )
}

export default HomeMain
