import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/nextjs-imagegallary')
        console.log('Connected to the database with ${mongoose.connection.host}')
    } catch (error) {
        mongoose.disconnect()
        process.exit(1)
        
    }
}