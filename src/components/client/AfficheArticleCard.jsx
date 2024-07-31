import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../features/cartSlice'
import { Navigate, useNavigate } from 'react-router-dom'

const AfficheArticleCard = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  //
  const { articles, isLoading, error } = useSelector(
    state => state.storearticles
  )
  //
  const handleAddToCart = (cart) => {
    dispatch(addToCart(cart))
    navigate("/cart")
  }

  return (
    <div className='card-container'>
      {isLoading ? (
        <h1>
          <center>... Loading</center>
        </h1>
      ) : error ? (
        <h1>
          <center>Erreur de connexion</center>
        </h1>
      ) : (
        <>
          {articles.map((art, index) => (
            <div className='card' key={index}>
              {art.imageart && <img src={art.imageart} alt={art.imageart} />}
              <div className='card-content'>
                <h1 className='card-title'>{art.reference}</h1>
                <p className='card-description'>
                  {art.designation.substr(0, 20)}
                </p>
                <h1 className='card-title'>Prix : {art.prix} TND</h1>
                <button className='card-button' onClick={() => handleAddToCart(art)} disabled={art.qtestock <= 0}>
                  <i className='fa-solid fa-cartshopping'></i>Add to card
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default AfficheArticleCard
