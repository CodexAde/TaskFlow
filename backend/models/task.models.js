import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        // enum: ["pending", "completed", "in progress"],
        default: "pending"
    },
    // dueDate: {
    //     type: Date,
    //     required: false
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    tone: {
        type: String,
        // enum: ["Happy", "Sad", "Angry", "Motivated", "Neutral"],
        default: "Angry"
    },

}, { timestamps: true })

const Task = mongoose.model("Task", taskSchema)
export default Task;
