// Generated by CoffeeScript 1.3.3
(function() {
  var file, files;

  files = ["js/vendor/jquery.min", "js/vendor/jquery.mobile.router.min", "js/vendor/underscore-min", "js/vendor/backbone", "js/templates", "js/config/config", "js/config/envs/dev", "js/helpers/render", "js/router", "js/app", "js/init", "js/vendor/jquery.mobile-1.1.0.min"];

  files = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      file = files[_i];
      _results.push("" + file + ".js");
    }
    return _results;
  })();

  if (typeof $script !== "undefined" && $script !== null) {
    $script.order(files);
  }

  if (typeof exports !== "undefined" && exports !== null) {
    module.exports = files;
  }

}).call(this);
