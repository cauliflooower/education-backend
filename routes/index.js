const { Router } = require("express");
const router = new Router()
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const messageRouter = require('./messageRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/category', categoryRouter)
router.use('/message', messageRouter)


module.exports = router