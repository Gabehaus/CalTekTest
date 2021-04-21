import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader"
import Message from "./Message"
import { listTopProducts } from "../actions/productActions"

const ProductCarousel = () => {
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
    <Carousel pause='hover' className='bg-dark mt-10' id='prod'>
      {products.map(product => (
        <Carousel.Item key={product._id} id='prod'>
          <Carousel.Caption className='carousel-caption' id='prod'>
            <h2 id='prod' className='carousel-header'>
              {product.name} (${product.price})
            </h2>
          </Carousel.Caption>
          <Link to={`/product/${product._id}`} id='prod' className='mt-3'>
            <Image src={product.image} alt={product.name} id='prod' fluid />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
