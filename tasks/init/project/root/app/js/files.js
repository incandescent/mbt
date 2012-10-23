var getUrlParams, {%=js_safe_name%};

if (typeof {%=js_safe_name%} === "undefined" || {%=js_safe_name%} === null) {
  {%=js_safe_name%} = this.{%=js_safe_name%} = {};
}

getUrlParams = function() {
  var vars;
  vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    return vars[key] = (value.split("#")[0]);
  });
  return vars;
};

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

/* load all
*/


if (typeof $script !== "undefined" && $script !== null) {
  $script.order({%=js_safe_name%}.files(getUrlParams().env || "dev"));
}

if (typeof exports !== "undefined" && exports !== null) {
  module.exports = {%=js_safe_name%}.files;
}
