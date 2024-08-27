import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Listarticles from './components/admin/articles/Listarticles'
import Listcategories from './components/admin/categories/Listcategories'
import Listscategories from './components/admin/scategories/Listscategories'
import './App.css'
import Listarticlecartes from './components/client/Listarticlecartes'
import Cart from './components/client/panier/Cart'
import Register from './components/admin/Register'
import Login from './components/admin/Login'
import Logout from './components/admin/Logout'
//import { useSelector } from 'react-redux'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Menu from './components/admin/Menu'

function App () {
  //const { isLoggedIn } = useSelector(state => state.auth)
  return (
    <>
      <Router>
        {/*{isLoggedIn ? <Menu/> : <Login />}  */}
        <Routes>
          <Route path='/menu' element={<Menu />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/articles' element={<Listarticles />} />
            <Route path='/categories' element={<Listcategories />} />
            <Route path='/scategories' element={<Listscategories />} />
            <Route path='/' element={<Listarticlecartes />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
