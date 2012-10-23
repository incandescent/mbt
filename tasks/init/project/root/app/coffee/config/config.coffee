### {%=js_safe_name%} namespace ###
{%=js_safe_name%} = @{%=js_safe_name%} = {} unless {%=js_safe_name%}?

### config shared by all environments ###
{%=js_safe_name%}.config =
  version: "0.0.1",
  ### available envs: dev, test, prod ###
  env: "dev"
