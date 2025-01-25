import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import cloudinary from "../lib/cloudinary.js";

//function handling the signup 
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !password || !email) {
      return res.status(400).json({ message: "all fields are required" })
    }
    //checking the password
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be atleast 6 characters long" })

    }

    //check if email already exists or not
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "Email already exists" })
    }

    //hashing the password to store in the database
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    })
    //generate the jwt token if newUser
    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json({ message: "Invalid User Data" })
    }
  } catch (err) {
    console.log('erron in signup controller', err.message)
    res.status(500).json({ message: 'internal server error' })
  }
}

//function handling user login
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    //checking if user already exists or not
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'invalid credentials' })
    }

    //matching the password on login 
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" })
    }
    //generating the token and saving as the cookies
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    })
  } catch (err) {
    console.log('error in login controller', err.message)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//function handling the logout
export const logout = (req, res) => {
  try {
    //clearing the cookies
    res.cookie("jwt", '', { maxAge: 0 })
    res.status(200).json({ message: 'logged out successfully' })
  } catch (err) {
    console.log('error in logout controller', err.message)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateProfile = async (req, res) =>{
  try{
    const {profilePic} = req.body;
    const userId = req.user._id
    if(!profilePic){
      return res.status(400).json({message:'profile pic is required'})
    }
    const uploadRes = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadRes.secure_url},{new:true})
    res.status(200).json(updatedUser)
  }catch(err){
    console.log("error in update profile",err)
    res.status(500).json({message:'internal server error'})
  }
}

export const checkAuth = (req,res)=>{
  try{
    res.status(200).json(req.user);
  }catch(err){
    console.log('error in checkAuth controller',err.message)
    res.status(500).json({message:'internal server error'})
  }
}

