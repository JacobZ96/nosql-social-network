const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_db_name';

connect(connectionString);

module.exports = connection;