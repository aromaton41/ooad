const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://Admin:admin123@ds159747.mlab.com:59747/ooad";
app.use(bodyParser.json());

app.post("/home/login", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");

        var user = {
            "username": req.body.username,
            "password": req.body.password,
        }
        dbo.collection('account').find(user).count((err, result) => {
            
            if (err) {
                res.sendStatus(404)
            } else {
                if (result > 0) {
                    res.send('true')
                } else {
                    res.send('false')
                }

            }

        })

    });
})
module.exports = app;