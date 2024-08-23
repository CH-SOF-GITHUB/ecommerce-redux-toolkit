import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart
} from '../../../features/cartSlice'
import { Link } from 'react-router-dom'
//stripe
import Api from '../../../Api/axios'
import { loadStripe } from '@stripe/stripe-js'

const Cart = () => {
  const cart = useSelector(state => state.storecart)
  const dispatch = useDispatch()

  const computeTotal = useCallback(() => {
    dispatch(getTotals())
  }, [cart, dispatch])

  useEffect(() => {
    computeTotal()
  }, [computeTotal])

  const handleAddToCart = useCallback(
    product => {
      dispatch(addToCart(product))
    },
    [dispatch]
  )

  const handleDecreaseCart = useCallback(
    product => {
      dispatch(decreaseCart(product))
    },
    [dispatch]
  )

  const handleRemoveFromCart = useCallback(
    product => {
      dispatch(removeFromCart(product))
    },
    [dispatch]
  )

  const handleClearCart = useCallback(() => {
    dispatch(clearCart())
  }, [dispatch])

  const [status, setStatus] = React.useState('idle')
  async function handleClickStripe (event) {
    event.preventDefault()
    if (cart.cartTotalAmount > 0) {
      setStatus('loading')
      try {
        const stripe = await loadStripe('pk_test_51PiifPRoqDn8rDS1jxYjqCV5SgTkXSNv52Ni5PqCria3V6ZvQjAGW4cY5FklCUwKJtcp4B4Meu7LHK5qmgkzRRXa00InlgSaYo')
        if (!stripe) throw new Error('Stripe failed to initialize.')
        const cartItems = cart.cartItems
        const checkoutResponse = await Api.post('payment', { cartItems })
        const { sessionId } = await checkoutResponse.data
        const stripeError = await stripe.redirectToCheckout({ sessionId })
        if (stripeError) {
          console.error(stripeError)
        }
      } catch (error) {
        console.error(error)
        setStatus('redirect-error')
      }
    } else {
      setStatus('no-items')
    }
  }

  return (
    <div className='container fluid'>
      <h2>Shopping cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className='cart-empty'>
          <p>panier vide</p>
          <div className='start-shopping'>
            <Link to='/'>
              <span>start shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='titles d-flex justify-content-between'>
            <h3 className='product-title'>Product</h3>
            <h3 className='price'>Price</h3>
            <h3 className='quantity'>Quantity</h3>
            <h3 className='total'>Total</h3>
          </div>
          <div className='cart-items'>
            {cart.cartItems &&
              cart.cartItems.map(cartItem => (
                <div className='cart-item' key={cartItem._id}>
                  <div className='cart-product'>
                    <img
                      src={`${cartItem.imageart}`}
                      alt={cartItem.designation}
                    />
                    <div>
                      <h3>{cartItem.designation}</h3>
                      <p>{cartItem.reference}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className='cart-product-price'>{cartItem.prix} TND</div>
                  <div className='cart-product-quantity'>
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className='count'>{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className='cart-product-total-price'>
                    {(cartItem.prix * cartItem.cartQuantity).toFixed(3)} TND
                  </div>
                </div>
              ))}
          </div>
          <div className='cart-summary'>
            <button className='clear-btn' onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className='cart-checkout'>
              <div className='subtotal'>
                <span>Subtotal</span>
                <span className='amount'>
                  {cart.cartTotalAmount.toFixed(3)} TND
                </span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button onClick={(event)=>handleClickStripe(event)}>{status !== "loading" ? "Check Out" : "Loading..."}</button>
              <div className='continue-shopping'>
                <Link to='/'>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
