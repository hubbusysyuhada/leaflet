const jwt = require('jsonwebtoken')

function encoding (param) {
    return jwt.sign(param, process.env.JWT_KEY)
}

function decoding (token) {
    return jwt.verify(token, process.env.JWT_KEY)
}

function encodeConfirmationLink (param) {
    return jwt.sign(param, process.env.CONFIRMATION_LINK)
}

function decodeConfirmationLink (token) {
    return jwt.verify(token, process.env.CONFIRMATION_LINK)
}

module.exports = {
    encoding,
    decoding,
    encodeConfirmationLink,
    decodeConfirmationLink
}