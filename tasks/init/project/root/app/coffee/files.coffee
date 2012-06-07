# {%= name %}  namespace
{%= js_safe_name %} = @{%= js_safe_name %} = {} unless {%= js_safe_name %}?

# {%= name %} dependecies
{%= js_safe_name %}.files = [
  # vendor
  "js/vendor/jquery.min.js",
  "js/vendor/jquery.mobile.router.min.js",
  "js/vendor/underscore-min.js",
  "js/vendor/backbone.js",
  "js/templates.js",

  # config
  "js/config/config.js",
  "js/config/envs/dev.js",

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
  "js/vendor/jquery.mobile-1.1.0.min.js"
];

# load all
$script.order({%= js_safe_name %}.files) if $script?
module.exports = {%= js_safe_name %}.files if exports?
