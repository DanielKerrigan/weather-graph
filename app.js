var express = require('express');
var bodyParser = require('body-parser');
var yql = require('yql');
var app = express();

app.set('views',__dirname +'/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
    res.render('index');
});

app.post('/form_submit', function(req,res){
    var zip_code = req.body.zip;
    var query = new yql('select * from weather.forecast where (location = '+zip_code+')');

    query.exec(function(err, data) {
        var location = data.query.results.channel.location;
        var condition = data.query.results.channel.item.condition;
        var forecast = data.query.results.channel.item.forecast;
        //console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');
        //console.log('Forecast: '+JSON.stringify(forecast));
        res.render('graph',{
            forecast: forecast
        });
    });
});

app.listen(3000, function(){
    console.log("Listening on port 3000!");
});
