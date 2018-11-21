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

function signUp(user, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "INSERT INTO user " +
        "(username, password, fullname, description) " +
        "VALUES(?, ?, ?, ?)",
        [user.username, user.password, user.fullname, user.description],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result.insertId);
        });

    db_connection.end();
}

function login(user, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "SELECT id " +
        "      FROM user " +
        "     WHERE username = ?" +
        "       AND password = ?",
        [user.username, user.password],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result.id);
        });

    db_connection.end();
}

function getUser(user, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "SELECT fullname, icon, description " +
        "      FROM user " +
        "     WHERE id = ?",
        [user.userId],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, JSON.stringify(result));
        });

    db_connection.end();
}

function updateUser(user, callback) {
    let db_connection = mysql.createConnection(db_config);
    let db_query = "UPDATE user SET ";
    let db_query_values = [];

    if (user.fullname) {
        db_query = db_query.concat("fullname = ? ");
        db_query_values.push(user.fullname);
    }
    if (user.icon) {
        if (user.fullname) {
            db_query = db_query.concat(",");
        }
        db_query = db_query.concat("icon = ? ");
        db_query_values.push(user.icon);
    }
    if (user.description) {
        if (user.fullname || user.icon) {
            db_query = db_query.concat(",");
        }
        db_query = db_query.concat("description = ? ");
        db_query_values.push(user.description);
    }
    db_query = db_query.concat("WHERE id = ?");
    db_query_values.push(user.userId);

    db_connection.query(db_query, db_query_values,
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            if(result.changedRows === 0) {
                callback("Error: data was identical", null);
            } else if (result.changedRows === 1) {
                getUser(user, function(err, user) {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(null, user)
                    }
                });
            }
        });

    db_connection.end();
}

module.exports = {
    search, signUp, login, getUser, updateUser
};