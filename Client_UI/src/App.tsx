import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<CategoryProducts />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<div><h1>Sorry page not found</h1></div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
