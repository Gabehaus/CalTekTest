import React, { useEffect } from "react"
import { Card } from "react-bootstrap"

const Project = ({
  hd,
  desc,
  longDesc,
  client,
  imag,
  note1,
  note2,
  note3,
  width
}) => {
  useEffect(() => {
    console.log("bebo", width)
  })
  return (
    <div
      className='mt-5'
      style={{ background: "black", padding: "6px", paddingBottom: "1px" }}
    >
      <div className='card mb-3 border-0' style={{}}>
        <h3
          className='card-header mt-0'
          style={{ border: "none", color: "#2ce692", background: "black" }}
        >
          {hd}
        </h3>
        <div
          className='card-body'
          style={{ border: "none", minHeight: "7rem" }}
        >
          <h5
            className='card-title'
            style={{ whiteSpace: "pre-wrap", minHeight: "4rem" }}
          >
            {desc}
          </h5>
          <h6 className='card-subtitle text-muted'>{client}</h6>
        </div>

        <img src={imag} style={{ maxHeight: "28vh", minHeight: "28vh" }}></img>
        <div className='card-body'>
          <p className='card-text' style={{ minHeight: "5.2rem" }}>
            {longDesc}
          </p>
        </div>
        <ul className='list-group list-group-flush' style={{ color: "black" }}>
          <li className='list-group-item' style={{}}>
            {note1}
          </li>
          <li className='list-group-item' style={{}}>
            {note2}
          </li>
          <li className='list-group-item' style={{}}>
            {note3}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Project
