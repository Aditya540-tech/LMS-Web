import express from "express";
import { forgotPasswordController, loginController, registerController } from "../controllers/authController.js";
import { isAdmin, requireSignIn, testController } from "../middlewares/authMiddleware.js";

const router = express.Router();

//register
router.post('/signup',registerController);

//login
router.post('/login',loginController);

//test Controller
router.get('/test',requireSignIn,isAdmin,testController)

//Forget Password || POST
router.post('/forgot-password',forgotPasswordController)
//protected User route aut
router.get("/user-auth", requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

//protected Admin route aut
router.get("/admin-auth", requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})
export default router
