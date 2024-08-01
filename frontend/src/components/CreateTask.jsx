import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Login from './Login'

function CreateTask() {


    const [isLoggedin] = useOutletContext()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [assignee, setAssignee] = useState('')
    const [priority, setPriority] = useState('')
    const [dueDate, setDueDate] = useState('')

    //   const navigate = useNavigate()


    const createblog = async ({ title: title, description: description, assignee: assignee, tag: tag }) => {
        try {
            console.log("Creating blog...")

            const url = `http://localhost:8000/api/v1/blogs/create`
            const formData = new FormData()
            formData.append("title", title)
            formData.append("description", description)
            formData.append("priority", priority)
            formData.append("assignee", assignee)
            formData.append("dueDate", dueDate)
            const response = await fetch(url, {
                method: 'POST',
                redirect: 'follow',
                credentials: 'include',
                // headers: {
                //   'Content-Type': 'multipart/form-data'
                // },
                body: formData

            });

            const newBlog = await response.json()

            console.log(newBlog)

        } catch (error) {
            console.log("Error registering user: ", error)

        }
    }

    const handleOnCreate = async (e) => {
        e.preventDefault()
        createblog({ title, description, assignee, priority, dueDate })
        setTitle('')
        setDescription('')
        setAssignee('')
        setPriority('')
        setDueDate('')
        setTimeout(() => {
            navigate('/task')
        }, 2000);
    }


    return (
        <div className='container m-5'>
            {!isLoggedin ? <Login /> : <form  onSubmit={handleOnCreate} >
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" aria-describedby="emailHelp" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="priority" className="form-label">Priority</label>
                    <input type="text" className="form-control" id="priority" aria-describedby="emailHelp" value={priority} onChange={(e) => setPriority(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="assignee" className="form-label">Assignee</label>
                    <input type="text" className="form-control" id="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="duedate" className="form-label">Due Date</label>
                    <input type="text" className="form-control" id="duedate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>}
        </div>
    )
}

export default CreateTask
