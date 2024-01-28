import mongoose from "mongoose";
const connectDB = async (DATABASE_URL)=>{
    try {
        const DB_OPTIONS ={
            dbName:"node_crud"
        };
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("successfully conection")

    }catch(error){
        console.log(error);
    }
}
export default connectDB;