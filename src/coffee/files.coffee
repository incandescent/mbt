___mbt_app_name__ = @___mbt_app_name__ = {} unless ___mbt_app_name__?

getUrlParams ->
  vars = {}
  window.location.href.replace /[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) ->
    vars[key] = (value.split("#")[0])
  vars

### ___mbt_app_name__ dependecies ###
___mbt_app_name__.files = (env) ->
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

### load all ###
$script.order(___mbt_app_name__.files(getUrlParams().env || "dev")) if $script?
module.exports = ___mbt_app_name__.files if exports?
