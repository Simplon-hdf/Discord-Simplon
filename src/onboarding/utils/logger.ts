import pino from 'pino';
import  prettify from 'pino-pretty';

export default pino(
  {
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  }
);
