var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/travel');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log("connection succeeded");
})

var app = express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function(req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var gender = req.body.gender;
    var locality = req.body.locality;
    var phone = req.body.phone;
    var email = req.body.email;

    var data = {
        "name": name,
        "age":age,
        "gender":gender,
        "locality":locality,
        "phone": phone,
        "email": email

    }
    db.collection('info').insertOne(data, function(err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.redirect('home.html');
})


app.get('/', function(req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(8080)


console.log("server listening at port 8080");