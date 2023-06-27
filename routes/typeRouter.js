const { Router } = require("express");
const { create, getAll, deleteOne, updateOne } = require("../controllers/typeController");
const checkRole = require("../middleware/checkRoleMiddleware");
const router = new Router()

router.post('/', checkRole('ADMIN'), create)
router.get('/', getAll)
router.delete('/:id', deleteOne)
router.put('/:id', updateOne)


module.exports = router


