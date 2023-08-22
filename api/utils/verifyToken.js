import Jwt  from "jsonwebtoken";
import { createError } from "./error.js";
export const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token

    if(!token){
        return next(createError(404, "Usuário não autorizado"))
    }

    Jwt.verify(token, process.env.JWT, (error, user)=>{
        if(error){
            return next(createError(403,"Token invalido"))
        }

        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
           if(error) return next(createError(404, "Usuário não encotrado"))
        }
    })
}

export const verifyAdmin = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(404, "Usuário não autorizado"))
        }
    })
}