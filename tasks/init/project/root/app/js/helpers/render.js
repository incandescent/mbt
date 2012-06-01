(function (test, JST) {

  "use strict";

  /**
   * Renders and caches given template for given data.
   *
   * @param name - template name
   * @param data - data to render
   */
  test.render = function (name, data) {
    return JST['app/templates/' + name + '.html.tmpl'](data);
  }

})(test, JST);
