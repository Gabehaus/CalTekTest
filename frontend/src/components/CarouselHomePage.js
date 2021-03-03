import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader"
import Message from "./Message"
import { listTopProducts } from "../actions/productActions"

const CarouselHomePage = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector(state => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel
      pause='hover'
      className='mt-10 homeCarousel'
      id='prod2'
      style={{
        maxWidth: "60vw",
        maxHeight: "28vw",
        border: "solid 8px black",
        margin: "auto",
        background: "#2ce692"
      }}
    >
      {products.map(product => (
        <Carousel.Item key={product._id} id='prod'>
          <Link to={`/product/${product._id}`} id='prod'>
            <Image src={product.image} alt={product.name} id='prod2' fluid />
            <Carousel.Caption className='carousel-caption' id='prod'>
              <h2 id='prod'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default CarouselHomePage
