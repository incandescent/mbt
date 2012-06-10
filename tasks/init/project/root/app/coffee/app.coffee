(({%= js_safe_name %}) ->

  "use strict";

  # initialize {%= name %} app
  {%= js_safe_name %}.init = () ->

    # intialize router
    @.initRouter();

)({%= js_safe_name %});

