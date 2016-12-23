myapp.controller('mainCtrl', function($timeout, $state, $scope){

    console.log("mainCtrl");
    
    // Detact Mobile Browser
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
       angular.element('html').addClass('ismobile');
    }

    //$scope.title = "Hello, Valence Nord !"
    //$scope.subtitle = "n/c"
});


myapp.controller('AppCtrl', function ($scope, $timeout, $log) {

});
