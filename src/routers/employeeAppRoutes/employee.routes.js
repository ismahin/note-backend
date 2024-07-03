import { Router } from "express";
import { deleteContent } from "../../controllers/employeeAppController/manageAllContent/manageAllContent.controller.js";
import { verifyJWTForAdmin } from "../../middlewares/auth.middleware.js";

const router = Router()

router.route("/delete/:id").delete(verifyJWTForAdmin, deleteContent)

export default router