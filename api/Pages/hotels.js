import express from "express"
import { deleteHotel, getAllHotel, getHotelById, hotelController, updateHotel } from "../controller/hotel.js"

const routerHotels = express.Router()
//Create
routerHotels.post("/", hotelController)
//Put
routerHotels.put("/:id", updateHotel)
//Delete
routerHotels.delete("/:id", deleteHotel)
//Get
routerHotels.get("/:id", getHotelById)

//Get All
routerHotels.get("/", getAllHotel)

export default routerHotels