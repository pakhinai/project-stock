const adminService = require('../services/Admin')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getAdmin = async (req, res) => {
    const result = await adminService.findAdmin()
    res.status(200).send(result)
}

const createAdmin = async (req, res) => {
    const result =await adminService.createAdmin(req.body)
    if(result) {
        res.status(400).send({message: "User has been created"})
    } else {
        res.status(201).send({message: "User created successfully"})
    }
}

const deleteAdmin = async (req, res) => {
    const result = await adminService.deleteAdmin(req.params.id)
    if(result) {
        res.status(204).send()
    } else {
        res.status(404).send(null)
    }
}

const loginAdmin = async (req, res) => {
    const result = await adminService.loginAdmin(req.body)
    if( result) {
        const checkPassword = bcrypt.compareSync(req.body.password, result.password)
        if(checkPassword) {
            const payload = {
                id: result.id,
                username: result.username
            }
            const secretKey = process.env.SECRET_OR_KEY
            const token = jwt.sign(payload, secretKey, {expiresIn: 3600})
            res.status(200).send({token: token, message: "Login suscessfully"})
        } else {
            res.status(400).send({message: "Password is wrong"})
        }
    } else {
        res.status(400).send({message: "Username is wrong"})
    }
}

module.exports = {
    getAdmin,
    createAdmin,
    deleteAdmin,
    loginAdmin
}