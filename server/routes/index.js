const errorHandler = require('../middlewares/errorHandler')
const {authentication} = require('../middlewares/auth')
const UserController = require('../controllers/UserController')
const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.send('Hello world from router')
})
// user routes
router.post('/login', UserController.login, errorHandler)
router.post('/register', UserController.register, errorHandler)

router.use(authentication)


router.use(errorHandler)

module.exports = router