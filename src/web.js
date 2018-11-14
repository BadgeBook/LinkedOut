// ClearDB Database Setup
let mysql = require('mysql');
let db_config = {
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "b55be0f1d3c7ce",
    password: "525c8507",
    database: "heroku_cd62da7d23be6d3"
};

function testConnection() {
    let db_connection = mysql.createConnection(db_config);

    db_connection.connect(function(err) {
        if (err) {
            console.log("Error occurred while trying to connect to database");
            throw err
        }
        console.log("Connected to database");
    });

    db_connection.end();
}

// SQL queries
function setupDatabase() {
    let db_connection = mysql.createConnection(db_config);
    let sql = "CREATE DATABASE linkedout";

    db_connection.query(sql, function (err, result) {
        if (err) {
            console.log("Error occurred while trying to create a database");
            throw err
        }
        console.log("Created database");
    });

    sql = "CREATE TABLE users" +
        "(userid   VARCHAR(10)" +
        ",username VARCHAR(255)" +
        ",password VARCHAR(255))";

    db_connection.query(sql, function (err, result) {
        if (err) {
            console.log("Error occurred while trying to create a table");
            throw err
        }
        console.log("Created table");
    });

    db_connection.end();
}

function createUser(userName) {
    let db_connection = mysql.createConnection(db_config);
    let sql = "INSERT INTO db (username) VALUES ('" + userName + "')";

    db_connection.query(sql, function (err, result) {
        if (err) {
            console.log("Error occurred while trying to create a user");
            throw err
        }
        console.log("Created user");
    });

    db_connection.end();
}

function findUser(userName) {
    let db_connection = mysql.createConnection(db_config);
    let sql = "SELECT * FROM db WHERE username =" + userName;

    db_connection.query(sql, function (err, result) {
        if (err) {
            console.log("Error occurred while trying to find a user");
            throw err
        }
        console.log("Found user");
    });

    db_connection.end();
}