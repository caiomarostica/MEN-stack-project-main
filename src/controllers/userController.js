const userSchema = require('../models/userSchema')
const mongoose = require("mongoose")

const getAll = async (req, res) => {
    try {
        const user = await userSchema.find()
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

const createUser = async (req, res) => {
    try {
        const newUser = new UserSchema(req.body)

        const savedUser = await newUser.save()

        res.status(200).json({
            message: "User adicionado com sucesso!",
            savedUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getAll,
    createUser
}