const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
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
    db.signUp(req.body, function(err, result) {
        if (err) {
            res.send(err);
            console.log("err");
        } else {
            res.send(result)
        }
    });
});

app.post('/api/login', (req, res, next) => {
    db.login(req.body, function(err, userId) {
        if (err) {
            console.log("err");
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
        } else {
            user = JSON.parse(user)
            axiosUsers = []

            for(i=0; i<user.length; i++) {
                axiosUsers[i] = axios.post(String(user[i].APIurl), {
                    userid: String(user[i].username),
                    apptoken: String(user[i].outgoingToken)
                  })
            }

            axios.all(axiosUsers)
                .then(axios.spread((...results) => {
                    elements = []
                    results.map((element) => {
                        elements.push(element.data)
                    });
                    console.log(elements)
                    res.send(elements)
                }))
                .catch((err) => {
                    console.log(err);
            });
        }
    });
})

app.listen(process.env.PORT || 4000, () => {
    console.log('Listening on port 4000');
});