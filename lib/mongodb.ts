import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        if(process.env.MONGO_DB_URI){
            await mongoose.connect(process.env.MONGO_DB_URI)
            console.log("Connected to MongoDB")
        }
        
    } catch (error) {
        console.log("Error connecting to MongoDB", error)
    }
}