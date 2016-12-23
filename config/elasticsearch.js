var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
	host: 'http://elastic:changeme@localhost:9200/',
    log: 'info'
    //httpAuth: 'elastic:changeme'
});

module.exports = client;

function getNotes() {
	return client.search({
	  	index: 'memory',type: 'notes'
	});
}
exports.getNotes = getNotes;