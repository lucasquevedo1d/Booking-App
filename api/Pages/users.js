import express from "express"
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controller/user.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"

const routerUsers = express.Router()

//Put
routerUsers.put("/:id", verifyUser, updateUser)
//Delete
routerUsers.delete("/:id", verifyUser, deleteUser)
//Get
routerUsers.get("/:id", verifyUser, getUserById)
//Get All
routerUsers.get("/", verifyAdmin, getAllUsers)

export default routerUsers