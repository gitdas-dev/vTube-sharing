import express from "express"
import { googleAuth, signin, signup } from "../controllers/auth.js";

const router = express.Router()


//create an user
router.post("/signup", signup)
//sign in 
router.post("/signin", signin)

//google authentication
router.post("/google", googleAuth)


export default router;