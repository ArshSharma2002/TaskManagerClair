import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Tasks from './components/Tasks.jsx'
import CreateTask from './components/CreateTask.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path='' element={<Home />}></Route>
    <Route exact path='task' element={<Tasks />}></Route>
    {/* <Route exact path='myblogs' element={<MyBlogs />}></Route>/ */}
    {/* <Route exact path='blogs/updateblog/:blogid' element={<UpdateBlog />}></Route> */}
    {/* <Route exact path='blogs/readblog/:blogid' element={<BlogItem />}></Route> */}
    <Route path='login' element={<Login />}></Route>
    <Route path='signup' element={<Signup />}></Route>
    <Route path='createtask' element={<CreateTask />}></Route>
    {/* <Route path='*' element={<PageNotFound />}></Route> */}
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
