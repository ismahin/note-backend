import { Router } from "express";
import customerRoutes from "./customerAppRoutes/customer.routes.js";
import employeeRoutes from "./employeeAppRoutes/employee.routes.js";
import { verifyJWTForAdmin } from "../middlewares/auth.middleware.js";

const routes = Router();


routes.use("/customer", customerRoutes);
routes.use("/employee", verifyJWTForAdmin, employeeRoutes);

export default routes;
