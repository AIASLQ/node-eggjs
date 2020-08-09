/**
 *  全局定义
 * @param app
 * @description 对应一组生命周期钩子函数
 */

class AppBootHook {
    constructor(app) {
        this.app = app;
        app.root_path = __dirname;
    }

    configWillLoad() {
        console.log('configWillLoad')
            // Ready to call configDidLoad,
            // Config, plugin files are referred,
            // this is the last chance to modify the config.
    }

    configDidLoad() {
        console.log('configDidLoad')
            // Config, plugin files have been loaded.
            // router not register
    }

    async didLoad() {
        console.log('didLoad')
            // All files have loaded, start plugin here.
    }

    async willReady(param) {
        console.log('willReady')
    }

    async didReady() {
        // Worker is ready, can do some things
        // don't need to block the app boot.
        console.log('========Init Data=========')
        const ctx = await this.app.createAnonymousContext();
        const port = ctx.app.config.cluster ? ctx.app.config.cluster.listen.port : 7001
        console.warn(`服务已经启动，端口为${port}`)
        await ctx.model.User.remove();
        await ctx.service.user.create({
            mobile: '15567172267',
            password: '111111',
            realName: '孙立全',
        })
    }

    async serverDidReady() {
        console.log('serverDidReady')

    }

    async beforeClose() {
        console.log('beforeClose')
            // Do some thing before app close.
    }
}

module.exports = AppBootHook;