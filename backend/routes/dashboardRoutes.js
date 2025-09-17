import express from 'express'
import { getAllUsers, getSpecificTask } from '../controllers/dashboard.contorllers.js';


const router = express.Router();

router.post("/", getAllUsers)
router.post("/task", getSpecificTask)
export default router;
