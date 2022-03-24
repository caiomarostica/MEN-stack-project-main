const userSchema = require('../models/userSchema')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Mongoose } = require('mongoose')

const SECRET = process.env.SECRET

const getAll = async (req, res) => {
    const authHeader = req.get('authorization')
    const token = authHeader.split('')[1];

    if (!token) {
        return res.status(401).send("Erro no Header")
    }

    jwt.verify(token, SECRET, (err) => {
        if(err) {
            return res.status(401).send("Não autorizado")
        }
    })

    UserSchema.find(function (err, users){
        if(err) {
            res.status(500).send({ message: err.message })
        }
        res.status(200).send(users)
    })


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
        const newUser = new UserSchema({
        _id: new Mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        createdAt: new Date()
        })
        
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

module.exports = { getAll, createUser }