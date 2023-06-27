const { Router } = require("express");
const { registration, login, check, getOne } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router()

router.post('/registration', registration)
router.post('/login', login)
router.get('/:email', getOne)
router.get('/auth', authMiddleware, check)


module.exports = router


