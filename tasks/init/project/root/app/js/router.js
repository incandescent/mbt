(function () {

  "use strict";

  // setup router
  {%= js_safe_name %}.initRouter = function () {

    var handlers = {
      // define your route handlers here
    };

    var options = {
      // router options
    };

    this.router = new $.mobile.Router({
      // define your routes here
    }, handlers, options);
  };
})();
