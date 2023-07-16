import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';
let server: Server;
process.on('uncaughtException', err => {
  errorLogger.error(err);
  process.exit(1);
});
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error(`Failed to connect database`, err);
  }
  process.on('unhandledRejection', err => {
    errorLogger.error(err);
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();

//sigterm
process.on('SIGTERM', () => {
  logger.info('SIGTERM is receive');
  if (server) {
    server.close();
  }
});
