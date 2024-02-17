import express from 'express';
import { courceControler, createCourceController, deleteCourceController, singleCourceController, updateCourceController } from '../controllers/courceController.js';
import {requireSignIn,isAdmin} from "../middlewares/authMiddleware.js"

const router = express.Router();

//create-cource
router.post('/create-cource',requireSignIn,isAdmin,createCourceController);

//update cource
router.put('/update-cource/:id',requireSignIn,isAdmin,updateCourceController)

//get All COurce
router.get('/get-cource',courceControler);

// single cource
router.get('/single-cource/:slug',singleCourceController);

//delete cource
router.delete('/delete-cource/:id',requireSignIn,isAdmin,deleteCourceController)

export default router