const {User} = require('../models')
const {validatePassword} = require('../helpers/bcrypt')
const {encoding} = require('../helpers/jwt')

class UserController {

    static loginPage (req, res, next) {
        res.render('Login')
    }
    
    static registerPage (req, res, next) {
        res.render('Register')
    }

    static login (req, res, next) {
        const {emailLogin: Email, passwordLogin: Password} = req.body
        User.findOne({where: {Email}})
        .then(data => {
            const check = validatePassword(Password, data.Password)
            if (data && check) {
                const access_token = encoding({id: data.id, Email: data.Email, Username: data.Username})
                req.session.currentSession = {access_token}
                res.status(200).redirect('/')
            } else {
                throw err
            }
        })
        .catch(err => {
            next({
                name: 'custom error',
                code: 400,
                message: 'Invalid email/password'
            })
        })
    }
    
    static async register (req, res, next) {
        try {
            const {Username, Password, Email} = req.body
            if (!Username || !Password || !Email) throw ({
                name: 'custom error',
                code: 400,
                message: 'All field are required'
            })
            const response = await User.create({Username, Password, Email})
            if (response) {
                res.status(201).redirect('/login')
            }
            else throw ({
                name: 'custom error',
                code: 500,
                message: 'internal server error'
            })
        } catch (err) {
            if (err.errors) next({
                name: 'custom error',
                code: 400,
                message: err.errors[0].message
            })
            else next(err)
        }
    }
    
    static logout (req, res, next) {
        req.session.destroy((err) => {
            if (err) console.log(err);
            else res.status(200).redirect('/login')
        })
    }
}

module.exports = UserController