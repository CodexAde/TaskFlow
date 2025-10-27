import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

async function Registering(req, res) {
  try {
    const { name, email, password, language } = req.body;
    console.log(name, email, password, language);

    const salt = await bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // try {
    //   const getavatarImageLocalPath = req.file ? req.file.path : "";
    //   console.log(getavatarImageLocalPath);
    //   // console.log("Uploaded file info:", req.file); // Debugging line to check the uploaded file
    // } catch (error) {
    //   console.log(error);
    // }



    const avatarImageLocalPath = req.file ? req.file.path : "";
    if (avatarImageLocalPath) {
      const avatar = await uploadOnCloudinary(avatarImageLocalPath);
      console.log("Cloudinary upload response: ", avatar);
      const newUser = await User.create({ name, email, password: hash, avatar: avatar.url, language });
      if (!newUser) {
        return res.status(400).json({ success: false, message: "Failed to create user" });
      }
      const token = jwt.sign(
        { name, email, _id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      newUser.token = token;
      await newUser.save();
      console.log("New user created:", newUser);
      res.status(201).json({
        success: true,
        user: newUser,
        // token: token,
        // avatar: avatar.url
      });
    }

          const newUser = await User.create({ name, email, password: hash, avatar: "", language });
      if (!newUser) {
        return res.status(400).json({ success: false, message: "Failed to create user" });
      }
      // const token = jwt.sign(
      //   { name, email, _id: newUser._id },
      //   process.env.JWT_SECRET,
      //   { expiresIn: process.env.JWT_EXPIRES_IN }
      // );
      // newUser.token = token;
      // await newUser.save();
      // console.log("New user created:", newUser);
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

