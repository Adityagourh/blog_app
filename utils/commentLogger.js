const { createLogger, transports, format } = require('winston')
require('winston-mongodb')

const commentLogger = createLogger({
    transports: [
        new transports.Console({
            level: "info",
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `level ${info.level}: ${info.timestamp} ${info.message}`)
            ),
        }),
        new transports.Console({
            level: "error",
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `level ${info.level}: ${info.timestamp} ${info.message}`)
            ),
        }),
        new transports.File({
            filename: 'logs/commentLog/commentLog.log',
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
            collection: 'commentLogs',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = commentLogger
