require("dotenv").config();
const cloudinary = require("./config/cloudinary");

async function test() {
  try {
    const result = await cloudinary.api.ping();
    console.log("Cloudinary connected:", result);
  } catch (err) {
    console.error("Cloudinary error:", err);
  }
}

test();