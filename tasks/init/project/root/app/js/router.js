/* setup router
*/

{%=js_safe_name%}.initRouter = function() {
  var handlers, options;
  handlers = {};
  options = {};
  return this.router = new $.mobile.Router({}, handlers, options);
};
