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
    grunt.helper('prompt', {type: 'project'}, [
      {
        name: 'name',
        message: 'Type project namespace (choose something short, no spaces):',
        default: '',
        sanitize: function(value, data, done) {
          data.js_safe_name = value.replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
          done();
        }
      }
    ], function (err, props) {

      //props.name = props.namespace
      console.log(props);

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
