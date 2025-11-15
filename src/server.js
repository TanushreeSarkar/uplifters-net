require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./config/logger');
const bootstrapAdmin = require('./utils/bootstrapAdmin');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await bootstrapAdmin();

    const server = http.createServer(app);
    server.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

