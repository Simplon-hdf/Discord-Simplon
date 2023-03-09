import winston, {createLogger, transports, format} from 'winston';
import chalk from 'chalk';


const consoleFormat = winston.format.combine(
  winston.format.colorize(
    {
      colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
      }
    }
  ),
  winston.format.prettyPrint(),
  winston.format.timestamp(),
  winston.format.printf(info => {
    return `[${info.level}] ${info.message}`;
  }),
);

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      filename: 'logs.log',
      format: fileFormat,
    }),
  ],
});
export default logger;