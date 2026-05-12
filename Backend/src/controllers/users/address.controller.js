const { addAddressDB, updateAddressDB, removeAddresDB, getAddressDB } = require("../../services/users/address.service");

const addAddress = async (req, res) => {
  const { userId } = req.body;
  const {fullName,phone,line1,line2,landmark,city,state,country,zipCode } = req.body;

  if (!fullName ||!phone ||!line1 ||!line2 ||!landmark ||!city ||!state ||!country ||!zipCode ) {
    return res.json({
      success: false,
      error: "all fields are requried",
      required: ["fullName","phone","line1","line2","landmark","city","state","country","zipCode" ],
    });
  }

  try {
    const data = await addAddressDB(userId, {fullName,phone,line1,line2,landmark,city,state,country,zipCode});
    return res.status(201).json({
      success: true,
      message: "user add address successfully",
      data: data,
    });
  } catch (error) {
       return res.status(500).json({
         success: false,
         error: error.message,
       });
    }
  }


const getAddress =async (req,res)=>{
    try {
        const data=await getAddressDB();
        return res.status(200).json({
            success:true,
            message:"get address succfully",
            data
        });
    } catch (error) {
        return res.json({
            success:false,
            error:error.message
        });
    }
};

const updateAddress = async(req,res) => {
    const {id}=req.params;
    const body=req.body;

    try {
        const data=await updateAddressDB(id,body);
        return res.status(200).json({
            success:true,
            message:"user update address successfully",
            data:data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        });
    }
};

const removeAddress =async(req,res)=>{
    const {id}=req.params;

    try {
      const data=await removeAddresDB(id);
      return res.status(200).json({
        success:true,
        message:"remove address successfully",
      })  
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        });
    }
};

module.exports = { addAddress, getAddress, updateAddress, removeAddress };
