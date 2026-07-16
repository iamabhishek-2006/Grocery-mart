import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Users from "./pages/Users"
import Login from './pages/Login';
import CODOrders from './pages/CODOrders';
import Product from './pages/Product';
import OnlineOrders from './pages/OnlineOrders';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:slug" element={<Product/>}/>
          
          <Route path="/categories" element={<Categories />} />
          <Route path="/onlineorders" element={<OnlineOrders />} />
          <Route path='/codOrders' element={<CODOrders/>}/>
          <Route path="/users" element={<Users />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;