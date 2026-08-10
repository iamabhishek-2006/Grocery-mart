const {addToCartDB,updateCartDB,removeCartDB,getCartDB} = require("../../services/users/cart.service");

const addToCart = async (req, res) => {
  const {id}=req.user;
  const {  item, quantity } = req.body;
  if (!item || !quantity) {
    return res.json({
      success: false,
      error: "all fields are required",
      required: ["item", "quantity"],
    });
  }

  try {
    const data = await addToCartDB(user, item, quantity);

    if (!data) {
      return res.json({ success: false, error: "data not found" });
    }

    return res.status(201).json({
      success: true,
      message: "add to cart successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getCart = async (req, res) => {
  const {id}=req.user;
  try {
    const data = await getCartDB(id);
    if (data.error) {
      return res.json({ success: false, error: data.error });
    }

    return res.status(200).json({
      success: true,
      message: "user get cart successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const data = await updateCartDB(id, body);
    return res.status(200).json({
      success: true,
      message: "user update cart successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const removeCart = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await removeCartDB(id);
    return res.status(200).json({
      success: true,
      message: "user remove cart successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { addToCart, updateCart, removeCart, getCart };
