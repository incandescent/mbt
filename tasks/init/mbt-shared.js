// share files template
exports.template = function(grunt, init, done) {
  var props = grunt.task._options.mbt_props || {},
      files = init.filesToCopy(props);
  // we only process package.json
  init.copyAndProcess(files, props, { noProcess: "!package.json" });
  done();
};