import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Listarticles from "./components/admin/articles/Listarticles";
import Listcategories from "./components/admin/categories/Listcategories";
import Listscategories from "./components/admin/scategories/Listscategories";
import Menu from "./components/admin/Menu";
import './App.css'
import Listarticlecartes from "./components/client/Listarticlecartes";
import Cart from "./components/client/panier/Cart";


function App() {
 
  return (
    <>
     <Router>
      <Menu/>
<Routes>
<Route path="/articles"  element={<Listarticles/>}/>
<Route path="/categories"  element={<Listcategories/>}/>
<Route path="/scategories"  element={<Listscategories/>}/>
<Route path="/" element={<Listarticlecartes/>}/>
<Route path="/cart" element={<Cart />} />
</Routes>
</Router>
    </>
  )
}

export default App
