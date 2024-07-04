import express from "express";
import makeconnection from "./connection/connection.js";
import cors from 'cors';
import dotenv from 'dotenv';
import routes2 from "./routes/adminroutes.js";
import router from "./routes/form.js";
import router3 from "./routes/mapRoutes.js";
import routes4 from "./routes/vendorroutes.js";
const port = 8000;
const app = express();
dotenv.config();
makeconnection(process.env.DB_username,process.env.DB_password);
app.use(cors());
app.get('/',(req,res)=>{
    res.send("Hello world");
});
app.use(express.json({extended:false}));
app.use('/api/users',routes2);
app.use('/api/users',router);
app.use('/api/volunteer',router3);
app.use('/api/users',routes4);
app.listen(port,()=>{
    console.log("Port is running on",port);
});
