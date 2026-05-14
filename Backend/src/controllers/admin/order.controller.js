const { getOrdersByAdminDB } = require("../../services/admin/order.service");

const getOrdersByAdmin=async(req,res)=>{

    try{
        const data=await getOrdersByAdminDB();
        return res.status(200).json({
            success:true,
            message:"admin get Orders successfully",
            data:data
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        });
    }
}

module.exports={getOrdersByAdmin}