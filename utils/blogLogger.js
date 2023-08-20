const { createLogger, transports, format } = require('winston')
require('winston-mongodb')

const blogLogger = createLogger({
    transports: [
        new transports.Console({
            level: "info",
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `level ${info.level}: ${info.timestamp} ${info.message}`)
            ),}),
        new transports.Console({
            level: "error",
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(error => `level ${error.level}: ${error.timestamp} ${error.message}`)
            ),}),
        new transports.File({
            filename: 'logs/blogLog/blogLog.log',
            level: "info",
            maxsize: 5242880,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `level ${info.level}: ${info.timestamp} ${info.message}`)
            ),
        }),
        new transports.MongoDB({
            level: "info",
            db: process.env.URL,
            options: {
                useUnifedTopology: true,
            },
            collection: 'blogLogs',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = blogLogger
