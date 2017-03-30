// Load modules
var path = require('path'), // core
    express = require('express'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection');

var app = express();


// view engine set up
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'student',
  password: 'serverSide',
  port: 3306,
  database: 'api_test'
}, 'single'));

app.get("/", function(req, res){
  res.render('index');
});

app.get("/api", function(req, res){
  req.getConnection( function(err, connection){
    if(err) return next(err);
    connection.query( 'SELECT gebruikers.firstname FROM gebruikers WHERE firstname LIKE  ? "%"' , [req.query.firstname], function(err, result) {
      if(result.length>0) {
        result = result.splice(0,10);
        result[10] = {status : 'ok'};
        console.log(result);
        res.json(result);
      } else {
        res.json({status:'error'});
      }
    });
  });
});

app.listen(3000, function(){
  console.log("Started on port 3000");
});
