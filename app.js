var express=require("express");
var todoController= require('./controllers/todoController');
var app= express();


//setting up template engine
app.set('view engine', 'ejs');

//setting up static files
//first param i.e. route is not used here hence public folder will be mapped to every route in the url bar
app.use(express.static('public')); 

//fire controller
todoController(app);

app.listen(3000);
console.log("Listening to port 3000");
