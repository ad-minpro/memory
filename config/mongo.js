var mongoose = require('mongoose');
// connect to mongoDB database on modulus.io
mongoose.connect('mongodb://127.0.0.1:27017/test');

// define model =================
var Todo = mongoose.model('Todo', {
	text : String
});

function Create(req) {
    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            return err;

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                return err;
            return todos;
        });
    });	
};

exports.Create = Create;