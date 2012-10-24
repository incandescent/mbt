{%=js_safe_name%} = @{%=js_safe_name%} = {} unless {%=js_safe_name%}?

{%=js_safe_name%}.getUrlParams = ->
  vars = {}
  window.location.href.replace /[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) ->
    vars[key] = (value.split("#")[0])
  vars

if $script?
  $script.order({%=js_safe_name%}.files(getUrlParams().env), '{%=js_safe_name%}', ->
    $(-> {%=js_safe_name%}.init()))