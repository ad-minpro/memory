'use strict';

var myapp = angular.module('myapp', [
	'ngResource', 
	'ngMaterial',
    'ngAnimate',
	'ngMdIcons',
    'ui.router', 
    'angularMoment', 
    'base64', 
    'ngFileUpload'
    //'ui.bootstrap'
])

myapp.run(function($rootScope) {
    $rootScope.page = {'title': '', 'subtitle': '' };
  });

/*
myapp.run(function($http) {
  $http.defaults.headers.common.Authorization = 'Basic ZWxhc3RpYzpjaGFuZ2VtZQ==';
});
*/

myapp.constant('API', 'http://localhost:9200');

