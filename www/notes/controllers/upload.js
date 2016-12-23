
myapp.controller('UploadCtrlOld', function($scope, $rootScope, userService, NotesService){
    $rootScope.page.title = 'Nouvelle note...';
    $scope.debounce = {"debounce": 900};
    var count = 0;

    $scope.note = new NotesService();

    $scope.updateTitle = function (title) {
    	$rootScope.page.title = title;
    	console.log("updateTitle: "+title);
    	$scope.save();
    };

    $scope.save = function () {
    	console.log($scope.data);
    	count += 1;
    	console.log("count: "+count);

    	$scope.note.title = $scope.data.title;
    	$scope.note.content = $scope.data.content;

	    NotesService.save($scope.note, 
	        function (response) {
	            console.log('#success');
	        	console.log(response);
	        	console.log('ID: '+response._id);

		    	$scope.note.id = response._id;

		    	console.log($scope.note);

	        },
	        function (response) {
	            console.log('#error');
	            for (var row in response.data) {
	                $scope.errors[row] = response.data[row];
	                console.log(row+' '+response.data[row]);
	            }
	    }); 

    };

 


});


    
myapp.controller('UploadCtrl', function($scope, $rootScope, Upload, $window){
	var vm = this;
	vm.submit = function(){ //function to call on form submit
	    if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
	        vm.upload(vm.file); //call upload function
	    }
	}
	vm.upload = function (file) {
	    Upload.upload({
	        url: 'http://localhost:3000/api/notes/files', //webAPI exposed to upload the file
	        data:{file:file} //pass file as data, should be user ng-model
	    }).then(function (resp) { //upload function returns a promise
	        if(resp.data.error_code === 0){ //validate success
	            $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
	        } else {
	            $window.alert('an error occured');
	        }
	    }, function (resp) { //catch error
	        console.log('Error status: ' + resp.status);
	        $window.alert('Error status: ' + resp.status);
	    }, function (evt) { 
	        console.log(evt);
	        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	        vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
	    });
	};
});