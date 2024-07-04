import express from "express";
import { createAdmin,loginAdmin } from "../controllers/admin_controller.js";
import authorizeAdmin from "../middlewares/authorization.js";

const routes2 = express();
routes2.post('/loginAdmin',loginAdmin);
routes2.post('/createAdmin',createAdmin);
export default routes2;