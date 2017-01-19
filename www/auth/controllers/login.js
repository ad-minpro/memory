
myapp.controller('LoginCtrl', function($scope, $rootScope, $state, userService, Messages){
    $rootScope.page.title = 'Login';
    $scope.data = {login: null, password: null};

    $scope.login = function () {
	    //var user = new userService();

	    if ($scope.data.login && $scope.data.password) {

		    var req = userService.login($scope.data.login, $scope.data.password);
		    req.then(
		        function (response) {
		            if (response.data.success) {
			            Messages.new("Bienvenue");
			            Messages.show();
			            console.log(response.data);

			            var res = response.data.results;
			            
			            $rootScope.page.username = res.data.user.name;

			        	$state.go('notes.list', {}, { reload: true });
		        	}
		        },
		        function (response) {
		            console.log(response);
		        }
			);
		};
	};

});

myapp.controller('LogoutCtrl', function($scope, $rootScope, $window, $state, userService, Messages){

    $scope.logout = function () {
    	userService.logout();

        Messages.new("Vous êtes maintenant déconnecté");
        Messages.show();

    	$state.go('login', {}, { reload: true });

	};

});