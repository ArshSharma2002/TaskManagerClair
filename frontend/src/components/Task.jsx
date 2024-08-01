import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Task({ task, handleOnDelete }) {

    const [userTasks, setUserTasks] = useState(null)
    const urlpath = useLocation()

    useEffect(() => {
        if (urlpath.pathname == '/mytasks') {
            setUserTasks(true)
        } else {
            setUserTasks(false)
        }

    }, [])

    return (
        <div className="col-sm-4  m-3 p-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">Assignee: {task.assignee}</p>
                    <span class="badge text-bg-danger position-absolute top-0 end-0 m-3">{task.priority}</span>
                    <div>
                        <button className="btn btn-success mx-2" onClick={() => handleOnDelete(task._id)}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task
