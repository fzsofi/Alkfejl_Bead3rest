var express = require('express');
var fortune = require('fortune');
var nedbAdapter = require('fortune-nedb');
var jsonapi = require('fortune-json-api');

//init
var server = express();
var store  = fortune({
    adapter: {
        type: nedbAdapter,
        options: { dbPath: __dirname + '/.db' }
    },
    serializers: [{ type: jsonapi }]    
}); 

//models:
//todo
/*
store.defineType('todo', {
    where: {type: String},
    what: {type: String},
    user: { 
        link: 'user',
        inverse: 'todos',
        isArray: false
    }
});

*/

store.defineType('todo', {
    tipus: {type: String},
    leiras: {type: String},
    tantargy: { 
        link: 'tantargy',
        inverse: 'todos',
        isArray: false
    }
});


//user
/*
store.defineType('user', {
    surname: {type: String},
    forename: {type: String},
    username: {type: String},
    todos: { 
        link: 'todo',
        inverse: 'user',
        isArray: true
    }
});
*/

store.defineType('tantargy', {
    tipus: {type: String},
    nev: {type: String},
    leiras: {type: String},
    todos: { 
        link: 'todo',
        inverse: 'tantargy',
        isArray: true
    }
});


//middleware
server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
server.use(fortune.net.http(store));

//start server
var port = process.env.PORT || 8080;
store.connect().then(function () {
    server.listen(port, function () {
        console.log('JSON Api server started on port ' + port);
    });
});