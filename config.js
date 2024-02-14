// config.js
// Configuration file for managing application settings

module.exports = {
    // Port number for the server, defaults to 3000 if not provided through environment variable
    port: process.env.PORT || 3000,
  
    // Secret key for JWT token generation and verification
    secretKey: 'stephen-secret-key',
  
    // Database configuration settings
    dbConfig: {
      // Hostname of the MySQL database server
      host: 'localhost',
  
      // Username for connecting to the MySQL database
      user: 'root',
  
      // Password for connecting to the MySQL database
      password: '',
  
      // Database name to connect to
      database: 'ISFE2tmshotel_reservationss'

    }
};