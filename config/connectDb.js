// establishing a connection with MONGODB
const mongoose=require('mongoose')

const colors=require('colors')

// function to connect to mongoDB
const connectDb=async()=>{   
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Server running on ${mongoose.connection.host}`.bgCyan.white)
    } catch(e){
        console.log(`${e}`.bbRed)
    }
}

module.exports=connectDb;