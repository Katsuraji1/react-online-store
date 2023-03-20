const Router = require('express')
const router = new Router()
const brandRoute = require('./brandRoute')
const deviceRoute = require('./deviceRoute')
const typeRoute = require('./typeRoute')
const userRoute = require('./userRoute')


router.use('/type', typeRoute)
router.use('/brand', brandRoute)
router.use('/device', deviceRoute)
router.use('/user', userRoute)

module.exports = router