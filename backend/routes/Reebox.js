const express = require('express')
const router = express.Router()
const reeboxController = require('../controllers/Reebox')
const passport = require('passport')

const authentication = passport.authenticate('jwt', {session: false})

router.get('/', authentication, reeboxController.getReebox)
router.get('/:id', authentication, reeboxController.getReeboxById)
router.post('/', authentication, reeboxController.createReebox)
router.put('/:id', authentication, reeboxController.updateReebox)
router.delete('/:id', authentication, reeboxController.deleteReebox)

module.exports = router