const User = require('../models/users');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name:'portaapp',
    api_key:'563755334298556',
    api_secret:'YOnANVWzbdNitUBNs_HekDccpCc'
});

exports.uploadImage = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    const result = await cloudinary.v2.uploader.upload(req.file.path);
    user.userImageURL = result.url;
    user.userImageId = result.public_id;

    const newUser = await user.save();

    return res.status(200).send(newUser);
  } catch (err) {
    console.log(err);
    return err
  }
};
