import express from "express";
import { getmaps, handleMap } from "../controllers/mapController.js";
import router from "./form.js";
const router3 = express.Router();
router3.post('/submitmap',handleMap);
router3.get('/getmaps/:id',getmaps);
export default router3;