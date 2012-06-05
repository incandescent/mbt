// {%= name %}  namespace
if (typeof {%= js_safe_name %} === "undefined") {
  var {%= js_safe_name %} = this.{%= js_safe_name %} = {};
}

// {%= name %} dependecies
{%= js_safe_name %}.files = [
  // vendor
  "js/vendor/jquery.min.js",
  "js/vendor/jquery.mobile.router.min.js",
  "js/vendor/underscore-min.js",
  "js/vendor/backbone.js",
  "js/templates.js",

  // config
  "js/config/config.js",
  "js/config/envs/dev.js",

  // add your app dependecies here

  // helpers

  // models

  // collections

  // views

  // app
  "js/router.js",
  "js/app.js",
  "js/init.js",

  // load jquery mobile last
  "js/vendor/jquery.mobile-1.1.0.min.js"
];

// load all
if (typeof $script != "undefined") {
  $script.order({%= js_safe_name %}.files);
}

if (typeof exports != 'undefined') {
  module.exports = {%= js_safe_name %}.files;
}
