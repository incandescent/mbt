# {%= js_safe_name %} {%= name %} dependecies
files = [
  # vendor
  "js/vendor/jquery.min"
  "js/vendor/jquery.mobile.router.min"
  "js/vendor/underscore-min"
  "js/vendor/backbone"
  "js/templates"

  # config
  "js/config/config"
  "js/config/envs/dev"

  # add your app dependecies here

  # helpers
  "js/helpers/render"

  # models

  # collections

  # views

  # app
  "js/router"
  "js/app"
  "js/init"

  # load jquery mobile last
  "js/vendor/jquery.mobile-1.1.0.min"
]

files = ("#{file}.js" for file in files)

# load all
$script.order(files) if $script?
module.exports = files if exports?
