"use strict";

myapp.controller('OldNoteCtrl', function($scope, $rootScope, userService, ApiService){
    $rootScope.page.title = 'Nouvelle note...';
    $scope.debounce = {"debounce": 900};
    $scope.saved = false;
    var count = 0;

    $scope.data = {};

    var note = new ApiService();

    $scope.updateTitle = function (title) {
    	$rootScope.page.title = title;
    	console.log("updateTitle: "+title);
    	$scope.save();
    };

    $scope.save = function () {
    	$scope.saved = false;
    	count += 1;
    	console.log("count: "+count);
    	note.data = $scope.data;

    	if (note.id) { // UPDATE
    		ApiService.update(note, 
		        function (response) {
		            console.log('#update success, id: '+note.id);
		        	console.log(response);

			    	$scope.saved = true;
			    	$scope.debug = response;
		        },
		        function (response) {
		            console.log('#update error');
		            console.log(response);

		            $scope.saved = false;
		            $scope.debug = response;
		    });     			
    	} else { // SAVE (create)
		    ApiService.save(note, 
		        function (response) {
		            console.log('#save success, id: '+response._id);
			    	note.id = response._id;

			    	$scope.saved = true;
			    	$scope.debug = response;
		        },
		        function (response) {
		            console.log('#save error');
		            console.log(response);

		            $scope.saved = false;
		            $scope.debug = response;
		    }); 
    	}
		
    };
});



myapp.controller('NewNoteCtrl', function($scope, $rootScope, $state, $mdDialog, ApiService){
	var count = 0;

    $rootScope.page.title = 'Nouvelle note...';
    $scope.debounce = {"debounce": 900};
    $scope.saved = false;
    $scope.data = {};
    $scope.data.tags = [];
    $scope.note = new ApiService();
    

    var getNote = function (id) {
    	
		var note = ApiService.get({ id: id });
		note.$promise
			.then(function(result) { 
				note = result;
				note.id = id;
				
				if ($rootScope.page.title != note._source.title)
					$rootScope.page.title = note._source.title;

				$scope.data = note._source;

				if (!note._source.tags)
					$scope.data.tags = [];
				
				$scope.saved = true;

				console.log('#load => id: '+id);
			})
			.catch(function(response) { console.log(response) });
		return note;
		
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
    	$scope.note.data = $scope.data;

    	if ($scope.note.id) { // UPDATE NOTE
			ApiService.update($scope.note, 
		        function (response) {
		            console.log('#update success, id: '+$scope.note.id);
			    	$scope.saved = true;

			    	$scope.note = getNote($scope.note.id);
		        },
		        function (response) {
		            console.log('#update error');
		            $scope.saved = false;
		    }); 
    	} else {	// CREATE NOTE
		    ApiService.save($scope.note, 
		        function (response) {
		            console.log('#save success, id: '+response._id);
			    	$scope.note.id = response._id;
			    	$scope.saved = true;

			    	$scope.note = getNote(response._id);
		        },
		        function (response) {
		            console.log('#save error');
		            console.log(response);
		            $scope.saved = false;
		    });
    	}

		// LOAD / RELOAD NOTE
		// $scope.note = getNote($scope.note.id);
    };



    $scope.delete = function () {

		ApiService.delete($scope.note, 
	        function (response) {
	            console.log('#delete success, id: '+note_id);
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