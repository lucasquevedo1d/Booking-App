import User from "../models/User.js"
import bcrypt from "bcryptjs"
import Jwt  from "jsonwebtoken"
import { createError } from "../utils/error.js"

export const register = async (req, res, next) =>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    try {
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })

        await newUser.save()
        res.status(201).send("Usuário criado com sucesso!")
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) =>{
    try {
       const user = await User.findOne({username: req.body.username})
       if(!user){
        return next(createError(404, "Usuário não encotrado"))
       }

       const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
       if(!isPasswordCorrect){
        return next(createError(404, "Senha incorreta"))
       }

       const token = Jwt.sign(
        {id: user.id, isAdmin:user.isAdmin}, 
        process.env.JWT)

       const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json({otherDetails})
    } catch (error) {
        next(error)
    }
}