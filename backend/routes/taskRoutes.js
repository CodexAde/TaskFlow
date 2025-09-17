import express from 'express'
import { authenticatingToken } from "../middleware/auth.middleware.js";
import { creatingTask, getAllTasks, deleteTask, updateTask } from '../controllers/task.controllers.js';

const router = express.Router();

router.post("/create", authenticatingToken, creatingTask)
router.post("/getAllTasks", authenticatingToken, getAllTasks)
router.delete("/deleteTask/:id", authenticatingToken, deleteTask)
router.put("/updateTask/:id", authenticatingToken, updateTask)
export default router;
