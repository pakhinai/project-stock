const express = require('express')
const router = express.Router()
const pumaController = require('../controllers/Puma')
const passport = require('passport')

const authentication = passport.authenticate('jwt', {session: false})

router.get('/', authentication, pumaController.getPuma)
router.get('/:id', authentication, pumaController.getPumaById)
router.post('/', authentication, pumaController.createPuma)
router.put('/:id', authentication, pumaController.updatePuma)
router.delete('/:id', authentication, pumaController.deletePuma)

module.exports = router