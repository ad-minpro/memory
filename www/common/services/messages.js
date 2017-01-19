
myapp.factory('Messages', function($mdToast) {

  var message = {};
  var toast = '';

  message.new = function(content) {
    toast = $mdToast.simple().textContent(content).position('top right').hideDelay(3000);
    return 'nothing';
  };

  message.show = function() {
    return $mdToast.show(toast);
  };

  return message;

});