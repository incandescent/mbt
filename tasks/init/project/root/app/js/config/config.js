/*global module:false, exports:false */

// test namespace
if (typeof test === "undefined") {
  var test = this.test = {};

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = test;
  }
}

// config shared by all environments
test.config = {
  version: "0.0.1",
  env: "dev" // available envs: dev, test, prod
};
