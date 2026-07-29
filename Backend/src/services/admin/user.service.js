const User = require("../../models/user");

const profiileAdminDB = async (id) => {
  const getProfile = await User.findById(id).select("-password ");
  console.log(getProfile);
  return getProfile;
};

const getUsersbyAdminDB=async()=>{
   const user=await User.find().select("email name role ");
   return user;
};

const deleteUsersbyAdminDB=async(id)=>{
    return await User.findByIdAndDelete(id);
};

module.exports = { getUsersbyAdminDB, deleteUsersbyAdminDB, profiileAdminDB };