const Cart = require("../../models/cart")

const addToCartDB = async (user, item, quantity) => {

  const cartData=await Cart.findOne({user,item});

  if(!cartData){
  const Data = await Cart.create({ user, item, quantity });
  return Data;
  }else{
    return {error:"product is already exists in cart"}
  }
  return cartData;
}; 


const getCartDB=async()=>{
    return await Cart.find();
}

const updateCartDB=async(id,body)=>{
  const data= await Cart.findByIdAndUpdate(id,body);
  return data;
}

const removeCartDB=async(id)=>{
  const removeCart=await Cart.findByIdAndDelete(id);
  return removeCart;
}

module.exports={addToCartDB,getCartDB,updateCartDB,removeCartDB};