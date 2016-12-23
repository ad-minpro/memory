// app/routes.js

    var elasticSearch = require('../config/elasticsearch.js');


    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/test', function(req, res) {

            elasticSearch.count({index: 'memory',type: 'notes'},function(err,resp,status) {  
              //console.log("notes:",resp);
              if (err)
                res.send(err);

              res.json(resp);
            });


        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)



        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendFile('../www/index.html'); // load our public/index.html file
        });

    };
