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

function signup(user_info, callback) {
    let db_connection = mysql.createConnection(db_config);
    let user = JSON.stringify(user_info);

    db_connection.query(
        "INSERT INTO user VALUES('" +
        "    ?," +
        "    ?," +
        "    NULL," +
        "    ?')",
        [user.username, user.password, user.fullname, user.description],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });

    db_connection.end();
}

function login(user_info, callback) {
    let db_connection = mysql.createConnection(db_config);
    let user = JSON.stringify(user_info);

    db_connection.query(
        "SELECT * " +
        "      FROM user " +
        "     WHERE username == ?" +
        "       AND password == ?",
        [user[0], user[1]],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, JSON.stringify(result));
        });

    db_connection.end();
}

// test query
let test_user = {
    username:"not_alex",
    password:"fish",
    fullname:"alex hsu",
    description:"i like delphi"
};

signup(test_user,function(err, res) {
    if (err) {
        console.log("error:", err);
    } else {
        console.log(res);
    }
});

module.exports = {
    search, signup, login
};