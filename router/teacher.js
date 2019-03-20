const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://Admin:admin123@ds159747.mlab.com:59747/ooad";
app.use(bodyParser.json());

// add Teacher
app.post("/home/teacher/insert", (req, res) => {
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }
    console.log(data)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("teacher").insert(data,(err, result) => {
            if (err) {
                res.send("false")
            } else {
                res.send("true")
            }

            }

        )

    });
});

// get Teacher to table
app.get('/home/teacher/get',(req,res)=>{
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");

   
        dbo.collection("teacher").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result)
            db.close();
          });
    });
});

// edit teacher data
app.post('/home/teacher/edit', (req, res) => {
    console.log('edit request')

    var data = {
       
        firstname: req.body.firstname,
        lastname: req.body.firstname,

    }


    console.log(data)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ooad");
        dbo.collection("teacher").updateOne(condi, { $set: data }, (err, result) => {
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
module.exports = app;