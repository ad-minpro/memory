var mongoose = require('mongoose')
var Schema = mongoose.Schema;
// connect to mongoDB database on modulus.io
mongoose.connect('mongodb://127.0.0.1:27017/test');

var tagSchema = mongoose.Schema({
	//_creator : { type: Number, ref: 'Todo' },
    name: String,
    available: { type: Boolean, default: true }
});


tagSchema.static('findOneOrCreate', function (condition, callback) {

	const self = this;

  	return self.findOne(condition, function (err, result) {
	  	if (result) 
	  		return callback(err, result);

	  	self.create(condition, function (err, result) {
	  		return callback(err, result);
	  	});
  });
});


var todoSchema = mongoose.Schema({
    title: String, 
    author: String, 
    body: String, 
    //tags: [{ body: String }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }], 
    available: { type: Boolean, default: true }, 
    hidden: { type: Boolean, default: false }, 
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now }
});

// on every save, add the date
todoSchema.pre('save', function(next) {
	
	var currentDate = new Date();

	this.updated_at = currentDate;
	if (!this.created_at)
	this.created_at = currentDate;

	next();
});

var Tag = mongoose.model('Tag', tagSchema);
var Todo = mongoose.model('Todo', todoSchema);

module.exports = {
	Todo: Todo, 
	Tag: Tag
}

// TEST
/*
Tag.remove({});
Tag.findOneOrCreate({name: 'philo'}, function (err, tag) {
	if (err)
		console.log(err);
	console.log(tag);
});
*/
/*
Tag.create({name: 'autre'}, function (err, tag) {
	console.log('create !');
	if (err)
		console.log(err);
	console.log(tag);
});

*/

/*
var create = function(data) {
    
	var todo = new Todo({ title: data.title, author: data.author });

	todo.save(function (err, todo) {
	  if (err) return console.error(err);
	});	

};

var getAll = function() {
	var response = {result: true, content: ''};


	var promise = Todo.find().exec();
	promise.then(function (doc) {
		response.content = doc;
	});
*/
/*
	Todo.find(function (err, todos) {
		if (err) {
			response.result = false;
			response.content = err;
		} else {
			response.content = todos;
		}
	});


};

exports.create = create;
exports.getAll = getAll;


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!");
});
*/
//var data = {title: 'test 3', author: 'aurelien roy'};

/*
	var todo = new Todo({ title: data.title, author: data.author });

	todo.save(function (err, todo) {
	  if (err) return console.log(err);
	  console.log(todo);	
	});	

	Todo.find(function (err, todos) {
	  if (err) return console.log(err);
	  console.log(todos);	
	});	

*/
/*
function get() {
	Todo.find(function (err, todos) {
	  if (err) return console.log(err);
	  console.log(todos);	
	});	
};

var result = getAll();
console.log(result);
*/

var db = mongoose.connection;
db.on('error', function(err) {
  console.error('✘ CANNOT CONNECT TO MongoDB DATABASE !', dbname, err);
});
db.on('disconnected', function() {
  console.log('✘ DISCONNECTED from MongoDB DATABASE !');
});
db.on('parseError', function(err) {
  console.log('✘ parseError... ', err);
});
db.on('open', function(err) {
  console.log('✔ CONNECTED TO MongoDB DATABASE !');
});