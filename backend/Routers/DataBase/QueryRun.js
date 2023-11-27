// Import the required libraries
const mysql = require('mysql2');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Kartik@1507',
  database: 'Project'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to run a query and return the result as an object
async function queryRunner(queryString) {
  try {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query(queryString);
    return { rows, fields };
  } catch (error) {
    throw error;
  }
}

// Function to execute a stored procedure or function
async function queryExecute(procedureName, params) {
  try {
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.execute(`CALL ${procedureName}(${params.map(() => '?').join(', ')})`, params);
    return { rows, fields };
  } catch (error) {
    throw error;
  }
}
function generateString(prefix, length) {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    if (typeof prefix !== 'string' || prefix.length !== 2) {
      throw new Error('Prefix should be a string of length 2');
    }
  
    if (typeof length !== 'number' || length < 3) {
      throw new Error('Length should be a number greater than or equal to 3');
    }
  
    let randomString = prefix;
  
    for (let i = 0; i < length - 2; i++) {
      const randomIndex = Math.floor(Math.random() * randomChars.length);
      randomString += randomChars.charAt(randomIndex);
    }
  
    return randomString;
  }
  
// Export the queryRunner and queryExecute functions
module.exports = { queryRunner, queryExecute,generateString };
