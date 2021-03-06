var express = require('express'),
    app = express(),
    port = process.env.PORT || 3200,
    mongoose = require('mongoose'),
    Employee = require('./api/models/employeeDataModel'),
    bodyParser = require('body-parser');

var path = require('path');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<username>:<password>@<server>:<port>/employees');

mongoose.connection.on('connected', function(){
    console.log("Connected");
});
mongoose.connection.on('error', function(){
    console.error.bind(console, 'MongoDB connection error:');
});
mongoose.connection.on('disconnected', function(){});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/employeeRoutes');
routes(app);

app.use(express.static(path.join(__dirname, 'public')))
app.get('/uploader', function(req, res){
    res.sendFile(path.join(__dirname, 'public/fileuploader/views/index.html'));
});
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
