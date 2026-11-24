import mongoose from "mongoose";
const connectionString = process.env.DB_CONNECTION_URL as string

export const connectDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log("DB Connection String");

    }
    catch (err) {
        console.log("DB Connection failed");
        console.log(err);


    }
}