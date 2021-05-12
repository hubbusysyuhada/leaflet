const {decoding} = require('../helpers/jwt')

function authentication (req, res, next) {
    const token = req.headers.access_token
    if (token) {
        req.loggedUser = decoding(token)
        next()
    } else {
        next({
            name: 'custom error',
            code: 403,
            message: 'forbidden'
        })
    }
}

function authorization (req, res, next) {
    try {
        const token = req.headers.access_token
        if (!token) throw new Error()
        const decoded = decoding(token)
        const {loggedUser} = req
        if (decoded.id === loggedUser.id) next()
        else throw new Error()
    } catch (error) {
        next({
            name: 'custom error',
            code: 401,
            message: 'unauthorized'
        })
    }
}

module.exports = {
    authentication,
    authorization
}