/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     */
    const config = exports = {};
    config.cluster = {
        listen: {
            path: "",
            port: 8019,
            hostname: "0.0.0.0",
        },
    };

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1596796773079_7558';

    // add your middleware config here
    config.middleware = ['errorHandler'];
    config.onerror = {
        all(err, ctx) {
            // 所有的异常都在 app 上触发⼀一个 error 事件，框架会记录⼀一条错误⽇日志 
            ctx.app.emit('error', err, this)
            const status = err.status || 500;
            // ⽣生产环境时 500 错误的详细错误内容不不返回给客户端，因为可能包含敏敏感信息 
            const error = status === 500 && ctx.app.config.env === 'prod' ?
                'Internal Server Error' : err.message
                // 从 error 对象上读出各个属性，设置到响应中 
            ctx.body = {
                code: status, // 服务端⾃自身的处理理逻辑错误(包含框架错误500 及 ⾃自定义业务逻辑错误 533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不不同的状态码
                error: error
            }
            if (status === 422) {
                ctx.body.detail = err.errors
            }
            ctx.status = 200
        }
    };

    // 路由自动注册 && 接口文档
    config.swaggerdoc = {
        dirScanner: './app/controller',
        apiInfo: {
            title: '自学接口 使用swagger doc',
            description: '自学接口swagger-ui for egg',
            version: '1.0.0',
        },
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        enableSecurity: false,
        // enableValidate: true,
        routerMap: true, //路由自动注册
        enable: true,
    };

    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/test',
        options: {
            // useMongoClient: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            bufferMaxEntries: 0,
        }
    };

    config.jwt = {
        secret: 'Sun-qan-J',
        enable: true,
        match: /^\/api/
    }

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};