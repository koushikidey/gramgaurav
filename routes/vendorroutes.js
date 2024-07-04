import express from "express";
import { createVendor,loginVendor } from "../controllers/vendor_controller.js";
const routes4 = express.Router();
routes4.post('/createVendor',createVendor);
routes4.post('/loginVendor',loginVendor);
export default routes4;