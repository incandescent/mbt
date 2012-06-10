module.exports = function(grunt) {

  var minify = require('html-minifier').minify;

  grunt.registerMultiTask('tmplmin', 'Minify html templates to one file with kangax html-minifier.', function () {
    var files,
        dest,
        destContent,
        content = '',
        bodyRegex = /(<body.*?>)[\s\S]*?(<\/body>)/i;

    // check if config is valid
    if (grunt.utils._.isString(this.file.dest) == false) {
      grunt.fatal('Please specify the destination property (must be a string)');
    }

    if (grunt.utils._.isArray(this.file.src) == false && grunt.utils._.isString(this.file.src) == false) {
      grunt.fatal('Please specify the source property (must be a string )');
    }

    dest = this.file.dest;
    files = grunt.file.expandFiles(this.file.src);

    var destContent = grunt.file.read(dest);

    grunt.utils._(files).each(function (filepath) {
      content += grunt.file.read(filepath);
    });

    content = minify(content, grunt.config('htmlminifier'));
    grunt.file.write(dest, destContent.replace(bodyRegex, "$1" + content + "$2"));
  });
};
