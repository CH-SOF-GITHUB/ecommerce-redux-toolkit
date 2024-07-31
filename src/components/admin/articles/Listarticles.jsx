import React, { useEffect } from 'react'
//import { getArticles } from '../../../features/articleSlice'
import { useDispatch, useSelector } from 'react-redux'
import AfficheArticle from './AfficheArticle'
import {
  setPage,
  setLimit,
  setSearchTerm,
  getArticlesPagination
} from '../../../features/articleSlice'
import Pagination from './Pagination'

const Listarticles = () => {
  /* `const dispatch = useDispatch()` is a React Redux hook that returns a reference to the `dispatch`
  function provided by the Redux store. This `dispatch` function is used to dispatch actions to the
  Redux store, which in turn triggers state changes in the application. In this context, `dispatch`
  is being used to trigger the `getArticles` action from the `articleSlice` feature to fetch
  articles. */
  const dispatch = useDispatch()

  const { page, limit, searchTerm } = useSelector(state => state.storearticles)

  const loadproducts = async () => {
    await dispatch(getArticlesPagination())
  }

  const handleLimitChange = event => {
    dispatch(setLimit(parseInt(event.target.value, 10)))
    dispatch(setPage(1))
  }

  useEffect(() => {
    loadproducts()
  }, [dispatch, page, limit, searchTerm])

  return (
    <div>
      <AfficheArticle />
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <div className='limit-selector-container'>
          <label>
            Afficher &nbsp;
            <select value={limit} onChange={e => handleLimitChange(e)}>
              <option value={5}>{5}</option>
              <option value={10}>{10}</option>
              <option value={20}>{20}</option>
            </select>
          </label>
        </div>
      </div>
      <Pagination />
    </div>
  )
}

export default Listarticles
