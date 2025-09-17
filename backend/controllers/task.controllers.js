import Task from "../models/task.models.js";
async function creatingTask(req, res) {
    try {
        const { title, description, status, dueDate, tone, language } = req.body;

        if (!title || !description) {
            return res
                .status(400)
                .json({ message: "Title and description are required" });
        }

        const newTask = await Task.create({
            title,
            description,
            status,
            dueDate,
            user: req.user._id,
            tone,
            language
        });

        // console.log("New task created:", newTask);
        

        if (!newTask) {
            return res.status(400).json({ message: "Failed to create task" });
        }

        res.status(201).json({
            success: true,
            newTask
        });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: error.message 
        });
    }
}

async function getAllTasks(req, res) {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
        // console.log("Fetched tasks:", tasks || "No tasks found");
        
        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: error.message 
        });
    }
}

async function deleteTask(req, res) {
    try {
        const taskID = req.params.id
        if(!taskID){
            return res.status(400).json({message: "Task ID is required"})
        }
const deleteTask = await Task.findByIdAndDelete(taskID)
if(!deleteTask){
    return res.status(404).json({message: "Task not found"})
}
return res.status(200).json({success: true, message: "Task deleted successfully"})              
    } catch (error) {
        res.send(500).json({message: "Internal server error", error: error.message})
    }
    
}

async function updateTask(req, res) {
    try {
        const taskID = req.params.id
        const { title, description, status } = req.body
        if(!taskID){
            return res.status(400).json({message: "Task ID is required"})
        }
        const updatedTask = await Task.findByIdAndUpdate(taskID, { title, description, status }, { new: true })
        if(!updatedTask){
            return res.status(404).json({message: "Task not found"})
        }
        return res.status(200).json({success: true, message: "Task updated successfully", updatedTask})
    } catch (error) {
        res.send(500).json({message: "Internal server error", error: error.message})
    }
}       

export { 
    creatingTask,
    getAllTasks,
    deleteTask,
    updateTask
 };




 