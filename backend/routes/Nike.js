const express = require('express');
const router = express.Router()
const nikeController = require('../controllers/Nike')
const passport = require('passport')

const authentication = passport.authenticate('jwt', {session: false})

router.get('/', authentication, nikeController.getNike)
router.get('/:id', authentication, nikeController.getNikeById)
router.post('/', authentication, nikeController.createNike)
router.put('/:id', authentication, nikeController.updateNike)
router.delete('/:id', authentication, nikeController.deleteNike)

module.exports = router
