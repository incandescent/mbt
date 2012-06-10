# setup router
{%= js_safe_name %}.initRouter = () ->

  handlers =
    # define your route handlers here

  options =
    # router options

  @.router = new $.mobile.Router {
    # define your routes here
  }, handlers, options

