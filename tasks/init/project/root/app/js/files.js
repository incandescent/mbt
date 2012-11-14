var {%=js_safe_name%};

if (typeof {%=js_safe_name%} === "undefined" || {%=js_safe_name%} === null) {
  {%=js_safe_name%} = this.{%=js_safe_name%} = {};
}

/* {%=js_safe_name%} dependecies
*/


{%=js_safe_name%}.files = function(env) {
  if (env == null) {
    env = "dev";
  }
  if (env === "prod") {
    return "asset/app.js";
  }
  return ["js/vendor/jquery.min.js", "js/vendor/jquery.mobile.router.min.js", "js/vendor/underscore-min.js", "js/vendor/backbone.js", "js/templates.js", "js/config/config.js", "js/config/envs/" + env + ".js", "js/helpers/render.js", "js/router.js", "js/app.js", "js/init.js", "js/vendor/jquery.mobile-1.1.0.js"];
};

if (typeof exports !== "undefined" && exports !== null) {
  module.exports = {%=js_safe_name%}.files;
}
