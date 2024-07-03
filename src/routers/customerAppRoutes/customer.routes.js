import { Router } from "express";
import { verifyJWTForUser } from "../../middlewares/auth.middleware.js";
import privateContent from "../customerAppRoutes/privateContent/privateContent.routes.js";
import publicContent from "../customerAppRoutes/publicContent/publicContent.routes.js";
import auth from "../customerAppRoutes/auth/auth.routers.js"
const router = Router();

router.use("/public", publicContent); //read only
router.use("/private", verifyJWTForUser, privateContent); // read and write
router.use("/auth", auth)

export default router;
