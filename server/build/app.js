"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const delay = require('express-delay');
app.use(delay(1000));
app.use(bodyParser.json());
app.use((_, response, next) => {
    response.header('Content-Type', 'application/json');
    next();
});
let users = require('../users.json');
const findUser = (request) => {
    return users.find((user) => user.id === request.params.id);
};
const userNotFoundError = (response) => {
    response.statusCode = 404;
    response.send('There is no users with such id!');
};
app.get('/users', (_, response) => {
    response.send(users);
});
app.get('/users/:id', (request, response) => {
    const user = findUser(request);
    if (!user) {
        userNotFoundError(response);
    }
    else {
        response.send(user);
    }
});
app.post('/users/add', (request, response) => {
    const newUser = request.body;
    console.log(newUser);
    users.push(newUser);
    response.send(newUser);
});
app.post('/users/login', (request, response) => {
    const user = users.find((u) => u.username === request.body.username && u.password === request.body.password);
    if (user) {
        console.log(user);
        response.send(user);
    }
    else {
        response.statusCode = 401;
        response.send('Not authorized!');
    }
});
app.put('/users/:id', (request, response) => {
    const user = findUser(request);
    if (!user) {
        userNotFoundError(response);
    }
    else {
        const userIndex = users.findIndex((u) => u.id === request.params.id);
        users[userIndex] = request.body;
        response.send(users[userIndex]);
    }
});
app.delete('/users/:id', (request, response) => {
    const user = findUser(request);
    if (!user) {
        userNotFoundError(response);
    }
    else {
        users = users.filter((u) => u.id !== request.params.id);
        response.send(users);
    }
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
//# sourceMappingURL=app.js.map