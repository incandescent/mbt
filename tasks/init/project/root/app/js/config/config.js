/* {%=js_safe_name%} namespace
*/

var {%=js_safe_name%};

if (typeof {%=js_safe_name%} === "undefined" || {%=js_safe_name%} === null) {
  {%=js_safe_name%} = this.{%=js_safe_name%} = {};
}

/* config shared by all environments
*/


{%=js_safe_name%}.config = {
  version: "0.0.1",
  /* available envs: dev, test, prod
  */

  env: "dev"
};
