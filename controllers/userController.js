const userModel=require('../models/userModel')

//login callback
const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body // here we are destructuring the email and password whatever the user is req(requesting) the server to check from the req.body
        const user=await userModel.findOne({email,password})  // here we are querying the DB using findOne() so as to check if the user is valid and store the result in user variable using the userModel
        if(!user)
        {
            return res.status(404).send('User not found') // if the user is not found we return 404 error
        }
        res.status(201).json({
            success:true,
            user,
        })
    } catch (error) {
        res.status(400).json({   // in case if there is some error then the catch bolck with the error is caught and as a server response of status code 400 is returned 
            success:false,
            error
        })
    }
}

// Register callback
const registerController=async(req,res)=>{
    const newUser=new userModel(req.body)
    await newUser.save()
    res.status(201).json({
        success:true,
        newUser,
    })
}
module.exports={loginController,registerController}