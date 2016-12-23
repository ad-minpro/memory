var express = require('express');
var router = express.Router();
var elasticSearch = require('../config/elasticsearch.js');


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


router.route('/notes')

    .get(function(req, res) {

    	var defaultSort = 'created_at:desc';   
    	var sort = req.query.sort ? req.query.sort : defaultSort;

    	//console.log('params: '+req.query.sort);
    	//console.log('data: '+req.body.data);




    	var results = {};

		elasticSearch.search({
		  	index: 'memory',
		  	type: 'notes', 
			sort: sort, 		  	
		}).then(function (body) {
	    	results.timeout = body.timed_out
	    	results.count = body.hits.total
	    	results.results = body.hits.hits

	  		res.json(results);
		}, function (error) {
			console.trace(error.message);
			res.send(error);
		});
/*
		elasticSearch.search({index: 'memory',type: 'notes'},function(err,resp,status) {  
		//console.log("notes:",resp);
			if (err)
				res.send(err);
			res.json(resp.hits.hits);
		});
*/
        /*
		elasticSearch.count({index: 'memory',type: 'notes'},function(err,resp,status) {  
		//console.log("notes:",resp);
			if (err)
				res.send(err);
			res.json(resp);
		});
		*/
        
    })

    .post(function(req, res) {

    	data = req.body.data;
    	data.author = 'Aurelien Roy';
    	data.created_at = Date.now();
    	data.available = true;
        
		elasticSearch.index({
			index: 'memory',
			type: 'notes',
			body: data
		}).then(function (body) {
	  		res.json(body);
		}, function (error) {
			console.log(error.message);
			res.send(error);
		});

  
    });

router.route('/notes/:note_id')

    .get(function(req, res) {

		elasticSearch.get({
			index: 'memory',
			type: 'notes',
			id: req.params.note_id
		}).then(function (body) {
	  		res.json(body);
		}, function (error) {
			console.log(error.message);
			res.send(error);
		});

    })

    .put(function(req, res) {

    	data = req.body.data;
    	data.updated_at = Date.now();

		elasticSearch.index({
			index: 'memory',
			type: 'notes',
			id: req.params.note_id,
			body: data
		}).then(function (body) {
	  		res.json(body);
		}, function (error) {
			console.log(error.message);
			res.send(error);
		});
	})

    .delete(function(req, res) {

		elasticSearch.delete({
			index: 'memory',
			type: 'notes',
			id: req.params.note_id
		}).then(function (body) {
	  		res.json(body);
		}, function (error) {
			console.log(error.message);
			res.send(error);
		});
    });   
/*
router.route('/notes/files')
	.post(function(req, res){
		upload(req,res,function(err){
			if(err){
				console.log(err);
				res.json({error_code:1,err_desc:err});
				return;
			}
			//res.json({error_code:0,err_desc:null});
			res.status(201).end();
		})
	});
*/
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