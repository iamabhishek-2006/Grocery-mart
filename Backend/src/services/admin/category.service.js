const Category = require("../../models/category");

const createCategoryDB=async({name,slug})=>{
    const category= await Category.create({name,slug});
    return category;
}

const getCategoryDB=async()=>{
    const data= await Category.find();
    return data;
}

const updateCategoryDB = async (id,{  name, slug }) => {
  return await Category.findOneAndUpdate(
    { _id: id },
    { name, slug },
    { returnDocument: "after" },
  );
};

const deleteCategoryDB=async(id)=>{
    return await Category.findByIdAndDelete(id);
}

module.exports={createCategoryDB,updateCategoryDB,deleteCategoryDB,getCategoryDB}