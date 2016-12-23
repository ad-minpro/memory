var mkdirp = require('mkdirp')

var getUploadPath = function() {
  var root = "uploads";
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  var path = root+'/'+yyyy+'/'+mm;
  console.log(path);

  return path;
};

var mkUploadPath = function() {
  var path = getUploadPath();

  mkdirp(path, function (err) {
    if (err) console.error(err)
    else console.log('pow!')
  });

  return path;
};

var checkUploadPath = function(req, res, next) {

  var path = getUploadPath();

  mkdirp(path, function (err) {
    if (err) console.error(err)
    else console.log('pow!')
  });

  next();
};






exports.getUploadPath = getUploadPath;
exports.checkUploadPath = checkUploadPath;
exports.mkUploadPath = mkUploadPath;
//module.exports = checkUploadPath;