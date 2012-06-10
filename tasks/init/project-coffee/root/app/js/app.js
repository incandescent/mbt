(function ({%= js_safe_name %}) {

  "use strict";

  // initialize {%= name %} app
  {%= js_safe_name %}.init = function () {

    // intialize router
    this.initRouter();
  };

})({%= js_safe_name %});

