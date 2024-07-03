import { Router } from "express";
import { allContent } from "../../../controllers/customerAppController/publicContentController/publicContent.controller.js";

const router = Router()

router.route("/view").get(allContent)


export default router