myapp.factory('authService', function($window){
    var self = this;

    // Add JWT methods here
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
    };

    function saveToken(token) {
        $window.localStorage['jwtToken'] = token;
        //console.log('JWT:', token);
    };

    function getToken() {
        return $window.localStorage['jwtToken'];
    };

    var myObject = {
        getToken: function() {
            return $window.localStorage['jwtToken'];
        },
        saveToken: function(token) {
            $window.localStorage['jwtToken'] = token;
        },
        refresh: function(token) {
            var params = parseJwt(token);
            var t = params.exp - Math.round(new Date().getTime() / 1000);
            //console.log(t+'s');

            /* ### DEBUG ###
            if (t < 60 && t > 0) {
                //var new_token = $http.post(API + '/api-token-refresh/', { token: token });
                //saveToken(new_token);
                console.log('refresh token now');
            } else {
                console.log('refresh | nothing to do');
            }
            */
        },         
        isAuthed: function() {
            var token = getToken();
            if(token) {
                var params = parseJwt(token);
                var authed = Math.round(new Date().getTime() / 1000) <= params.exp;
                //console.log(params.exp);
                return authed
            } else {
                return false;
            }
        },

        logout: function() {
            $window.localStorage.removeItem('jwtToken');
        }
    };

    return myObject;      
});

myapp.factory('userService', function($http, API, authService, $base64){
    var self = this;

    return {
        login: function(username, password) {
            return $http.post(API + '/_xpack/security/user/', {
                username: username,
                password: password
            })
        }, 
        login2: function(username, password) {
	        var _url = API + "/_xpack/security/user/";
	        var _authdata = $base64.encode(username + ':' + password);
	        // ZWxhc3RpYzpjaGFuZ2VtZQ==
	        console.log(_authdata);

	        var _headers = {
	                'Authorization': 'Basic ' + _authdata,
	                'Accept': 'application/json; charset=utf-8',
	                'Content-Type': 'application/json; charset=utf-8'               
	            };

	        return $http({
	                method: 'POST',
	                url: _url,
	                responseType: "json",
	                headers: _headers
            });
        }
    }
});
/*
myapp.service("Auth", function($http, API, Base64){
    this.doLogin = function(){
        var _url = API + "/_xpack/security/user/";
        var _authdata = Base64.encode('elastic' + ':' + 'changeme');

        var _headers = {
                'Authorization': 'Basic ' + _authdata,
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'               
            };

        return $http({
                method: 'jsonp',
                url: _url,
                responseType: "json",
                headers: _headers
                });
    };
});
*/
myapp.factory('NotesService', function($resource, API) {
  return $resource(
  	API+'/memory/notes/:id', {id: "@id"}, 
  	{
  		'save':   {method:'POST'},
  		'update':   {method:'PUT'},
    	'query': {method:'GET', isArray: true}, 
    	'getData': {method:'GET', isArray: false}
  });
});

myapp.factory('NoteService', function($resource, API) {
  return $resource(
    'http://localhost:3000/api/notes/:id', {id: "@_id"}, 
    {
        'get': {method:'GET', isArray: false}, 
        'save':   {method:'POST'},
        'update':   {method:'PUT'},
        'delete':   {method:'DELETE'},
        'query': {method:'GET', isArray: false}, 
        'getData': {method:'GET', isArray: false}
  });
});

myapp.factory('TagService', function($resource, API) {
  return $resource(
    'http://localhost:3000/api/tags/:id', {id: "@id"}, 
    {
        'get': {method:'GET', isArray: false}, 
        'save':   {method:'POST'},
        'update':   {method:'PUT'},
        'delete':   {method:'DELETE'},
        'query': {method:'GET', isArray: false}, 
        'getData': {method:'GET', isArray: false}
  });
});