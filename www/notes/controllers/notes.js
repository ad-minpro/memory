
myapp.controller('NotesCtrl', function($scope, $rootScope, NoteService){
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
		NoteService.query(currentSort).$promise
		.then(function(result) { 
			console.log('results: '+result.count);
			$scope.notes = result.data; 
		})
		.catch(function(response) { $scope.notes = []; });
	}

	$scope.getNotes();

});