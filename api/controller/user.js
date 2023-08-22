import User from "../models/User.js"


export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send(updatedUser)

    } catch (error) {
        next(error)
    }
}


export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send("Usuário deletado com sucesso")

    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const getUserById = await User.findById(req.params.id)
        res.status(200).send(getUserById)

    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async (req, res, next) =>{
    try {
        const getAllUsers =  await User.find()
        res.status(200).send(getAllUsers)
    
    } catch (error) {
        next(error)
    }
}