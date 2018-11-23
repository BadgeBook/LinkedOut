// ClearDB Database Setup
const mysql = require('mysql');

const db_config = {
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "b55be0f1d3c7ce",
    password: "525c8507",
    database: "heroku_cd62da7d23be6d3"
};

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
        "INSERT INTO user (username, password) VALUES(?, ?)",
        [user.username, user.password],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, {id: result.insertId});
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
            callback(null, {id: result[0].id});
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
            //TODO fix hardcoded badges array
            // result["badges"] = ["badge1", "badge2", "badge3"];
            callback(null, JSON.stringify(result));
        });

    db_connection.end();
}

function updateUser(user, callback) {
    let db_connection = mysql.createConnection(db_config);
    let db_query = "UPDATE user SET ";
    let db_query_values = [];

    if (user.user.fullname) {
        db_query = db_query.concat("fullname = ? ");
        db_query_values.push(user.user.fullname);
    }
    if (user.user.icon) {
        if (user.user.fullname) {
            db_query = db_query.concat(",");
        }
        db_query = db_query.concat("icon = ? ");
        db_query_values.push(user.user.icon);
    }
    if (user.user.description) {
        if (user.user.fullname || user.icon) {
            db_query = db_query.concat(",");
        }
        db_query = db_query.concat("description = ? ");
        db_query_values.push(user.user.description);
    }
    db_query = db_query.concat("WHERE id = ?");
    db_query_values.push(user.user.userId);

    db_connection.query(db_query, db_query_values,
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            if(result.changedRows === 0) {
                callback("Error: data was identical", null);
            } else if (result.changedRows === 1) {
                callback(null, "Success: user updated")
            }
        });

    db_connection.end();
}

function getApplications(res, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "SELECT *" +
        "      FROM application ",
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, JSON.stringify(result));
        });

    db_connection.end();
}

function getUserApplications(user, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "SELECT u.id AS user_id, " +
        "    u.username, a.APIurl, a.outgoingToken" +
        "     FROM user u " +
        "     JOIN application_user au ON u.id = au.user_id" +
        "     JOIN application a ON au.application_id = a.id" +
        "     WHERE u.id = ?",
        [user.userId],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, JSON.stringify(result));
        });

    db_connection.end();
}

module.exports = {
    search, signUp, login, getUser, updateUser, getApplications, getUserApplications
};