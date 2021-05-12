const errorHandler = require('../middlewares/errorHandler')
const {authentication} = require('../middlewares/auth')
const UserController = require('../controllers/UserController')
const MainController = require('../controllers/MainController')
const router = require('express').Router()

router.get('/', MainController.homePage)

// user routes
router.get('/login', UserController.loginPage)
router.post('/login', UserController.login, errorHandler)
router.get('/logout', UserController.logout, errorHandler)
router.get('/register', UserController.registerPage, errorHandler)
router.post('/register', UserController.register, errorHandler)

// router.use(authentication)


// router.use(errorHandler)

module.exports = router