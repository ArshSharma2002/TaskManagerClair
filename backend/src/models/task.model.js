import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    publisher:{
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    assignee:{
        type: String
    },
    dueDate:{
        type: Date,
        required:true
    },
    priority:{
        type: String,
    }

}, 
{timestamps: true})

export const Task = mongoose.model("Task", taskSchema)