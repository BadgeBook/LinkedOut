// ClearDB Database Setup
const mysql = require('mysql');

const db_config = {
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
//TODO implement asyc into database calls
function createUser(firstName, lastName, picture, badges, description) {
    let db_connection = mysql.createConnection(db_config);
    let sql = "INSERT INTO user VALUES ('" +
        firstName + "," +
        lastName + "," +
        picture + "," +
        badges + "," +
        description + "')";

    db_connection.query(sql, function (err, result) {
        if (err) {
            console.log("Error occurred while trying to create a user");
            throw err
        }
        console.log("Created user");
    });

    db_connection.end();
}

function findUser(userName, callback) {
    let db_connection = mysql.createConnection(db_config);

    let sqlQuery = "SELECT * FROM user WHERE firstname = '" + userName + "'";

    db_connection.query(sqlQuery, (err, rows, fields) => {
        if (err) {
            callback(err, null);
        }

        callback(null, rows);
    });

    db_connection.end();
}

// Test calling the values
findUser("name1", function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});