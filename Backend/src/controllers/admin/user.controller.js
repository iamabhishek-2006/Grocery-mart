const {getUsersbyAdminDB,deleteUsersbyAdminDB,profiileAdminDB} = require("../../services/admin/user.service");

const getprofileAdmin = async (req, res) => {
  try {
    const { id } = req.user;
    const data = await profiileAdminDB(id);
    return res.json({
      success: true,
      message:"admin details fetch successfully",
      data:data,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const getUsersbyAdmin = async (req, res) => {
  try {
    const users = await getUsersbyAdminDB();

    if (!users) {
      return res.json({
        success: false,
        error: "users not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "get users added successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteUsersbyAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const users = await deleteUsersbyAdminDB(id);
    return res.status(200).json({
      success: true,
      message: "get users added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

module.exports = { getUsersbyAdmin, deleteUsersbyAdmin, getprofileAdmin };
