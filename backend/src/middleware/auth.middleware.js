import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"Unauthorized - No token provided"})
        }
        //jwt.verify returns the data that is encoded in jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Invalid Token"})
        }

        //.select is used to get the data excluding the particular item represented by -
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found"})
        }


        //next function points to the another function that is to be executed

        //req.user is parsed and then saved to req.user
        req.user = user
        next()
    }catch(err){
        console.log('error in protectRoute middleware');
        res.status(500).json({message:'Internal server error'})
    }
}