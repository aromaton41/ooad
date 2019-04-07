const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://Admin:admin123@ds159747.mlab.com:59747/ooad";
app.use(bodyParser.json());

// add admin
app.post("/home/room", (req, res) => {
    var data = {
        room:req.body.room,
        floor:req.body.floor,
        building:req.body.building,
        row:req.body.row,
        col:req.body.col,
    }
    console.log(data)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("room").insertOne(data, (err, result) => {
            if (err) {
                res.send("false")
            } else {
                res.send("true")
            }
        });
    });
});
module.exports = app;