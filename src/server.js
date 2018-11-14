const express = require('express');

const app = express();

app.get('/users', (req, res, next) => {
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

app.listen(process.env.PORT || 4000, () => {
    console.log('Listening on port 4000');
});