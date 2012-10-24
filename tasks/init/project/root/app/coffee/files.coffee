{%=js_safe_name%} = @{%=js_safe_name%} = {} unless {%=js_safe_name%}?

### {%=js_safe_name%} dependecies ###
{%=js_safe_name%}.files = (env) ->
  env = "dev" unless env?

  return "asset/app.js" if env == "prod"
  return [
    # vendor
    "js/vendor/jquery.min.js",
    "js/vendor/jquery.mobile.router.min.js",
    "js/vendor/underscore-min.js",
    "js/vendor/backbone.js",
    "js/templates.js",

    # config
    "js/config/config.js",
    "js/config/envs/#{env}.js",

    # add your app dependecies here

    # helpers
    "js/helpers/render.js",

    # models

    # collections

    # views

    # app
    "js/router.js",
    "js/app.js",
    "js/init.js",

    # load jquery mobile last
    "js/vendor/jquery.mobile-1.1.0.js"
  ]

module.exports = {%=js_safe_name%}.files if exports?
