const cloudinary = require("cloudinary");

//cloudinary config

cloudinary.v2.config({
  cloud_name: procces.env.CLOUDINARY_CLOUD_NAME,
  api_key: procces.env.CLOUDINARY_API_KEY,
  api_secret: proccess.env.CLOUDINARY_API_SECRET,
});
