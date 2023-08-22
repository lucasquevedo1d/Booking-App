import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createRoom = async (req, res, next) =>{
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push:{rooms:savedRoom._id},
            })
        } catch (error) {
         next(error)   
    }
    res.status(201).json(savedRoom)

    } catch (error) {
        next(error)
    }
}


export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send(updatedRooms)

    } catch (error) {
        next(error)
    }
}


export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull:{rooms:req.params.id},
            })
        } catch (error) {
         next(error)   
    }
        res.status(200).send("Quarto de hotel deletado com sucesso")

    } catch (error) {
        next(error)
    }
}

export const getRoomById = async (req, res, next) => {
    try {
        const getRoom = await Room.findById(req.params.id)
        res.status(200).send(getRoom)

    } catch (error) {
        next(error)
    }
}

export const getAllRooms = async (req, res, next) =>{
    try {
        const getAllRooms =  await Room.find()
        res.status(200).send(getAllRooms)
    
    } catch (error) {
        next(error)
    }
}