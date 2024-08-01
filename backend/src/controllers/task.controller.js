import {Task} from '../models/task.model.js'


const createTasks = async (req, res) => {
    try {

        const { _id } = req.user
        if (!_id) {
            throw new Error("User not authenticated !!!")
        }

        console.log("User id: ", _id)

        const { title, description, assignee, dueDate, priority} = req.body

        if (!(title && description)) {
            throw new Error("Task details are required !!!")
        }


        const newTask = await Task.create({
            publisher: _id,
            title,
            description,
            assignee,
            dueDate,
            priority
        
        })

        console.log("New task: ", newTask)

        return res.status(200).json({status:"200", data:newTask, msg:"Task created success !"})


    } catch (error) {
        throw new Error('Error creating task !!!')
    }
}

const getTasks = async (req, res) => {
    try {

        // const {_id} = req.user
        // const blogs = await Blog.find({publisher:_id})     
        const tasks = await Task.find({})

        if (!tasks) {
            throw new ApiError(404, "Tasks not found !!!")
        }

        return res.status(200).json({status:"200",tasks, msg:"Task fetched success !"})

    } catch (error) {
        throw new Error('Internal Server Error !!!')
    }
}

const getMyTasks = async (req, res) => {
    try {

        const { _id } = req.user
        const tasks = await Task.find({ publisher: _id })
        // const blogs = await Blog.find({})     

        if (!tasks) {
            throw new Error("Tasks not found !!!")
        }

        return res.status(200).json({status:"200", data:tasks, msg:"Tasks fetched success !"})

    } catch (error) {
        throw new Error('Internal Server Error !!!')
    }
}

const getTaskById = async (req, res) => {
    try {
        const { taskid } = req.params
        if (!taskid) {
            throw new Error("Task id is required !!!")
        }
        const fetchedTask = await Task.findById(taskid)
        if (!fetchedTask) {
            throw new Error("Task not found !!!")
        }
        return res.status(200).json({status:"200", data:fetchedTask, msg:"Task fetched success !"})

    } catch (error) {
        throw new Error("Internal Server Error !!!")
    }
}

const updateTaskById = async (req, res) => {
    const { title, description } = req.body

    if (!title && !description) {
        throw new Error("All fields are required !!!")
    }

    const task = await Task.findByIdAndUpdate(
        req.params?.taskid,
        {
            // mongoDB operations
            $set: {
                description: description,
                title: title
            }
        },
        // returns data after updation.
        { new: true }

    )

    return res
        .status(200)
        .json({status:"200", data:task, msg:"Task updated success !"})
}

const deleteTaskById = async (req, res) => {
    try {
        const { taskid } = req.params

        if (!taskid) {
            throw new Error("Task id is required !!!")
        }

        const deletedTask = await Task.findByIdAndDelete(taskid)

        if (!deletedTask) {
            throw new Error("Task not found & deleted !!!")
        }

        return res.status(200).json({status:"200", data:deletedTask, msg:"Task deleted success !"})

    } catch (error) {
        throw new Error('Internal Server Error !!!')
    }


}


export { createTasks, getTasks, getTaskById, updateTaskById, deleteTaskById, getMyTasks }