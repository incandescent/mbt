var path = require('path');

// share files template
exports.template = function(grunt, init, done) {
  var props = grunt.option('mbt_props') || null,
      files = init.filesToCopy(props),
      dest = grunt.option('dest');

  if (props === null) {
    throw new Error("mbt-shared template could not find project prompt values.");
  }

  // if there is a dest param, hack the init destpath
  if (typeof dest !== "undefined" && dest !== null) {
    // don't use process.cwd()...use dest
    init.destpath = path.join.bind(path, dest);
  }

  // we only process package.json
  init.copyAndProcess(files, props, { noProcess: "!package.json" });

  // inform parent template task we've completed
  grunt.option('mbt-shared-complete', true);

  done();
};