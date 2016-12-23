
myapp.factory('Messages', function($mdToast) {

  var message = {};
  var toast = '';

  message.new = function(content) {
    toast = $mdToast.simple().textContent(content).position('top right').hideDelay(3000);
    console.log('add content');
    return 'nothing';
  };

  message.show = function() {
    console.log('show');
    return $mdToast.show(toast);
  };

  return message;

});