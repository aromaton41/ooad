const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var path = require('path');
const account = require('./router/account');
const teacher = require('./router/teacher');
app.use(express.static('public'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'public','home.html'));
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(account);
app.use(teacher);
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Start server at port 3000')
});