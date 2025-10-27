import express from "express";
import  { Registering, Login, looking } from "../controllers/user.controllers.js";
import { authenticatingToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();
router.post("/register", upload.single("avatar"), Registering);

router.post("/login", Login);



router.post("/", authenticatingToken);


export default router;
