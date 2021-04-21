import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { listProjectDetails, updateProject } from "../actions/projectActions"
import { PROJECT_UPDATE_RESET } from "../constants/projectConstants"
import Header from "../components/Header"

const ProjectEditScreen = ({ match, history }) => {
  const projectId = match.params.id

  const [heading, setHeading] = useState("")
  const [description, setDescription] = useState("")
  const [client, setClient] = useState("")
  const [imag, setImag] = useState("")
  const [longDesc, setLongDesc] = useState("")
  const [note1, setNote1] = useState("")
  const [note2, setNote2] = useState("")
  const [note3, setNote3] = useState("")
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const projectDetails = useSelector(state => state.projectDetails)
  const { loading, error, project } = projectDetails

  const projectUpdate = useSelector(state => state.projectUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = projectUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROJECT_UPDATE_RESET })
      history.push("/admin/projectlist")
    } else {
      if (!project.hd || project._id !== projectId) {
        dispatch(listProjectDetails(projectId))
      } else {
        setHeading(project.hd)
        setDescription(project.desc)
        setClient(project.client)
        setImag(project.imag)
        setLongDesc(project.longDesc)
        setNote1(project.note1)
        setNote2(project.note2)
        setNote3(project.note3)
      }
    }
  }, [dispatch, history, projectId, project, successUpdate])

  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    setUploading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }

      const { data } = await axios.post(
        "https://caltekshopbackend1.herokuapp.com/api/uploadImage",
        formData
      )

      setImag(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateProject({
        _id: projectId,
        hd: heading,
        desc: description,
        client,
        imag,
        longDesc,
        note1,
        note2,
        note3
      })
    )
  }

  return (
    <>
      <Header />
      <Link to='/admin/projectlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Project</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='heading'>
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type='heading'
                placeholder='Enter heading'
                value={heading}
                onChange={e => setHeading(e.target.value)}
                maxlength='15'
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='description'
                placeholder='Enter description'
                value={description}
                onChange={e => setDescription(e.target.value)}
                maxlength='40'
                minlength='25'
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='client'>
              <Form.Label>Client</Form.Label>
              <Form.Control
                type='client'
                placeholder='Enter client'
                value={client}
                onChange={e => setClient(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='imag'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={imag}
                onChange={e => setImag(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='longDesc'>
              <Form.Label>Long Description</Form.Label>
              <Form.Control
                type='long description'
                placeholder='Enter long description'
                value={longDesc}
                onChange={e => setLongDesc(e.target.value)}
                maxlength='136'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='note1'>
              <Form.Label>Note1</Form.Label>
              <Form.Control
                type='note1'
                placeholder='Enter note1'
                value={note1}
                onChange={e => setNote1(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='note2'>
              <Form.Label>Note2</Form.Label>
              <Form.Control
                type='note2'
                placeholder='Enter note2'
                value={note2}
                onChange={e => setNote2(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='note3'>
              <Form.Label>Note3</Form.Label>
              <Form.Control
                type='note3'
                placeholder='Enter note3'
                value={note3}
                onChange={e => setNote3(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProjectEditScreen
