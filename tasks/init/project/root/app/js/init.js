var {%=js_safe_name%};

if (typeof {%=js_safe_name%} === "undefined" || {%=js_safe_name%} === null) {
  {%=js_safe_name%} = this.{%=js_safe_name%} = {};
}

{%=js_safe_name%}.getUrlParams = function() {
  var vars;
  vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    return vars[key] = (value.split("#")[0]);
  });
  return vars;
};

if (typeof $script !== "undefined" && $script !== null) {
  $script.order({%=js_safe_name%}.files(getUrlParams().env), '{%=js_safe_name%}', function() {
    return $(function() {
      return {%=js_safe_name%}.init();
    });
  });
}
