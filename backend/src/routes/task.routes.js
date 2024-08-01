import express from "express"
import { createTasks, deleteTaskById, getTaskById, getTasks, updateTaskById, getMyTasks } from "../controllers/task.controller.js"
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', verifyJWT, getTasks)
router.get('/mytasks', verifyJWT, getMyTasks)
router.get('/:taskid', verifyJWT, getTaskById)
router.post('/create', verifyJWT, createTasks)
router.put('/update/:taskid', verifyJWT, updateTaskById)
router.delete('/delete/:taskid', verifyJWT, deleteTaskById)


export default router

