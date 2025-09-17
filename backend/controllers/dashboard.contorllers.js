import { User } from '../models/user.models.js'
import Task from "../models/task.models.js";

async function getAllUsers(req, res) {
    try {
        const getUsers = await User.find();
        const users = getUsers.map(user => ({
            id: user._id,
            name: user.name,
            avatar: user.avatar ?? null
        }));
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getSpecificTask(req, res) {
        const { user, tone } = req.body;

        try {
            const tasks = await Task.find({
                // user: user.id,  // Change from req.user._id to user.id
                tone: tone
            });
            if (!tasks) {res.json({message: "no task found"})}
            res.status(200).json({
                success: true,
                tasks
            }); 
            
        } catch (error) {
             console.log("there is some error while finding the task: ", error) 
             return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }

        console.log("Found tasks:", tasks); // Debug log

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tasks found for this user and tone"
            });
        }

        res.status(200).json({
            success: true,
            tasks
        });

}
export { getAllUsers, getSpecificTask };