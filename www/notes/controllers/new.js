"use strict";

myapp.controller('NewNoteCtrl', function($scope, $rootScope, $state, $stateParams, $mdDialog, Messages, ApiService){
	var count = 0;
	var _id = null;
	$scope.note = null;
    $scope.debounce = {"debounce": 900};
    $scope.saved = false;
    $scope.data = {tags: []};
    
    
    var note2data = function (note) {
		if ($rootScope.page.title != note.title)
			$rootScope.page.title = note.title;

		$scope.data.author = note.author;
		$scope.data.title = note.title;
		$scope.data.body = note.body;
		$scope.data.tags = [];

		if (note.tags) {
			for (var tag of note.tags) {
				if (tag != null)
					$scope.data.tags.push(tag.name);
			}
		}
    };

    var getNote = function (id) {
    	
		var note = ApiService.get({ id: id });
		note.$promise
			.then(function(result) { 
				console.log(result);
				$scope.note = result.data;
				note2data(result.data);

				$scope.saved = true;

				console.log('#load => id: '+id);
			})
			.catch(function(response) { console.log(response) });
		//return note;
	};

    $scope.updateTitle = function (title) {
    	$rootScope.page.title = title;
    	//console.log("updateTitle: "+title);
    	$scope.save();
    };

    $scope.save = function () {
    	$scope.saved = false;
    	count += 1;
    	//console.log("count: "+count);

    	// data to note
    	$scope.note.author = $scope.data.author;
    	$scope.note.title = $scope.data.title;
    	$scope.note.body = $scope.data.body;
    	$scope.note.tags = $scope.data.tags;

    	if (_id) { // UPDATE NOTE
    		//$scope.note._id = _id;
			ApiService.update($scope.note, 
		        function (response) {
		            console.log('#update success, id: '+$scope.note._id);
			    	$scope.saved = true;

			    	//$scope.note = getNote($scope.note.id);
			    	$scope.note = response.data;
			    	note2data(response.data);			    	
		        },
		        function (response) {
		            console.log('#update error');
		            $scope.saved = false;
		    }); 
    	} else {	// CREATE NOTE
		    ApiService.save($scope.note, 
		        function (response) {
		            console.log('#save success, id: '+response.data._id);
			    	//$scope.note.id = response._id;
			    	$scope.saved = true;

			    	//$scope.note = getNote(response._id);
			    	$scope.note = response.data;
			    	note2data(response.data);
			    	_id = response.data._id;
		        },
		        function (response) {
		            console.log('#save error');
		            console.log(response);
		            $scope.saved = false;
		    });
    	}
    };

 
    $scope.delete = function () {
    	//$scope.note._id = _id;
    	console.log($scope.note);
    	//$scope.note.$delete(
		ApiService.delete($scope.note._id, 
	        function (response) {
	            console.log('#delete success, id: '+_id);
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

	// initialization
	if ($stateParams.id) {
		_id = $stateParams.id;
		$rootScope.page.title = 'Chargement...';
		getNote($stateParams.id);
		//$scope.note._id = $stateParams.id;
	} else {
		$rootScope.page.title = 'Nouvelle note...';
		$scope.note = new ApiService();
	}

});