const {decoding} = require('../helpers/jwt')

class MainController {

    static homePage (req, res, next) {
        if (!req.session.currentSession) res.status(401).redirect('/login')
        else {
            const decoded = decoding(req.session.currentSession.access_token)
            res.render('Home', {name: decoded.Username})
        }
    }
}

module.exports = MainController