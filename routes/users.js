const express = require('express');
const path = require('path');
const route = express.Router();
const bodyParser = require('body-parser')
const passportJWT = require("passport-jwt");;
const jwt = require('jsonwebtoken');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const data = require('../models/data');

route.use(bodyParser.json());
route.use(bodyParser.urlencoded());

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'icanauthenticatestuff';


// route.get('*', (request, response) => {
//   response.sendFile(path.join(__dirname+'/client/build/index.html'));
// });
//does not need api
// route.get('/login', function (request, response) {
//     response.sendFile(__dirname + "/public/login.html");
// });

// // does not need /api
// route.get('/signup', function (request, response) {
//     return response.json({message: "Working!"})
// });

route.post('/api/signup', async function (request, response) {
    if (request.body.email && request.body.password && request.body.userName) {
        var user = await data.users.find({ email: request.body.email });
        if (!user[0]) {
            var newUser = await data.users.create({
                userName: request.body.userName,
                email: request.body.email,
                password: request.body.password
            });
            var payload = { id: newUser._id, name: newUser.userName };
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            return response.json({ message: "ok", token: token });
        } else {
            return response.status(401).json({ message: "that email is already registered" });
        }
    }
    else {
        return response.status(401).json({ message: "missing information in signup form" });
    }
});


route.post('/api/login', async function (request, response) {
    if (request.body.email && request.body.password) {
        var email = request.body.email;
        var password = request.body.password;
    }
    var user = await data.users.find({ email: email });
    if (!user[0]) {
        return response.status(401).json({ message: "no such user found" });
    } if (user[0].password === request.body.password) {
        var payload = { id: user._id, name: user.userName };
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        return response.json({ message: "ok", token: token });
    } else {
        return response.status(401).json({ message: "passwords did not match" });
    }
});


module.exports = route;