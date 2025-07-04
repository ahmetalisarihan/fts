import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return true;
        }
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log(`Connected to the database with ${mongoose.connection.host}`)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
export default connectDB
