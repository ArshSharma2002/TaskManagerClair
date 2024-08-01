import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyJWT = async(req, res, next)=>{
    try {
        
        // console.log("inside middleware...")
        const token = req.cookies.accesstoken
        // console.log("Token Val : " + token)
        
        if (!token) {
            throw new Error("Unauthorized request !!!")
        }

        // console.log("got token .....")
    
        const decodedInfo = jwt.verify(token, process.env.ACCESSTOKEN_SECRET)

        // console.log("User Verified: ", decodedInfo)
    
        const user = await User.findById(decodedInfo?._id).select("-password ")

        // console.log("Res user: ", user)
    
        if (!user) {
            throw new Error("Invalid access token !!!")
        }
    
        req.user = user
        // console.log("Req user: ", req.user)
        next()

    } catch (error) {
        throw new Error("Auth Middleware error !!!")
    }
}

export {verifyJWT}