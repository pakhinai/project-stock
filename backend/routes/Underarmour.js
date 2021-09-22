const express = require('express')
const router = express.Router()
const underarmourController = require("../controllers/Underarmour")
const passport = require('passport')

const authentication = passport.authenticate('jwt', {session: false})

router.get("/", authentication, underarmourController.getUnderarmour)
router.post("/", authentication, underarmourController.createUnderarmour)
router.put("/:id", authentication, underarmourController.updateUnderarmour)
router.delete("/:id", authentication, underarmourController.deleteUnderarmour)

module.exports = router