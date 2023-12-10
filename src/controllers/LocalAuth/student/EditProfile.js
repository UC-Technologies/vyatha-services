

const upload = require('../../../middlewares/multer'); 
const Student = require('../../../models/studentModel');

const editStudentProfile = async (req, res) => {
  const { name, hostelNo, roomNo, phoneNumber } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        hostelNo,
        roomNo,
        phoneNumber,
        photo,
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  editStudentProfile,
};
