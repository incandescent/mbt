// {%= name %}  namespace
if (typeof {%= js_safe_name %} === "undefined") {
  var {%= js_safe_name %} = this.{%= js_safe_name %} = {};
}

(function(app) {

  function getUrlParams () {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value.split("#")[0];
    });
    return vars;
  }

  // {%= name %} dependecies
  app.files = function files(env) {
    if (!env) env = "dev";

    if (env == "prod") {
      return "asset/app.js";
    } else return [
      // vendor
      "js/vendor/jquery.min.js",
      "js/vendor/jquery.mobile.router.min.js",
      "js/vendor/underscore-min.js",
      "js/vendor/backbone.js",
      "js/templates.js",

      // config
      "js/config/config.js",
      "js/config/envs/" + env + ".js",

      // add your app dependecies here

      // helpers
      "js/helpers/render.js",

      // models

      // collections

      // views

      // app
      "js/router.js",
      "js/app.js",
      "js/init.js",

      // load jquery mobile last
      "js/vendor/jquery.mobile-1.1.0.js"
    ];
  };

  // load all
  if (typeof $script !== "undefined") {
    $script.order(app.files(getUrlParams().env || "dev"));
  }

  if (typeof exports !== 'undefined') {
    module.exports = app.files;
  }
})({%= js_safe_name %})