import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



function Signup() {


  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()


  const registerUser = async ({ username: username, fullname: fullname, email: email, password: password }) => {
    try {
      console.log("registering user...")

      const url = `http://localhost:8000/api/v1/user/register`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({ username: username, fullname: fullname, email: email, password: password })
      });

      const newUser = await response.json()

      console.log(newUser)

    } catch (error) {
      console.log("Error registering user: ", error)

    }
  }

  const handleOnSignup = async (e) => {
    e.preventDefault()
    console.log("Signing in .....")
    registerUser({ username: username, fullname: fullname, email: email, password: password })
    console.log("User registered !")
    setEmail('')
    setUsername('')
    setFullname('')
    setPassword('')
    navigate('/login')

  }

  useEffect(() => {

  }, [])


  return (
    <div className='container m-5'>
      <form onSubmit={handleOnSignup}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">User Name</label>
          <input type="text" className="form-control" id="username" aria-describedby="emailHelp" onChange={(e)=>setUsername(e.target.value)} value={username} />
        </div>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullname" aria-describedby="emailHelp" onChange={(e)=>setFullname(e.target.value)} value={fullname} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)} value={email} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
