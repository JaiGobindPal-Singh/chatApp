import jwt from 'jsonwebtoken';

//it will generate the token
export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    //sending the cookies
    res.cookie("jwt",token,{
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV === "production"
    })
    return token;
}