const express = require('express')
const router = express.Router()
const adidasController = require('../controllers/Adidas')
const passport = require('passport')

const authentication = passport.authenticate('jwt', {session: false})

router.get('/', authentication, adidasController.getAdidas)
router.get('/:id', authentication, adidasController.getAdidasById)
router.post('/', authentication, adidasController.createAdidas)
router.put('/:id', authentication, adidasController.updateAdidas)
router.delete('/:id', authentication, adidasController.deleteAdidas)

module.exports = router