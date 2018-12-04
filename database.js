// ClearDB Database Setup
const mysql = require('mysql');
const crypto = require('crypto');

const secret = "webdev";
const db_config = {
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "b55be0f1d3c7ce",
    password: "525c8507",
    database: "heroku_cd62da7d23be6d3"
};

// SQL queries
function search(query, callback) {
    let db_connection = mysql.createConnection(db_config);
    let words = query.toString().split(' ');

    let db_query =
        "SELECT * \n" +
        "  FROM (SELECT * \n" +
        "          FROM user u \n" +
        "         WHERE u.username REGEXP '~' \n" +
        "            OR u.fullname REGEXP '~' \n" +
        "            OR u.description REGEXP '~' ) a\n";
    db_query = db_query.replace(/~/g, words[0]);

    for (let i = 1; i < words.length; i++) {
        let character = String.fromCharCode(97 + i);
        db_query = db_query +
            " INNER JOIN (SELECT *\n" +
            "               FROM user u\n" +
            "             HAVING u.username REGEXP '" + words[i] + "'\n" +
            "                 OR u.fullname REGEXP '" + words[i] + "'\n" +
            "                 OR u.description REGEXP '" + words[i] +
            "') " + character + "\n" +
            "    ON a.id = " + character + ".id";
    }

    db_connection.query(
        db_query,
        [],
        function (err, result) {
            if (err) {
                callback({errorMessage: err.sqlMessage}, null);
            } else {
                callback(null, JSON.stringify(result));
            }
        });

    db_connection.end();
}

function signUp(user, callback) {
    let db_connection = mysql.createConnection(db_config);

    user.password = crypto.createHmac('sha256', secret)
            .update(user.password).digest("hex");

    db_connection.query(
        "INSERT INTO user (username, password) VALUES(?, ?)",
        [user.username, user.password],
        function (err, res) {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    callback({errorMessage: "User already exists"}, null);
                } else
                callback({errorMessage: err.sqlMessage}, null);
            } else {
                callback(null, {id: res.insertId});
            }
        });

    db_connection.end();
}

function login(user, callback) {
    let db_connection = mysql.createConnection(db_config);

    user.password = crypto.createHmac('sha256', secret)
        .update(user.password).digest("hex");

    db_connection.query(
        "SELECT id " +
        "      FROM user " +
        "     WHERE username = ?" +
        "       AND password = ?",
        [user.username, user.password],
        function (err, result) {
            if (err) {
                callback({errorMessage: err}, null);
            } else
            if (!result[0]) {
                callback({errorMessage: "Your username or password is incorrect"}, null);
            } else {
                callback(null, {id: result[0].id});
            }
        });

    db_connection.end();
}

function getUser(user, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "SELECT * " +
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
            else if (!result[0]) {
                callback(null, null);
            } 
            else {
                callback(null, JSON.stringify(result));
            }
        });

    db_connection.end();
}

function getConversations(user, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "SELECT *" +
        "      FROM user u" +
        "     INNER JOIN (" +
    "                    (SELECT m.user_id_receiver" +
    "                       FROM messages m" +
    "                      WHERE m.user_id_sender = ?)" +
    "                 UNION" +
    "                    (SELECT m.user_id_sender" +
    "                       FROM messages m" +
    "                      WHERE m.user_id_receiver = ?)" +
    "                ) m" +
        "        ON u.id = m.user_id_receiver",
        [user.userId, user.userId],
        function (err, users) {
            if (err) {
                callback(err, null);
            }
            callback(null, JSON.stringify(users));
        });

    db_connection.end();
}

function getMessages(users, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "SELECT *" +
        "      FROM messages" +
        "     WHERE (? = user_id_sender AND ? = user_id_receiver)" +
        "        OR (? = user_id_receiver AND ? = user_id_sender)" +
        "     ORDER BY timestamp ASC",
        [users.user_id_sender, users.user_id_receiver, users.user_id_sender, users.user_id_receiver],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, JSON.stringify(result));
        });

    db_connection.end();
}

function sendMessage(message, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "INSERT INTO messages (user_id_sender, user_id_receiver, content, timestamp) VALUES(?, ?, ?, ?)",
        [message.user_id_sender, message.user_id_receiver, message.content, message.timestamp],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result.affectedRows);
        });

        db_connection.end();
}

function getApplicationUser(userApp, callback) {
    let db_connection = mysql.createConnection(db_config);
    db_connection.query(
        "SELECT id" +
        "      FROM application_user " +
        "      WHERE user_id = ?" +
        "        AND application_id = ?",
        [userApp.user, userApp.application],
        function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });

    db_connection.end();
}

function givePermission(userApp, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "INSERT INTO application_user (user_id, application_id) VALUES(?, ?)",
        [userApp.user, userApp.application],
        function (err, res) {
            if (err) {
                callback({errorMessage: err.sqlMessage}, null);
            } else {
                callback(null, {id: res.insertId});
            }
        });

    db_connection.end();
}

function getApplicationInfo(res, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "SELECT id, name, outgoingToken" +
        "      FROM application " +
        "      WHERE incomingToken = ?",
        [res.token],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, JSON.stringify(result));
        });

    db_connection.end();
}

function getUserInfo(res, callback) {
    let db_connection = mysql.createConnection(db_config);

    db_connection.query(
        "SELECT username" +
        "      FROM user " +
        "      WHERE id = ?",
        [res.userId],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });

    db_connection.end();
}

function getApplicationUser(userApp, callback) {
    let db_connection = mysql.createConnection(db_config);
    db_connection.query(
        "SELECT id " +
        "      FROM application_user" +
        "      WHERE user_id = ?" +
        "        AND application_id = ?",
        [userApp.user, userApp.application],
        function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });

    db_connection.end();
}

module.exports = {
    search, signUp, login,
    getUser, updateUser,
    getApplications, getUserApplications,
    getConversations, getMessages, sendMessage, 
    getApplicationUser, givePermission, getApplicationInfo, getUserInfo
};
