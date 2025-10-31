import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

async function Registering(req, res) {
  try {
    const { name, email, password, language } = req.body;
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);


    const salt =  bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const avatarImageLocalPath = req.file ? req.file.path : "";
    if (avatarImageLocalPath.length != 0) {
      const avatar = await uploadOnCloudinary(avatarImageLocalPath);
      console.log("Cloudinary upload response: ", avatar);
      const newUser = await User.create({ name, email, password: hash, avatar: avatar.url, language });
      if (!newUser) {
        return res.status(400).json({ success: false, message: "Failed to create user" });
      }
      console.log("New user created:", newUser);
      delete newUser.password; // Remove password before sending response
      res.status(201).json({
        success: true,
      });
      return
    }

    const newUser = await User.create({ name, email, password: hash, avatar: "", language });
    if (!newUser) {
      return res.status(400).json({ success: false, message: "Failed to create user" });
    }
    res.status(201).json({
      success: true,
      user: newUser,
      // token: token,
    });
  } catch (error) {
    console.log("bn nhi payi hai dost teri id", error);
  }
}

function looking(req, res) {
  res.send("hello world")
}



async function Login(req, res) {
  try {
    const { email, password } = req.body;

    const found = await User.findOne({ email });
    if (!found) {
      return res.status(404).json({ success: false, message: "User not found. Please register first." });
    }

    const checked = await bcrypt.compare(password, found.password);
    if (!checked) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { name: found.name, email: found.email, _id: found._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      user: { name: found.name, email: found.email, _id: found._id },
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
export { Registering, Login, looking };

