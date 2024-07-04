import mongoose from "mongoose";
const mapSchema = new mongoose.Schema({
    time:{
        type:Date,
        default:Date.now(),
    },
    id:{
        type:String,
        required:true,
        unique:true
    },
    latitude:{
        type:String,
        required:true,
        unique:true
    },
    longitude:{
        type:String,
        required:true,
        unique:true
    }

});
const Map = new mongoose.model("maps",mapSchema);
export default Map;