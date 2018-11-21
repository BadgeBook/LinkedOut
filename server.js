const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');


const app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(cors({credentials: true, origin: true}));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/users', (req, res, next) => {
    return res.json([{
        firstname: "name1",
        lastname: "lname",
        picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        badges: ["badge1", "badge2", "badge3"],
        description: "Description of user 1",
    },
    {
        firstname: "name2",
        lastname: "lname",
        picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        badges: ["badge1", "badge2", "badge3"],
        description: "Description of user 2",
    },
    {
        firstname: "name3",
        lastname: "lname",
        picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        badges: ["badge1", "badge2", "badge3"],
        description: "Description of user 3",
    }]);
});

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
    db.login(req.body, function(err, userID) {
        if (err) {
            res.send(err);
        } else {
            res.send(userID)
        }
    });
});

app.listen(process.env.PORT || 4000, () => {
    console.log('Listening on port 4000');
});