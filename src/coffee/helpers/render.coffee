###
Renders and caches given template for given data.

@param name - template name
@param data - data to render
###
___mbt_app_name__.render = (name, data) ->
  JST["app/templates/#{name}.html.tmpl"](data)
