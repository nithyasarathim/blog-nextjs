import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("DB connection successful");
    }catch(err){
        console.log(err.message);
    }
}