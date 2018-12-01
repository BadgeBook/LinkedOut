const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: true}));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.post('/api/search', (req, res, next) => {
    db.search(req.body.search, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data)
        }
    });
});

app.post('/api/signUp', (req, res, next) => {
    db.signUp(req.body, function(err, userId) {
        if (err) {
            res.send(err);
        } else {
            res.send(userId)
        }
    });
});

app.post('/api/login', (req, res, next) => {
    db.login(req.body, function(err, userId) {
        if (err) {
            res.send(err);
        } else {
            res.send(userId)
        }
    });
});

app.post('/api/getUser', (req, res, next) => {
    db.getUser(req.body, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.send(user)
        }
    });
});

app.post('/api/updateUser', (req, res, next) => {
    db.updateUser(req.body, function(err, success) {
        if (err) {
            res.send(err);
        } else {
            res.send(success)
        }
    });
});

app.post('/api/getApplications', (req, res, next) => {
    db.getApplications(req.body, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data)
        }
    });
});

app.post('/api/getUserBadges', (req, res, next) => {
    db.getUserApplications(req.body, function(err, user) {
        if (err) {
            res.send(err);
        } 
        else if (user) {
            user = JSON.parse(user);
            axiosUsers = [];

            for(i=0; i<user.length; i++) {
                axiosUsers[i] = axios.post(String(user[i].APIurl), {
                    userid: String(user[i].username),
                    apptoken: String(user[i].outgoingToken)
                  })
            }

            axios.all(axiosUsers)
                .then(axios.spread((...results) => {
                    elements = [];
                    results.map((element) => {
                        elements.push(element.data)
                    });
                    console.log(elements);
                    res.send(elements)
                }))
                .catch((err) => {
                    console.log(err);
            });
        }
        else {
            res.send([])
        }
    });
});

app.post('/api/getConversations', (req, res, next) => {
    db.getConversations(req.body, function(err, users) {
        if (err) {
            res.send(err);
        } else {
            res.send(users)
        }
    });
});

app.post('/api/getMessages', (req, res, next) => {
    db.getMessages(req.body, function(err, messages) {
        if (err) {
            res.send(err);
        } else {
            res.send(messages)
        }
    });
});

app.post('/api/sendMessage', (req, res, next) => {
    db.sendMessage(req.body, function(err, success) {
        if (err) {
            res.send(err);
        } else {
            res.send(success)
        }
    });
});

app.post('/api/getApplicationUser', (req, res, next) => {
    db.getApplicationUser(req.body, function(err, success) {
        if (err) {
            res.send(err);
        } else {
            res.send(success)
        }
    });
});

app.post('/api/givePermission', (req, res, next) => {
    db.givePermission(req.body, function(err, userApp) {
        if (err) {
            res.send(err);
        } else {
            res.send(userApp);
        }
    });
});

app.post('/api/getApplicationInfo', (req, res, next) => {
    db.getApplicationInfo(req.body, function(err, application) {
        if (err) {
            res.send(err);
        } else {
            res.send(application)
        }
    });
});

app.post('/api/getApplicationUser', (req, res, next) => {
    db.getApplicationUser(req.body, function(err, userApp) {
        if (err) {
            res.send(err);
        } else {
            res.send(userApp)
        }
    });
});

app.post('/api/redirectExternalApp', (req, res, next) => {
    axios.post(req.body.URL, {
        userid: req.body.userid,
        apptoken: req.body.apptoken
    })
});

app.listen(process.env.PORT || 4000, () => {
    console.log('Listening on port 4000');
});