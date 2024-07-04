import mongoose from "mongoose";
const volunteerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']

    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid 10 digit phone number!`
        }
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
});
const Volunteer = new mongoose.model("volunteers",volunteerSchema);
export default Volunteer;