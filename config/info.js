var client = require('./elasticsearch.js');
/*
client.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});
*/
/*
client.count({index: 'memory',type: 'notes'},function(err,resp,status) {  
  console.log("notes:",resp);
});
*/
/*
client.index({  
  index: 'memory',
  id: 'AVjqv9E0s6V6OlfTkpNt',
  type: 'notes',
  body: {
  	author: 'Aurelien Roy', 
  	content: 'test from node.js', 
  	tags: ['test', 'nodejs']
  }
},function(err,resp,status) {
    console.log(resp);
});
*/
/*
client.indices.getMapping({  
    index: 'memory',
    type: 'notes',
  },
function (error,response) {  
    if (error){
      console.log(error.message);
    }
    else {
      console.log("Mappings:\n",response.memory.mappings.notes.properties);
    }
});
*/  


/*
client.search({
  index: 'memory',
  type: 'notes', 
  sort: [
    'created_at:desc'
  ]
},function(err,resp,status) {
  console.log(resp.hits.hits);
});
*/


// recherche par aggrégation sur "tags"

client.search({
  index: "memory",
  type: "notes", 
  body: {
    aggs: {
      tags: {
        terms: {
          field: "tags", 
          order: {"_count":"desc"}
        }
      }
    }
  }
},function(err,resp,status) {
  console.log(resp.aggregations.tags.buckets);
});