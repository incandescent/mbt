"use strict";

// {%= name %} namespace
if (typeof {%= js_safe_name %} === "undefined") {
  var {%= js_safe_name %} = this.{%= js_safe_name %} = {};

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = {%= js_safe_name %};
    }
  }
}

// config shared by all environments
{%= js_safe_name %}.config = {
  version: "0.0.1",
  env: "dev", // available envs: dev, test, prod
};
