import { User } from '../models/user.models.js'
import Task from "../models/task.models.js";
import mongoose from 'mongoose';
import { getAIResponse } from '../utils/gemini.js';

async function getAllUsers(req, res) {
    try {
        const { language } = req.body;
        
        const getUsers = await User.find({ language: language});
        const users = getUsers.map(user => ({
            id: user._id,
            name: user.name,
            avatar: user.avatar
        }));
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getSpecificTask(req, res) {
    const { user_id, tone } = req.body;
        // console.log("got from frontend: ", req.body);
    

    const tasks = await Task.find({
        user: new mongoose.Types.ObjectId(user_id),
        tone: tone
    });
    // console.log("task founded: ", tasks);
    
    if (!tasks) { res.json({ message: "no task found" }) }
    try {
        const tasks = await Task.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user_id),
                    tone: tone
                }
            },
            {
                $lookup: {
                    from: "users",           // join users collection
                    localField: "user",      // tasks.user
                    foreignField: "_id",     // users._id
                    as: "user_info"          // nayi field me aa jaayega
                }
            },
            {
                $unwind: "$user_info"      // array ko object me convert kar
            },
            {
                $project: {
                    _id: 0,                      
                    title: 1,                     
                    description: 1,               
                    "user_info.name": 1,          
                    "user_info.avatar": 1          
                }
            }

        ]);

       let aiResponse = await getAIResponse(tasks)
        res.status(200).json({
            success: true,
            tasks,
            aiResponse
        });
    } catch (err) {
        console.error(err);
    }
}
export { getAllUsers, getSpecificTask };