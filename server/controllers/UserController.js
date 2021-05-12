const {User} = require('../models')
const {validatePassword} = require('../helpers/bcrypt')
const {encoding} = require('../helpers/jwt')

class UserController {
    static login (req, res, next) {
        const {Email, Password} = req.body
        User.findOne({where: {Email}})
        .then(data => {
            const check = validatePassword(Password, data.Password)
            if (data && check) {
                const access_token = encoding({id: data.id, Email: data.Email, Username: data.Username})
                res.status(200).json({access_token})
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
                res.status(201).json({
                    Username: Username,
                    Email: Email,
                    Message: 'Register Success'
                })
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
}

module.exports = UserController