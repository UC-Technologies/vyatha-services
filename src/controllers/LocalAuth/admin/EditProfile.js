// controllers/LocalAuth/admin/EditProfile.js

const upload = require('../../../middlewares/multer'); 
const Admin = require('../../../models/adminModel');

const editAdminProfile = async (req, res) => {
  const { name, phoneNumber } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        name,
        phoneNumber,
        photo,
      },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  editAdminProfile,
};
