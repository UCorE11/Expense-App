const express=require('express')
const { loginController, registerController } = require('../controllers/userController')

// router object
const router=express.Router()

//routes
// POST || LOGIN USER router , i.e , POST is the http method
router.post('/login',loginController) // this is the first route and the API Endpoint in the login page URL and then we are calling a controller called loginController where a function is defined. 

// POST || REGISTER USER router
router.post('/register',registerController)

module.exports=router