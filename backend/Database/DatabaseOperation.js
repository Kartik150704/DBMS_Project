const mysql = require('mysql2');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Kartik@1507',
            database: 'Project',
        });
    }

    initialize() {
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to the database: ' + err.message);
                return;
            }
            console.log('Connected to the database');
        });
    }

    createTable(tableInfo) {
        const { tableName, fields } = tableInfo;

        if (!tableName || !fields) {
            console.error('Table name and fields are required.');
            return;
        }


        const createTableQuery = `CREATE TABLE ${tableName} (${fields})`;


        this.connection.query(createTableQuery, (err) => {
            if (err) {
                console.error('Error creating the table: ' + err.message);
            } else {
                console.log(`Table "${tableName}" created successfully.`);
            }
        });
    }
    deleteTable(tableName) {
        if (!tableName) {
            console.error('Table name is required.');
            return;
        }


        const deleteTableQuery = `DROP TABLE ${tableName}`;


        this.connection.query(deleteTableQuery, (err) => {
            if (err) {
                console.error('Error deleting the table: ' + err.message);
            } else {
                console.log(`Table "${tableName}" has been deleted.`);
            }
        });
    }
    insertData(tableName, data) {
        if (!tableName || !data) {
            console.error('Table name and data object are required.');
            return;
        }


        const insertQuery = `INSERT INTO ${tableName} SET ?`;

        this.connection.query(insertQuery, data, (err, results) => {
            if (err) {
                console.error('Error inserting data: ' + err.message);
            } else {
                console.log('Data inserted successfully.');
            }
        });
    }
    readTable(tableName, condition) {
        if (!tableName) {
            console.error('Table name is required.');
            return Promise.reject('Table name is required.');
        }


        let selectQuery = `SELECT * FROM ${tableName}`;
        if (condition) {
            selectQuery += ` WHERE ${condition}`;
        }


        return new Promise((resolve, reject) => {
            this.connection.query(selectQuery, (err, results) => {
                if (err) {
                    console.error('Error reading from the table: ' + err.message);
                    reject(err);
                } else {
                    console.log('Query results:', results);
                    resolve(results);
                }
            });
        });
    }
    addColumnToTable(tableName, columnName, columnType) {
        if (!tableName || !columnName || !columnType) {
            console.error('Table name, column name, and column type are required.');
            return;
        }


        const addColumnQuery = `ALTER TABLE ${tableName} ADD ${columnName} ${columnType}`;


        this.connection.query(addColumnQuery, (err) => {
            if (err) {
                console.error('Error adding a column to the table: ' + err.message);
            } else {
                console.log(`Column "${columnName}" added to table "${tableName}".`);
            }
        });
    }


    updateColumnName(tableName, oldColumnName, newColumnName) {
        if (!tableName || !oldColumnName || !newColumnName) {
            console.error('Table name, old column name, and new column name are required.');
            return;
        }


        const updateColumnQuery = `ALTER TABLE ${tableName} CHANGE ${oldColumnName} ${newColumnName}`;


        this.connection.query(updateColumnQuery, (err) => {
            if (err) {
                console.error('Error updating the column name: ' + err.message);
            } else {
                console.log(`Column "${oldColumnName}" renamed to "${newColumnName}" in table "${tableName}".`);
            }
        });
    }


    deleteColumn(tableName, columnName) {
        if (!tableName || !columnName) {
            console.error('Table name and column name are required.');
            return;
        }


        const deleteColumnQuery = `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`;


        this.connection.query(deleteColumnQuery, (err) => {
            if (err) {
                console.error('Error deleting the column: ' + err.message);
            } else {
                console.log(`Column "${columnName}" deleted from table "${tableName}".`);
            }
        });
    }

    generalQuery(query) {
        if (!query) {
            console.error('SQL query is required.');
            return;
        }

       
        this.connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing the SQL query: ' + err.message);
            } else {
                console.log('Query results:', results);
            }
        });
    }
}


module.exports=Database