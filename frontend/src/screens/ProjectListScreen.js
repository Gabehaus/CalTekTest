import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import {
  listProjects,
  deleteProject,
  createProject
} from "../actions/projectActions"
import { PROJECT_CREATE_RESET } from "../constants/projectConstants"
import Header from "../components/Header"

const ProjectListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const projectList = useSelector(state => state.projectList)
  const { loading, error, projects, page, pages } = projectList

  const projectDelete = useSelector(state => state.projectDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = projectDelete

  const projectCreate = useSelector(state => state.projectCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    project: createdProject
  } = projectCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PROJECT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login")
    }

    if (successCreate) {
      history.push(`/admin/project/${createdProject._id}/edit`)
    } else {
      dispatch(listProjects("", pageNumber))
    }

    console.log("debug check project", createdProject)
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProject,
    pageNumber
  ])

  const deleteHandler = id => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProject(id))
    }
  }

  const createProjectHandler = () => {
    dispatch(createProject())
  }

  return (
    <>
      <Header />
      <Row className='align-items-center'>
        <Col>
          <h1>Projects</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProjectHandler}>
            <i className='fas fa-plus'></i> Create Project
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>HEADING</th>
                <th>SHORT DESCRIPTION</th>
                <th>CLIENT</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id}>
                  <td>{project._id}</td>
                  <td>{project.hd}</td>
                  <td>{project.desc}</td>
                  <td>{project.client}</td>

                  <td>
                    <LinkContainer to={`/admin/project/${project._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(project._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isProject={true} />
        </>
      )}
    </>
  )
}

export default ProjectListScreen
