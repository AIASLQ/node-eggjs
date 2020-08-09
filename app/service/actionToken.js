const { Service } = require('egg')

class ActionTokenService extends Service {
    async apply(_id) {
        const { ctx } = this
        console.log(ctx.app)
        const a = ctx.app.jwt.sign({
            data: {
                _id: _id
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 7)
        }, ctx.app.config.jwt.secret)
        return a
    }
}
module.exports = ActionTokenService