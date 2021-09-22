const express =require('express')
const router = express.Router()
const adminController = require('../controllers/Admin')

router.get("/", adminController.getAdmin)
router.post('/', adminController.createAdmin)
router.delete('/:id', adminController.deleteAdmin)
router.post('/login', adminController.loginAdmin)
module.exports = router