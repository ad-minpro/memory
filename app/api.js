var express = require('express');
var router = express.Router();
var mongo = require('../config/mongo.js');
var config = require('../config/config.js');
var async = require('async');
var passport = require('passport');
var jwt    = require('jsonwebtoken');

var dir = require('./dir');

var multer = require('multer');
//var uploadDirect = multer({ dest: 'uploads/' });
//var upload = multer({ dest: 'uploads/' }).single('file');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir.mkUploadPath())
  }
  /*
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
  */
})

var upload = multer({ storage: storage }).single('file');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	//console.log('Time: ', Date.now());
	next();
});
// define the home page route
router.get('/', function(req, res) {
	res.send('Root page API');
});
// define the about route
router.get('/about', function(req, res) {
	res.send('About API');
});


// route to authenticate a user
router.post('/login', function(req, res) {

	mongo.User.findOne({
		login: req.body.login
	}, function(err, user) {
		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {
			user.comparePassword(req.body.password, function (err, success) {
				if (success && !err) {
					// if user is found and password is right
					// create a token
					var claims = {
						sub: user._id, 
						iss: 'memorize_api', 
						permissions: 'add_note'
					}
					
					var token = jwt.sign(claims, config.secret, {
						expiresIn : 60*60*24 // expires in 24 hours
					});

					console.log('---> LOGGED !');

					response = new config.ApiResponse();
					response.success = true;
					response.addToken(token);
					//response.add('token', token);
					response.add('user', {id: user._id, name: user.name});

					res.json(response);

					// return the information including token as JSON
					/*
					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: token
					});
					*/
				} else {
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				}
			});
		}
	});
});

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  console.log('---> CHECK AUTH !');
  //console.log(req.headers);

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        //return res.json({ success: false, message: 'Failed to authenticate token.' });    
	    return res.status(403).send({ 
	        success: false, 
	        message: 'Failed to authenticate token.' 
	    });        
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        req.user_id = decoded.sub;

        //var delta = new Date(decoded.exp*1000);
        //console.log('exp token: '+delta);
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


router.route('/profile')

	.get(function(req, res) {
		// get auto user profile
		var query = mongo.User.findById(req.user_id, 'name');
		query.exec(function(err, result) {
			if (err) throw err;

			response = new config.ApiResponse();
			response.success = true; 
			response.setData(result);

			console.log(response);

			res.json(response);



		});
	});


router.route('/users')

	.get(function(req, res) {
		
		var query = mongo.User.find({});
		query.exec(function(err, result) {
			if (err) throw err;

			res.json({ success: true, result:result });
		});
	})

	.post(function(req, res) {

	  // create a sample user
	  var user = new mongo.User({ 
	    name: 'Aurelien Roy', 
	    login: 'aurelienroy', 
	    password: '56973001'
	  });

	  // save the sample user
	  user.save(function(err) {
	    if (err) throw err;

	    console.log('User saved successfully');
	    res.json({ success: true });
	  });
	});

router.route('/tags')

    .get(function(req, res) {

        var query = mongo.Tag.find({available: true});
        query.exec(function(err, tags){
            if(err)
                res.send(err);
            res.json(tags);
        });
    })

    .post(function(req, res) {

		mongo.Tag.findOneOrCreate({name: req.body.name}, function (err, tag) {
			if (err)
				res.json({result: false, data:err});

			res.json({result: true, data:tag});
		});	  
    })

    .delete(function(req, res) {

		var query = mongo.Tag.remove({});
        query.exec(function(err, result){
        	if (err)
        		res.json({result: false, data:err});

            res.json({result: true, data:result});
        });		

    }); 

router.route('/tags/:tag_id')

    .get(function(req, res) {
		//id: req.params.tag_id
        var query = mongo.Tag.findById(req.params.tag_id);
        query.exec(function(err, tag){
        	if (err)
        		res.json({result: false, data:err});

            res.json({result: true, data:tag});
        });
    })

    .put(function(req, res) {
    	
    	var query = mongo.Tag.findOneAndUpdate({_id: req.params.tag_id}, req.body, {new: true});
        query.exec(function(err, tag){
        	if (err)
        		res.json({result: false, data:err});

            res.json({result: true, data:tag});
        });
	})

    .delete(function(req, res) {
        var query = mongo.Tag.remove({_id: req.params.tag_id});
        query.exec(function(err, tag){
        	if (err)
        		res.json({result: false, data:err});

            res.json({result: true, data:tag});
        });
    }); 


// notes
router.route('/notes')

    .get(function(req, res) {

    	var defaultSort = 'created_at:desc';   
    	var sort = req.query.sort ? req.query.sort : defaultSort;

    	//console.log('params: '+req.query.sort);
    	//console.log('data: '+req.body.data);

        var query = mongo.Todo.find({}).populate('tags');
        query.exec(function(err, data){
            if(err)
                res.json({result: false, data:err});

            res.json({result: true, count: data.length, data:data});
        });
    })

    .post(function(req, res) {

    	var data = {
    		author: req.body.author, 
    		title: req.body.title, 
    		body:req.body.body
    	}
        var todo = new mongo.Todo(data);

        async.waterfall([
    		function(callback) {
    			console.log('first function: get tags');
		        async.each(req.body.tags, 
		        	function(name, c) {
						mongo.Tag.findOneOrCreate({name: name}, function (err, tag) {
							if (err)
								c(err);

							todo.tags.push(tag._id);
							c();
						});			        		
		        	},
		        	function(err) {
		        		if (err)
		        			callback(err);

		        		callback(null, todo);
		        	});

    		}, 
    		function(todo, callback) {
    			console.log('second function: save todo');
    			
		        todo.save(function(err){
		            if(err)
		            	callback(err);

		            callback(null, todo);
		        });
    		}
        	], function(err, result) {
        		console.log('final function: return result');
        		if (err)
        			res.send(err);
   		
        		res.json({result: true, data:todo});
    		});

    })

    .delete(function(req, res) {

		var query = mongo.Todo.remove({});
        query.exec(function(err, success){
        	if (err)
        		res.send(err);
            res.json(success)
        });		

    }); 


router.route('/notes/:note_id')
  
    .get(function(req, res) {
		//id: req.params.note_id
        var query = mongo.Todo.findById(req.params.note_id).populate('tags');
        query.exec(function(err, note){
        	if (err)
        		res.json({result: false, data:err});

        	console.log(note);
            res.json({result: true, data:note});
        });
    })

    .put(function(req, res) {

    	var data = {
    		author: req.body.author, 
    		title: req.body.title, 
    		body:req.body.body, 
    		tags: []
    	}

        async.each(req.body.tags, 
        	function(name, callback) {
				mongo.Tag.findOneOrCreate({name: name}, function (err, tag) {
					if (err)
						callback(err);

					data.tags.push(tag._id);
					callback();
				});			        		
        	},
        	function(err) {
        		if (err)
        			res.json({result: false, data:err});

		    	var query = mongo.Todo.findOneAndUpdate({_id: req.params.note_id}, data, {new: true}).populate('tags');
		        query.exec(function(err, todo){
		        	if (err)
		        		res.json({result: false, data:err});

		            res.json({result: true, data:todo});
		        });
        	});
	})

    .delete(function(req, res) {
        var query = mongo.Todo.remove({_id: req.params.note_id});
        query.exec(function(err, result){
        	if (err)
        		res.json({result: false, data:err});

            res.json({result: true, data:result});
        });
    }); 


router.route('/notes/files')
	.post(function(req, res){

		upload(req,res,function(err){
			if(err){
				console.log(err);
				res.json({error_code:1,err_desc:err});
				return;
			}
			console.log(req.file)
			//res.json({error_code:0,err_desc:null});
			res.status(201).end();
		})
	});

module.exports = router;