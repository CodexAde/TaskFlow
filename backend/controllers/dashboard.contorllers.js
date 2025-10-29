import { User } from '../models/user.models.js'
import Task from "../models/task.models.js";
import mongoose from 'mongoose';
import { getAIResponse } from '../utils/gemini.js';

async function getAllUsers(req, res) {
    try {
        const { language } = req.body;
        console.log("got from frontend: ", req.body);
        
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
    const { language, user_id, tone } = req.body;

    const tasks = await Task.find({
        language: language,
        user: new mongoose.Types.ObjectId(user_id),
        tone: tone
    });
    if (!tasks) { res.json({ message: "no task found" }) }
    try {
        const tasks = await Task.aggregate([
            {
                $match: {
                    language: language,
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
                    _id: 0,                     // agar id nahi chahiye
                    title: 1,                    // task ka title
                    description: 1,              // task ka description
                    "user_info.name": 1,         // user ka name
                    "user_info.avatar": 1         // user ka avatar
                }
            }

        ]);
        console.log(tasks);
        
        // console.log(tasks);
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