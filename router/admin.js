const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://Admin:admin123@ds159747.mlab.com:59747/ooad";
app.use(bodyParser.json());

// add admin
app.post("/home/admin/insert", (req, res) => {
    var data = {
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    }
    console.log(data)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("admin").insertOne(data, (err, result) => {
            if (err) {
                res.send("false")
            } else {
                var user = {
                    id: req.body.id,
                    username: req.body.username,
                    password: req.body.password,
                    type: "Admin"
                }
                dbo.collection("account").insertOne(user, (err, result) => {
                    if (err) {
                        res.send("false")
                    } else {
                        res.send("true")
                    }

                });
            }
        });
    });
});

// get admin to table
app.get('/home/admin/get', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");


        dbo.collection("admin").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result)
            db.close();
        });
    });
});

// edit admin data
app.post('/home/admin/edit', (req, res) => {
    console.log('edit request')

    var data = {

        firstname: req.body.firstname,
        lastname: req.body.lastname,

    }
    var condition = {
        id: req.body.id
    }
    console.log(data)
    console.log(condition)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("admin").updateOne(condition, { $set: data }, (err, result) => {
            if (err) {
                console.log(err)
                res.send("false")
                db.close();
            } else {
                res.send("true")
                db.close()
            }
        });
    });
})

// delate admin to table
app.post('/home/admin/delete', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        var data = {
            id: req.body.id
        }

        dbo.collection("admin").deleteOne(data,(err, result) => {
            if (err) {
                res.send('false')
            }else{
                dbo.collection("account").deleteOne(data,(err,result) =>{
                    if(err){
                        res.send('false')
                    }else{
                        res.send('true')
                    }
                });     
            }
        });
    });
});
module.exports = app;