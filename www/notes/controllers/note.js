"use strict";

myapp.controller('NoteCtrl', function($scope, $rootScope, $state, $stateParams, $mdDialog, $log, Messages, NoteService){
	var count = 0;
	var _id = null;
	var _note = null;
	
    $scope.debounce = {"debounce": 900};
    $scope.saved = false;
    $scope.data = {tags: []};
    $scope.more = {};
    
    
    var setData = function (note) {
		if ($rootScope.page.title != note.title)
			$rootScope.page.title = note.title;

		$scope.data._id = note._id;

		$scope.data.author = note.author;
		$scope.data.title = note.title;
		$scope.data.body = note.body;
		$scope.data.tags = [];

		$scope.more.created_at = note.created_at;
		$scope.more.updated_at = note.updated_at;
		$scope.more.version = note.__v;

		if (note.tags) {
			for (var tag of note.tags) {
				if (tag != null)
					$scope.data.tags.push(tag.name);
			}
		}
    };

    var getNote = function (id) {
    	
		var note = NoteService.get({ id: id });
		note.$promise
			.then(function(result) { 
				_note = result;
				setData(_note.data);
				$scope.saved = true;
				$log.info('#load => id: '+id);
			})
			.catch(function(response) { $log.info(response) });
		//return note;
	};

    $scope.updateTitle = function (title) {
    	$rootScope.page.title = title;
    	//$log.info("updateTitle: "+title);
    	$scope.save();
    };

    $scope.save = function () {
    	$scope.saved = false;
    	$scope.more.count += 1;

    	if ($scope.data._id) { // UPDATE NOTE
    		//$scope.note._id = _id;
			NoteService.update($scope.data, 
		        function (response) {
		            $log.info('#update success, id: '+$scope.data._id);
			    	$scope.saved = true;
			    	_note = response;
			    	setData(_note.data);			    	
		        },
		        function (response) {
		            $log.info('#update error');
		            $scope.saved = false;
		    }); 
    	} else {	// CREATE NOTE
		    NoteService.save($scope.data, 
		        function (response) {
		            $log.info('#save success, id: '+response.data._id);
			    	$scope.saved = true;
			    	_note = response;
			    	setData(_note.data);
		        },
		        function (response) {
		            $log.info('#save error');
		            $log.info(response);
		            $scope.saved = false;
		    });
    	}
    };

 
    $scope.delete = function () {
    	
    	//_note.$delete(
		NoteService.delete({id: $scope.data._id}, 
	        function (response) {
	            $log.info('#delete success, id: '+$scope.data._id);

	            Messages.new("Note supprimée");
	            Messages.show();

	        	$state.go('notes.list', {}, { reload: true });
	        },
	        function (response) {
	            $log.info('#delete error');
	            $log.info(response);
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
			$log.info('Suppresion annulé');
		});
	};

	// initialization
	if ($stateParams.id) {
		
		$rootScope.page.title = 'Chargement...';
		getNote($stateParams.id);
		
	} else {
		$rootScope.page.title = 'Nouvelle note...';
		_note = new NoteService();
	}

});