const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')

router.post('/', categoryController.create)
router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.delete('/:id', categoryController.deleteOne)
router.put('/:id', categoryController.updateOne)

module.exports = router