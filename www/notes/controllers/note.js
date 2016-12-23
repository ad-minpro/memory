
myapp.controller('NoteCtrl', function($scope, $rootScope, $state, $stateParams, $mdDialog, $mdToast, Messages, ApiService){
	var note_id = $stateParams.id;
	var count = 0;

    $rootScope.page.title = 'Chargement...';
    $scope.debounce = {"debounce": 900};
    $scope.saved = false;
    $scope.data = {};
    $scope.data.tags = [];

    getNote = function () {
		var note = ApiService.get({ id: note_id });
		note.$promise
			.then(function(result) { 
				note = result;
				note.id = note_id;
				$rootScope.page.title = note._source.title;
				$scope.data = note._source;

				if (!note._source.tags)
					$scope.data.tags = [];

				$scope.saved = true;

				console.log('#load => id: '+note_id);
			})
			.catch(function(response) { console.log(response) });
		return note;
	};

	// load note
	$scope.note = getNote();

    $scope.updateTitle = function (title) {
    	$rootScope.page.title = title;
    	//console.log("updateTitle: "+title);
    	$scope.save();
    };

    $scope.save = function () {
    	$scope.saved = false;
    	count += 1;
    	//console.log("count: "+count);
    	$scope.note.data = $scope.data;
    	console.log($scope.data.tags);

		ApiService.update($scope.note, 
	        function (response) {
	            console.log('#update success, id: '+$scope.note.id);
		    	$scope.saved = true;

		    	$scope.note = getNote();
	        },
	        function (response) {
	            console.log('#update error');
	            $scope.saved = false;
	    });     			

    };

	$scope.showSimpleToast = function() {

		$mdToast.show(
			$mdToast.simple()
				.textContent('Simple Toast!')
				.position('top right')
				.hideDelay(3000)
		);
	};

    $scope.delete = function () {

		ApiService.delete($scope.note, 
	        function (response) {
	            console.log('#delete success, id: '+note_id);
	            //$scope.showSimpleToast();

	            Messages.new("Note supprimée");
	            Messages.show();

	        	$state.go('notes.list', {}, { reload: true });
	        },
	        function (response) {
	            console.log('#delete error');
	            console.log(response);
	    });

    };
 
	$scope.showConfirm = function(ev) {
	
		var confirm = $mdDialog.confirm()
			.title('Voulez-vous supprimer cette note ?')
			.textContent("Cette action est définitive.")
			.ariaLabel('Suppresion')
			.targetEvent(ev)
			.ok('Oui')
			.cancel('Non');

		$mdDialog.show(confirm).then(function() {
			$scope.delete();
		}, function() {
			console.log('Suppresion annulé');
		});
	};


});