var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var DummyDB = (function () {
    var DummyDB = {};
    var storage = [];
    var count = 1;

    DummyDB.get = function (id) {
        if(id) {
            id = (typeof id == 'string') ? Number(id) : id;
            for(var i in storage) if(storage[i].id == id) {
                return storage[i];
            }
        } else {
            return storage;
        }
    };

    DummyDB.insert = function(data) {
        data.id = count++;
        storage.push(data);
        return data;
    };

    DummyDB.remove = function (id) {
        id = (typeof id == 'string') ? Number(id) : id;
        for(var i in storage) if(storage[i].id == id) {
            storage.splice(i, 1);
            return true;
        }
        return false;
    };

    return DummyDB;
});

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/user', function (req, res) {
    res.send(DummyDB.get());
});

app.get('/user/:id', function (req, res) {
    res.send(DummyDB.get(req.params.id));
});

app.post('/user', function(req, res) {
    var name = req.body.name;
    var region = req.body.region;

    if(name && region) {
        res.send(DummyDB.insert({
            name: name,
            region: region
        }));
    } else {
        throw new Error('error');
    }
});

app.put('/user/:id', function(req, res) {

});

app.delete('/user/:id', function(res, req) {

});

app.listen(52273, function() {
    console.log('server is up and running');
});