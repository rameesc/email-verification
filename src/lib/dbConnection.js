import mongoose from "mongoose";

export const dbConnection=async()=>{

    try{
       await mongoose.connect(process.env.DB_URL)
        console.log('successfuly connected')


    }catch(error){
        console.log(error)
    }
}