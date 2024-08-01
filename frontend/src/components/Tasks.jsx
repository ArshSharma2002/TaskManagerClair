import React, { useEffect, useState } from 'react'
import Task from './Task'
import { useOutletContext } from 'react-router-dom'

function Tasks() {

  const [tasks, setTasks] = useState([])
  const [isLoggedin] = useOutletContext()

  const handleOnDelete = async (taskid) => {
    try {
      console.log("Deleting blog...")
      const confirmDel = confirm("Confirm delete")
      if (!confirmDel) {
        return;
      }
      const url = `http://localhost:8000/api/v1/task/delete/${taskid}`
      const response = await fetch(url, {
        method: 'DELETE',
        redirect: 'follow',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const deletedTask = await response.json()
      getTasks()
      console.log(deletedTask)

    } catch (error) {
      console.log("Error deleting task : ", error)
    }
  }


  const getTasks = async () => {
    const response = await fetch('http://localhost:8000/api/v1/task/', {
      method: 'GET',
      redirect: 'follow',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log("DATA : " + data.tasks[0].description);
    setTasks(data.tasks)
    console.log("state : " + tasks[0].description)
  }

  useEffect(() => {
    getTasks()
  }, [])


  return (
    <div className='d-flex justify-content-center align-items-center row m-3'>
      <h2>Tasks</h2>
      {tasks.map(task => { return <Task key={task._id} task={task} handleOnDelete={handleOnDelete} /> })}
    </div>
  )
}

export default Tasks
