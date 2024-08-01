import { User } from '../models/user.model.js'
import bcrypt from 'bcrypt'

const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accesstoken = user.generateAccessToken()

        return { accesstoken }

    } catch (error) {
        console.log("Error: ", error)
        throw new Error("Something went wrong generating tokens !!!")
    }
}

const registerUser = async (req, res) => {
    try {

        const { username, fullname, email, password } = req.body
        let isAdmin = false;

        if (username.includes("admin@")) {
            isAdmin = true
        }

        if (!(username && email && password && fullname)) {
            throw new Error("Email & User name is required !!!")
        }

        const existingUser = await User.findOne({
            $or: [{ username: username }, { email: email }]
        })

        console.log("Existing User: ", existingUser)

        if (existingUser) {
            throw new Error(400, "User already exists !!!")
        }

        const newUser = await User.create({
            username,
            fullname,
            email,
            password,
            isAdmin
        })

        console.log("user created !");

        const createdUser = await User.findById(newUser._id).select("-password")

        console.log("created user: ", createdUser)

        if (!createdUser) {
            throw new Error("User not found !!!")
        }

        return res.status(200).json({ status: "200", data: createdUser, msg: "User registration Success !" })

    } catch (error) {
        console.error(error)
        throw new Error("Internal Server Error !!!")
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email + " + " + password);

        if (!(email && password)) {
            throw new Error("User credentials required !!!")
        }

        console.log("user found !");  
        const verifyUser = await User.find( {email: email} )
        if (!verifyUser) {
            throw new Error("Wrong Credentials !!!")
        }

        console.log(verifyUser)

        const checkPassword = await bcrypt.compare(password, verifyUser[0].password)

        console.log("checked password: ", checkPassword)

        if (!checkPassword) {
            throw new Error("Wrong Password !!!")
        }

        const { accesstoken } = await generateTokens(verifyUser[0]._id)

        const loggedInUser = await User.findById(verifyUser[0]._id).select("-password")

        // options for cookies for security so, that only server can modify these cookies.
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None', // Needed for cross-site cookies
        }

        console.log("Generated!!");

        return res.status(200).cookie("accesstoken", accesstoken, options).json(
            {
                status: "200",
                data: {
                    user: loggedInUser,
                    accesstoken
                },
                msg: "User logged in Successfully"
            }
        )


    } catch (error) {
        console.error(error)
        throw new Error("Internal Server Error !!!")
    }
}

const logoutUser = async (req, res) => {
    try {

        console.log("logging out user...")

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None', // Needed for cross-site cookies
        }

        return res
            .status(200)
            .clearCookie("accesstoken", options)
            .json({status:"200", data:{}, msg:"User logged out Successfully !!!"})

    } catch (error) {
        throw new Error("Error logging out !!!")
    }
}

const isLoggedIn = async (req, res) => {
    try {
        console.log("checking user login status...")
        var loginstatus = true
        if (!req.cookies.accesstoken) {
            loginstatus = false
            console.log("user is logged out !")
        }

        return res
            .status(200)
            .json({status:"200", data:{ loginstatus: loginstatus }, msg:"User status sent !"})

    } catch (error) {
        throw new Error('Internal Server Error !!!')
    }
}

export { registerUser, loginUser, logoutUser, isLoggedIn }