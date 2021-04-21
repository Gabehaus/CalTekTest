import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Header from "../components/Header"
import HeaderMain from "../components/HeaderMain.js"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import ProductCarousel from "../components/ProductCarousel"
import Meta from "../components/Meta"
import { listProducts } from "../actions/productActions"

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div style={{ position: "absolute", top: "0", left: "0", width: "100vw" }}>
      <Header />
      <Row>
        <Col lg={8} md={12} className='ml-auto mr-auto'>
          <Row className='mt-3'></Row>
          <Meta />
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to='/shop' className='btn btn-light'>
              Go Back
            </Link>
          )}
          <h1>Latest Products</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <Row>
                {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default HomeScreen
