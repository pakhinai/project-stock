const express = require("express")
const router = express.Router()
const userController = require("../controllers/User")

router.get("/",userController.getUser)
router.post("/login",userController.loginUser)
router.post("/register", userController.registerUser)
router.delete("/:id",userController.deleteUser)

module.exports = router