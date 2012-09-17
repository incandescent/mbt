var path = require('path');

// share files template
exports.template = function(grunt, init, done) {
  var props = grunt.task._options.mbt_props || {},
      files = init.filesToCopy(props),
      dest = grunt.option('dest');

  // if there is a dest param, hack the init destpath
  if (typeof dest !== "undefined" && dest !== null) {
    // don't use process.cwd()...use dest
    init.destpath = path.join.bind(path, dest);
  }

  // we only process package.json
  init.copyAndProcess(files, props, { noProcess: "!package.json" });
  done();
};