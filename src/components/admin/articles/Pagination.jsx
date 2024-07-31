import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../../../features/articleSlice'

const Pagination = () => {
  const dispatch = useDispatch()
  const { page, tot } = useSelector(state => state.storearticles)
  const currentPage = page

  return (
    <div className='pagination'>
      <button
        onClick={() => {
          if (currentPage > 1) {
            dispatch(setPage(currentPage - 1))
          }
        }}
        disabled={currentPage === 1}
      >
        previous
      </button>
      {Array.from({ length: tot }, (_, index) => (
        <button
          key={index}
          onClick={() => dispatch(setPage(index + 1))}
          disabled={currentPage === index + 1}
          className={currentPage === index + 1 ? 'page-link active' : ''}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => {
          if (currentPage < tot) {
            setPage(currentPage + 1)
          }
        }}
        disabled={currentPage === tot}
      >
        next
      </button>
    </div>
  )
}

export default Pagination
