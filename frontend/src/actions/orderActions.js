import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  DELIVERY_EMAIL_REQUEST,
  DELIVERY_EMAIL_SUCCESS,
  DELIVERY_EMAIL_FAIL,
  SHIP_INFO_REQUEST,
  SHIP_INFO_SUCCESS,
  SHIP_INFO_FAIL
} from "../constants/orderConstants"
import { CART_CLEAR_ITEMS } from "../constants/cartConstants"
import axios from "axios"

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    // `https://caltekshopbackend1.herokuapp.com/api/orders`
    const { data } = await axios.post(
      `https://caltekshopbackend1.herokuapp.com/api/orders`,
      order,
      config
    )

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data
    })
    localStorage.removeItem("cartItems")
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        //for get request no need for "Content Type"
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `https://caltekshopbackend1.herokuapp.com/api/orders/${id}`,
      config
    )

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `https://caltekshopbackend1.herokuapp.com/api/orders/${orderId}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deliverOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `https://caltekshopbackend1.herokuapp.com/api/orders/${order._id}/deliver`,
      {},
      config
    )

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `https://caltekshopbackend1.herokuapp.com/api/orders/myorders`,
      config
    )

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `https://caltekshopbackend1.herokuapp.com/api/orders`,
      config
    )

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const sendDeliveryEmail = deliveryDetails => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: DELIVERY_EMAIL_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const deliveryEmailData = {
      orderItems: [...deliveryDetails.orderItems],
      name: deliveryDetails.user.name,
      address: deliveryDetails.shippingAddress,
      email: deliveryDetails.user.email,
      shippedOn: deliveryDetails.shippedOn,
      shipService: deliveryDetails.shipService,
      arrivesIn: deliveryDetails.arrivesIn,
      trackingNumber: deliveryDetails.trackingNumber
    }

    console.log("token", userInfo.token)

    console.log("deliveryEmailData: ", deliveryEmailData)

    const { data } = await axios.post(
      `https://caltekshopbackend1.herokuapp.com/api/autoReply/`,
      deliveryEmailData,
      config
    )

    console.log("response from auto reply: ", data)
    // dispatch({
    //   type: DELIVERY_EMAIL_SUCCESS,
    //   payload: data
    // })
  } catch (error) {
    dispatch({
      type: DELIVERY_EMAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const addShipmentInfo = updatedOrder => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHIP_INFO_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    console.log("action called with updatedOrder var value: ", updatedOrder)
    //`http://localhost:5000/api/orders/${updatedOrder._id}/shipmentInfo`
    const { data } = await axios.put(
      `https://caltekshopbackend1.herokuapp.com/api/orders/${updatedOrder._id}/shipmentInfo`,
      updatedOrder,
      config
    )

    dispatch({
      type: SHIP_INFO_SUCCESS,
      payload: data
    })
  } catch (error) {
    console.log("error: ", error.response.data)
    dispatch({
      type: SHIP_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
