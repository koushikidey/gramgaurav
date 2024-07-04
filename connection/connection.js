import mongoose from "mongoose";
const makeconnection = async(username,password) =>{
    try {
        mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.xuym4qw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
            console.log("Connection successfull to mongoDB");
        });

    } catch (error) {
        console.log("There is an error while connecting to mongoDB", error);
    }
}
export default makeconnection;