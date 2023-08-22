import Hotel from "../models/Hotel.js"

export const hotelController = async (req, res, next) => {

    const newHotel = new Hotel(req.body)
    try {
        const savetHotel = await newHotel.save()
        res.status(201).send(savetHotel)

    } catch (error) {
        next(error)
    }

}


export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send(updatedHotel)

    } catch (error) {
        next(error)
    }
}


export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).send("Hotel deletado com sucesso")

    } catch (error) {
        next(error)
    }
}

export const getHotelById = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id)
        res.status(200).send(getHotel)

    } catch (error) {
        next(error)
    }
}

export const getAllHotel = async (req, res, next) =>{
    try {
        const getAllHotel =  await Hotel.find()
        res.status(200).send(getAllHotel)
    
    } catch (error) {
        next(error)
    }
}