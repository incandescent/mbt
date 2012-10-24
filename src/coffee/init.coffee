___mbt_app_name__ = @___mbt_app_name__ = {} unless ___mbt_app_name__?

___mbt_app_name__.getUrlParams = ->
  vars = {}
  window.location.href.replace /[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) ->
    vars[key] = (value.split("#")[0])
  vars

if $script?
  $script.order(___mbt_app_name__.files(getUrlParams().env), '___mbt_app_name__', ->
    $(-> ___mbt_app_name__.init()))