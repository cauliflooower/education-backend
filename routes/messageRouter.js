const { Router } = require("express");
const { create, getAll, deleteOne } = require("../controllers/messageController");
// const checkRole = require("../middleware/checkRoleMiddleware");
const router = new Router()

router.post('/', create)
router.get('/', getAll)
router.delete('/:id', deleteOne)

module.exports = router