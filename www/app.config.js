myapp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/notes/list');
    
    $stateProvider
        
        .state('login', {
            url: '/login',
            templateUrl: 'auth/partials/login.html', 
            controller: 'LoginCtrl'
        })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard/partials/dashboard.html'
        })

        .state('dashboard-old', {
            url: '/dashboard-old',
            templateUrl: 'dashboard/partials/dashboard_old.html'
        })

        .state('notes', {
            url: '/notes', 
            templateUrl: 'notes/partials/common.html'
        })       

        .state('notes.note', {
            url: '/note/:id',
            templateUrl: 'notes/partials/note.html', 
            controller: 'NoteCtrl'
        })  

        .state('notes.list', {
            url: '/list',
            templateUrl: 'notes/partials/list.html', 
            controller: 'NotesCtrl'
        })

        .state('notes.upload', {
            url: '/upload',
            templateUrl: 'notes/partials/upload.html'
            //controller: 'UploadCtrl'
        }); 

});