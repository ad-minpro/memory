
myapp.controller('NotesCtrl', function($scope, $rootScope, ApiService){
    $rootScope.page.title = 'Notes';
    var asc = {'sort': 'created_at:asc'};
    var desc = {'sort': 'created_at:desc'};
    var currentSort = desc;


    $scope.sort = function() {
    	currentSort == desc ? currentSort = asc : currentSort = desc;
    	console.log(currentSort);
    	$scope.getNotes();
    };

	$scope.getNotes = function() {
		ApiService.query(currentSort).$promise
		.then(function(data) { 
			console.log('results: '+data.count);
			$scope.notes = data.results; 
		})
		.catch(function(response) { $scope.notes = []; });
	}

	$scope.getNotes();

});