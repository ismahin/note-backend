import { Router } from "express";
import { registerUser,logOutUser,loginUser } from "../../../controllers/customerAppController/authController/auth.controller.js";
import { verifyJWTForUser } from "../../../middlewares/auth.middleware.js";


const router = Router();


router.get("/", (req, res) => {
    res.send("Auth base endpoint hit");
});
router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWTForUser, logOutUser)

export default router;
