var uuid = require('uuid');



ApiResponse = function() {
	this.success = true, 
	this.message = '', 
	this.results = {
		count: 0, 
		data: {}
	}
	this.date = Date.now();
	this.token = null;

	this.setData = function(data) {
		this.results.data = data; 
		this.results.count = data.length; 
	};

	this.getData = function() {
		return this.results.data;
	};

	this.add = function(key, value) {
		this.results.data[key] = value;
	};

	this.addToken = function(token) {
		this.token = token;
	};

}

module.exports = {
    //'secret': 'AreYouAGeek?YesOfCourse!',
    secret: uuid.v4(), 
    //secret: '03951528-b2a6-4809-b622-4939717f677d', 
    database: 'mongodb://127.0.0.1:27017/test', 
    ApiResponse: ApiResponse

};

console.log('secret: '+module.exports.secret);