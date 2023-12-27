const {User} = require('../../../models/user')
const jwt = require('jsonwebtoken')
const config = require('config')



describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const user = new User({isAdmin: true})
        const token = user.generateAuthToken()
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        expect(decoded).toMatchObject({ isAdmin: true})
    })
})