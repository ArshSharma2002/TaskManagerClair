import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  const [isLoggedin, setIsLoggedin] = useState(null)

  const userLoggedIn = async () => {
    try {
      console.log("login status checking...")
      const url = `http://localhost:8000/api/v1/user/isloggedin`
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'

        }
      })

      const loginstatus = await response.json()

      setIsLoggedin(loginstatus.data.loginstatus)
      // console.log(loginstatus.data.loginstatus)

    } catch (error) {
      console.log("Login status Error !!!")
    }
  }

  useEffect(() => {
    userLoggedIn()
  }, [])


  return (
    <>
      <Navbar setIsLoggedin={setIsLoggedin} isLoggedin={isLoggedin} />
      <Outlet context={[isLoggedin, setIsLoggedin]} />
      <Footer />
    </>
  )
}

export default App
