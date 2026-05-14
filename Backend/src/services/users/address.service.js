const Address = require("../../models/address");
const User=require("../../models/user")

const addAddressDB = async (id, { fullName, phone, line1, line2, landmark, city, state, country, zipCode }) => {
  // check user exists or not
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  const existingAddress = await Address.findOne({
    userId: id,
    line1,
    zipCode,
  });

  if (existingAddress) {
    throw new Error("Address already exists");
  }

  const data = new Address({userId: id,fullName,phone,line1,line2,landmark,city,state,country,zipCode});
  return await data.save();
};

const getAddressDB=async(id)=>{
    return await Address.find({userId:id});
}

const updateAddressDB=async(id,body)=>{
    return await Address.findByIdAndUpdate(id,body);
}

const removeAddresDB=async(id)=>{
    return await Address.findByIdAndDelete(id);
}

module.exports={addAddressDB, getAddressDB,updateAddressDB,removeAddresDB};