const app = require('./src/app');
const connectDB = require('./src/config/database');
const config = require('./src/config/server');

// Connect to database
connectDB();

const server = app.listen(config.port, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});

// Handle un