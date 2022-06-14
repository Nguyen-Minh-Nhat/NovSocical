const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const deleteTmp = async (files) => {
  Object.keys(files).map((key) => {
    fs.unlinkSync(files[key].tempFilePath);
  });
};

const upload = async (path, folder) => {
  var imagePath = "";
  await cloudinary.uploader.upload(path, { folder }, (error, result) => {
    imagePath = result.public_id;
  });
  return imagePath;
};

const destroy = async (path) => {
  await cloudinary.uploader.destroy(path);
};

const destroyDirectory = async (path) => {
  await cloudinary.api.delete_resources_by_prefix(path);
  await cloudinary.api.delete_folder(path);
};

module.exports = { upload, destroy, destroyDirectory, deleteTmp };
