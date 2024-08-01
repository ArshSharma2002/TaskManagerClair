import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({ isLoggedin, setIsLoggedin }) {


    const navigate = useNavigate()

    const handleOnLogout = async () => {
        try {
            // console.log("user logout...")
            const url = `http://localhost:8000/api/v1/user/logout`
            const response = await fetch(url, {
                method: 'POST',
                redirect: 'follow',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const loggedoutUser = await response.json()

            if (loggedoutUser.status == "200") {
                setIsLoggedin(false)
            }
            console.log(loggedoutUser)
            navigate('/login')

        } catch (error) {
            console.log("Error logging out: ", error)
        }
    }

    useEffect(() => {
        console.log("user login status changed");
      
    }, [isLoggedin])
    

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">TaskManager</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tasks
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/task">Task</Link></li>
                                    <li><Link className="dropdown-item" to="/createtask">Create Task</Link></li>
                                </ul>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center flex-column flex-lg-row">
                            {!isLoggedin ? <>
                                <button className="btn auth-btn btn-outline-primary me-4 m-2" type=""><Link className='btn-auth text-decoration-none text-white' to="/login" >Login</Link></button>
                                <button className="btn auth-btn btn-outline-primary me-4 m-2" type=""><Link className='btn-auth text-decoration-none text-white' to="/signup" >Signup</Link></button>
                            </> :
                                <button className="btn auth-btn btn-danger m-2" type="button" onClick={handleOnLogout}>Logout</button>}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
