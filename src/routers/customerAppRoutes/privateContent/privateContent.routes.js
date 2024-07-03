import { Router } from "express";
import {
  createContent,
  editContent,
  getAllPrivateContent,
  deleteOneContent,
} from "../../../controllers/customerAppController/privateContentController/privateContent.controller.js";

const router = Router();

router.route("/createContent").post(createContent);
router.route("/edit/:id").patch(editContent);
router.route("/delete/:id").delete(deleteOneContent);
router.route("/mycontents").get(getAllPrivateContent);

export default router