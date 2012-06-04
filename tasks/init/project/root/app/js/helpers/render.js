(function ({%= js_safe_name %}, JST) {

  "use strict";

  /**
   * Renders and caches given template for given data.
   *
   * @param name - template name
   * @param data - data to render
   */
  {%= js_safe_name %}.render = function (name, data) {
    return JST['app/templates/' + name + '.html.tmpl'](data);
  }

})({%= js_safe_name %}, JST);
