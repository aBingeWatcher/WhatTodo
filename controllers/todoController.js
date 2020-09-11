var bodyParser= require('body-parser'); //middleware to access all the post data sent
var urlencodedParser= bodyParser.urlencoded({extended: false});

var mongoose= require("mongoose");

//connecting to the database
mongoose.connect('mongodb+srv://momo:todo@todo.2qqtv.mongodb.net/todo?retryWrites=true&w=majority',{ useNewUrlParser: true });

//creating schema which is like a blueprint
var todoSchema= new mongoose.Schema({
    item:String
});

var Todo= mongoose.model('Todo', todoSchema);  //created a model or collection named Todo based on the above schema

//storing data in the created model
 /*var itemOne= Todo({ item: "Learn something new "}).save(function(err) {
    if(err) throw err;
    console.log('item saved');
}); */

//var data=[ {item:" Complete todo list project"}, {item:"Learn react hooks"}, {item: "Learn socket.io"}, {item:"Chat box project"}];

module.exports= function(app) { //here app param is the var app from app.js
    
    app.get('/todo', function(req,res){

        //get data from mongodb and pass it to view
        //find method will fetch all or particular items in the collection
        //empty object in the parameter will fetch all items from collection
        Todo.find({}, function(err,data){
            if(err) throw err;   //throw err means if err occurs, js will stop and display an error message
            res.render('todo',{todos:data});
        });  
    }); 
    
    app.post('/todo',urlencodedParser, function(req,res){

        //get data from the view and add it to mongodb
        var newTodo= Todo(req.body).save( function(err,data){  //adds the new item from post req to the Todo collection and then saves it
            if(err) throw err;
            res.json(data);
        })
        //data.push(req.body); //to add the new item from post request in the data array
        //res.json(data); //*** updated data is sent back to ajax request success prop
    }); 

    app.delete('/todo/:item', function(req,res){

        //delete the requested item from mongodb

        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if(err) throw err;  
            res.json(data);
        })
        /*data= data.filter(function(todo){
            return todo.item.replace(/ /g,'-') !== req.params.item;
        });
        res.json(data); */
    }); 

};