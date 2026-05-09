const Address = require("../../models/address")

const addAddressDB = async ( id, { fullName, phone, line1, line2, landmark, city, state, country, zipCode }) => {
  return await Address.create({userId: id,fullName,phone,line1,line2,landmark,city,state,country,zipCode,
  });
};

const getAddressDB=async()=>{
    return await Address.find();
}

const updateAddressDB=async(id,body)=>{
    return await Address.findByIdAndUpdate(id,body);
}

const removeAddresDB=async(id)=>{
    return await Address.findByIdAndDelete(id);
}

module.exports={addAddressDB, getAddressDB,updateAddressDB,removeAddresDB};