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

    function logout() {
        $window.localStorage.removeItem('jwtToken');
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
                console.log('authed: '+authed);

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

myapp.factory('authInterceptor', function(API, authService, $location, $q) {
	return {
		// automatically attach Authorization header
		request: function(config) {
			//console.log('authInterceptor | request');


			if(authService.isAuthed()) {

				var token = authService.getToken();
				authService.refresh(token);

				if(config.url.indexOf(API) === 0 && token) {
					//config.headers.Authorization = 'x-access-token ' + token;
					config.headers['x-access-token'] = token;
				}
			} else {
				console.log('not loged | redirect to login page');
				$location.path("/login");
				//$state.go('login', {}, { reload: true });
			}
				return config;
		},
		// If a token was sent back, save it
		response: function(res) {
			if(res.config.url.indexOf(API) === 0 && res.data.token) {
				authService.saveToken(res.data.token);
			}
			return res;
		},
		responseError: function(res) {
			if (res.status === 403) {
				console.log('403 ERROR, redirect to login page ('+res.data.message+')');
				authService.logout();
				$location.path("/login");
				//$state.go('login', {}, { reload: true });
				return res;
			} else if (res.status === 401) {
				console.log('401 ERROR');
			};
			//return res;
			return $q.reject(res);
		},
	}
});

myapp.config(function($httpProvider) {
	$httpProvider.interceptors.push('authInterceptor');
});

myapp.factory('userService', function($http, authService, API){
    var self = this;

    return {
        login: function(login, password) {
            return $http.post(API+'/login', {
                login: login,
                password: password
            });
        }, 
        logout: function() {
        	authService.logout();
        }, 
        profile: function() {
            return $http.get(API+'/profile', {});
        },         
    }
});