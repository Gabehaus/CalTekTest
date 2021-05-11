import React, { useState, useEffect } from "react"
import axios from "axios"
import { PayPalButton } from "react-paypal-button-v2"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Modal,
  InputGroup,
  FormControl
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  sendDeliveryEmail,
  addShipmentInfo
} from "../actions/orderActions"
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET
} from "../constants/orderConstants"
import Header from "../components/Header"

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)
  // const [showSetShipped, setShowSetShipped] = useState(false)
  const [show, setShow] = useState(false)
  const [shipService, setShipService] = useState("")
  const [shippedOn, setShippedOn] = useState("")
  const [trackingNumber, setTrackingNumber] = useState("")
  const [arrivesIn, setArrivesIn] = useState("")
  const [updatedOrder, setUpdatedOrder] = useState("")

  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = num => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  //adds new fields to order as users input data in shipment info model
  useEffect(() => {
    setUpdatedOrder({
      ...order,
      shippedOn,
      shipService,
      trackingNumber,
      arrivesIn
    })
  }, [shipService, trackingNumber, arrivesIn, shippedOn])

  useEffect(() => {}, [order])

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        "https://caltekshopbackend1.herokuapp.com/api/config/paypal"
      )
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order])

  const successPaymentHandler = paymentResult => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const handleClose = () => {
    setShow(false)
    history.push(`/order/${order._id}`)
  }
  const handleShow = () => setShow(true)

  const shipmentInfoHandler = shipmentInfo => {
    console.log(updatedOrder)
    dispatch(addShipmentInfo(updatedOrder))
    setShow(false)
    ///window.location.reload()
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const deliverHandler = () => {
    console.log("order object passed to deliverHandler: ", order)
    dispatch(deliverOrder(order))
    dispatch(sendDeliveryEmail(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Header />
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Recipient: </strong> {order.shippingAddress.recipient}
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state} {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
            {order.shipService && (
              <ListGroup.Item>
                <h2>Shipment Info</h2>
                <p>
                  <strong>Shipped On: </strong>
                  {order.shippedOn}
                </p>
                <p>
                  <strong>Shipping Service: </strong>
                  {order.shipService}
                </p>
                <p>
                  <strong>Tracking Number: </strong>
                  {order.trackingNumber}
                </p>
                <p>
                  <strong>Arrives In: </strong>
                  {order.arrivesIn}
                </p>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered &&
                !order.shipService && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={handleShow}
                    >
                      Enter Shipment Info
                    </Button>
                  </ListGroup.Item>
                )}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                order.shipService && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={handleShow}
                    >
                      Edit Shipment Info
                    </Button>
                  </ListGroup.Item>
                )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered &&
                order.shipService && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Shipment Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor='basic-url'>Shipping Service</label>
              <InputGroup className='mb-3'>
                <FormControl
                  id='basic-url'
                  aria-describedby='basic-addon3'
                  onChange={e => setShipService(e.target.value)}
                  placeholder='Enter shipping service here'
                />
              </InputGroup>
              <label htmlFor='basic-url'>Tracking Number</label>
              <InputGroup className='mb-3'>
                <FormControl
                  id='basic-url'
                  aria-describedby='basic-addon3'
                  onChange={e => setTrackingNumber(e.target.value)}
                  placeholder='Enter tracking number here'
                />
              </InputGroup>
              <label htmlFor='basic-url'>Arrives In</label>
              <InputGroup className='mb-3'>
                <FormControl
                  id='basic-url'
                  aria-describedby='basic-addon3'
                  onChange={e => setArrivesIn(e.target.value)}
                  placeholder='Enter time period until arrival'
                />
              </InputGroup>
              <label htmlFor='basic-url'>Shipped On</label>
              <InputGroup className='mb-3'>
                <FormControl
                  id='basic-url'
                  aria-describedby='basic-addon3'
                  onChange={e => setShippedOn(e.target.value)}
                  placeholder='Enter shipping date'
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={shipmentInfoHandler}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
