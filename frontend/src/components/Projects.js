import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import Project from "./Project.js"
import { useDispatch, useSelector } from "react-redux"
import soldering from "../images/soldering.jpg"
import fiberInstall2 from "../images/fiberInstall2.jpg"
import keyCard from "../images/keyCard.jpg"
import { projectsData } from "../data/projectsData.js"
import { listProjects } from "../actions/projectActions"

const Projects = () => {
  // const projectsArray = projectsData.projectArray
  const [width, setWidth] = useState(0)
  const [projectsArray, setProjectsArray] = useState([])
  const dispatch = useDispatch()

  const projectList = useSelector(state => state.projectList)
  const { loading, error, projects } = projectList

  useEffect(() => {
    dispatch(listProjects())
  }, [dispatch])

  //get dimensons of screen
  useEffect(() => {
    const { innerWidth, innerHeight } = window
    setWidth(innerWidth)
  })

  useEffect(() => {
    console.log("projects", projects)
  }, [projects])

  return (
    <div className='jumbotron' id='projects'>
      <h1
        className='servicesHeading'
        data-aos='zoom-in'
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        Projects
      </h1>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          style={{ background: "none" }}
          className='ml-auto mr-auto'
        >
          {}
          <Row>
            {projects.map(elem => {
              return (
                <Col xl={3} md={12} sm={12} className='ml-auto mr-auto'>
                  <Project
                    hd={elem.hd}
                    desc={elem.desc}
                    client={elem.client}
                    imag={elem.imag}
                    longDesc={elem.longDesc}
                    note1={elem.note1}
                    note2={elem.note2}
                    note3={elem.note3}
                    width={width}
                  />
                </Col>
              )
            })}
            {/* <Col
              lg={3}
              md={12}
              sm={12}
              className='ml-auto mr-auto'
              data-aos='fade-right'
            >
              <Project
                hd='Motorized Table'
                desc='Motherboard and Software Development'
                client='Portland Chiropracty'
                imag={soldering}
                longDesc='Overhauled entire software and hardware design. Prepared board for robotic assembly and orchestrated manufacturing deal.'
                note1='C++ software debugging and rewrite'
                note2='Motherboard prototype design'
                note3='Robotic assembly'
              />
            </Col>
            <Col
              lg={3}
              md={12}
              sm={12}
              className='ml-auto mr-auto'
              data-aos='fade-in'
            >
              <Project
                hd='Fiber Install'
                desc={`Industrial Fiber Optic\nInstallation`}
                client='Romeo Inc.'
                imag={fiberInstall2}
                longDesc='Consulted company on equipment purchasing and routing. Installed over 5000 feet of cable. Completed testing and server setup.'
                note1='Research and design'
                note2='Consulting on best practices'
                note3='Installation and testing'
              />
            </Col>
            <Col
              lg={3}
              md={12}
              sm={12}
              className='ml-auto mr-auto'
              data-aos='fade-left'
            >
              <Project
                hd='Keycard System'
                desc='Design and Install of Custom Keycard System'
                client='LifeTimer'
                imag={keyCard}
                longDesc='Designed, produced, and installed an electronic keycard system for a large office building. Installed backup power system for emergencies.'
                note1='Manufactured affordable hardware'
                note2='Custom Install'
                note3='Ongoing maintenance and upgrades'
              />
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Projects
