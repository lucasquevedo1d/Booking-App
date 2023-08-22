import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./Pages/auth.js"
import routerHotels from "./Pages/hotels.js";
import routerRooms from "./Pages/rooms.js";
import routerUsers from "./Pages/users.js";

const app = express()

dotenv.config()

export const connect = async  () =>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("MongoDB Conectado")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("Desconectado", () =>{
    console.log("MongoDB desconectado")
})

mongoose.connection.on("conectado", () =>{
    console.log("MongoDB conectado")
})
app.use(cookieParser())
app.use(express.json())

app.use("/auth", router)
app.use("/hotels", routerHotels)
app.use("/rooms", routerRooms)
app.use("/users", routerUsers)

app.use((err, req, res, next) =>{
    const errorStatus = err.status || 500
    const errorMessage = err.message 

    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})






app.listen(8800, ()=>(
    connect(),
    console.log("Backend conectado")
))