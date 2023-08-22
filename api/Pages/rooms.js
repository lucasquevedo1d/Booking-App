import express from "express"
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from "../controller/rooms.js"
import { verifyAdmin } from "../utils/verifyToken.js"


const routerRooms = express.Router()

//Create
routerRooms.post("/:hotelId", verifyAdmin, createRoom)
//Put
routerRooms.put("/:id", verifyAdmin, updateRoom)
//Delete
routerRooms.delete("/:id/:hotelId", verifyAdmin, deleteRoom)
//Get
routerRooms.get("/:id", getRoomById)

//Get All
routerRooms.get("/",getAllRooms)

export default routerRooms