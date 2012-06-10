var fs = require('fs');

exports.description = "Mobile Build Tool";
exports.notes = "This tool will help you install, configure, build, and maintain your mobile project.";

exports.warnOn = '*';

exports.template = function (grunt, init, done) {

  grunt.helper('prompt', {}, [
    // Prompt for these values.
    {
      name: 'name',
      message: 'Type project namespace (choose something short, no spaces):',
      default: '',
      sanitize: function(value, data, done) {
        data.js_safe_name = value.replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
        done();
      }
    }
  ], function(err, props) {

    //props.name = props.namespace

    var files = init.filesToCopy(props);
    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // coffee folders
    fs.mkdirSync('app/coffee/models');
    fs.mkdirSync('app/coffee/collections');
    fs.mkdirSync('app/coffee/views');

    // js folders
    fs.mkdirSync('app/js/models');
    fs.mkdirSync('app/js/collections');
    fs.mkdirSync('app/js/views');

    fs.mkdirSync('app/templates');
    fs.mkdirSync('app/views');

    done();
  });
};
