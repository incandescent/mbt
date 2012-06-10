var fs = require('fs');

exports.description = "Mobile Build Tool";
exports.notes = "This tool will help you install, configure, build, and maintain your mobile project.";

exports.warnOn = '*';

exports.template = function (grunt, init, done) {

  if (this.flags.coffee) {
    // run coffee project
    grunt.task.run('init:project-coffee');
    done();
  }
  else {
    grunt.helper('prompt', {type: 'project'}, [ grunt.helper('prompt_for', 'name') ], function (err, props) {
      // Files to copy (and process).
      var files = init.filesToCopy(props);
      // Actually copy (and process) files.
      init.copyAndProcess(files, props);

      fs.mkdirSync('app/js/models');
      fs.mkdirSync('app/js/collections');
      fs.mkdirSync('app/js/views');

      fs.mkdirSync('app/templates');
      fs.mkdirSync('app/views');

      done();
    });
  }
};
