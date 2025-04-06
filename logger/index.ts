const pino = require('pino')
export const logger = pino({
  level: 'debug',
  timestamp: pino.stdTimeFunctions.isoTime
})
