// import and config dotenv for .env variables
const dotenv = require('dotenv');
dotenv.config();

// import server class and initialize a new object of this class
const Server = require('./src/models/server');
const server = new Server();

// open server
server.listen();