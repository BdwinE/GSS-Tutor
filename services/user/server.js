require('dotenv').config();

const app = require('./app');
const db = require('./db');
const config = require('./config');

const port = 3002;

// Connect to database, then create app server
db.connect(config.MONGODB_URI).then(() => {
  app.listen(port, () => console.log(`User Service listening on port ${port}`));
});
