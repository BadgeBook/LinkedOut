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
function search(query, callback) {
    let db_connection = mysql.createConnection(db_config);
    let words = query.toString().replace(/ /g, '|');

    db_connection.query(
        "SELECT * " +
        "      FROM user " +
        "     WHERE username REGEXP ?" +
        "        OR fullname REGEXP ?" +
        "        OR description REGEXP ?",
        [words, words, words],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, JSON.stringify(result));
        });

    db_connection.end();
}

// Test
// search("sql", function(err, res) {
//     if (err) {
//         console.log("error:", err);
//     } else {
//         console.log(res);
//     }
// });




function createUser(userName, password, fullName, icon, description, callback) {
    let db_connection = mysql.createConnection(db_config);
    let sql = "INSERT INTO user VALUES ('" +
        userName + "," +
        password + "," +
        fullName + "," +
        icon + "," +
        description + "')";

    db_connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        }
        callback(null, result);
    });

    db_connection.end();
}

module.exports = {
    search
};