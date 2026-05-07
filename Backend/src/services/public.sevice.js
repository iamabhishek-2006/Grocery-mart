const Category = require("../models/category");
const Product = require("../models/product");

const getCategoriesDB=async()=>{
    return await Category.find();
}

const getProductsDB=async()=>{
    return await Product.find();
}

module.exports={getCategoriesDB,getProductsDB};

