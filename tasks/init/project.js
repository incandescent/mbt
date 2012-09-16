var fs = require('fs'),
    DIRS = {
      js:     [ 'app/js/models', 'app/js/collections', 'app/js/views' ],
      coffee: [ 'app/coffee/models', 'app/coffee/collections', 'app/coffee/views' ],
      common: [ 'app/templates', 'app/views' ]
    },
    LANGS = [ 'coffee' ],
    MBT_PREFIX = "project";

// make directory path
function mkdirp(_, path) {
  var parts = path.split("/");
  if( parts[0] == '' ) {
    parts = _.rest(parts);
  }
  _.reduce(parts, function(curPath, part) {
    curPath = curPath + "/" + part;
    try {
      fs.statSync(curPath);
    } catch(e) {
      fs.mkdirSync(curPath, 0777);
    }
    return curPath;
  });
}

// synchronously make list of dirs
function makeDirs(_, dirs) {
  _.each(dirs, function(dir) {
    mkdirp(_, dir);
  });
}

// the generic MBT template, supports invocation w/ various langs
module.exports = {
    description: "Mobile Build Tool",
    notes: "This tool will help you install, configure, build, and maintain your mobile project.",
    warnOn: '*',
    template: function (grunt, init, done) {

      var _ = grunt.utils._,
          lang = _.first(_.intersection(LANGS, _.keys(this.flags))),
          custom_dirs = [];

      // we have been invoked with a language variant
      // if we are not running as the correctly language init template run that task instead
      // we have to do this because the init task closure contains the template path prefix
      // (nothing we can do about it other than running the other template)
      if (lang && !(this.flags[MBT_PREFIX + '-' + lang])) {
        grunt.task.run('init:' + MBT_PREFIX + '-' + lang);
        done();
        return;
      }

      // select custom dirs specified by project style flag
      _.each(DIRS, function(value, key) {
        if (this.flags[key] || this.flags[MBT_PREFIX + '-' + key]) {
          Array.prototype.push.apply(custom_dirs, value);
        }
      }, this);

      function copyTemplate(props) {
        // Files to copy (and process).
        var files = init.filesToCopy(props);
        // Actually copy (and process) files.
        init.copyAndProcess(files, props);

        // create standard js dirs
        makeDirs(grunt.utils._, DIRS.js);
        // create custom project dirs (if any)
        makeDirs(grunt.utils._, custom_dirs);
        // create common dirs
        makeDirs(grunt.utils._, DIRS.common);
      }

      // prompt for the project name
      grunt.helper('prompt', {}, [ grunt.helper('prompt_for', 'name') ], function(err, props) {
        // configure done callback such that the mbt-shared template runs before this template
        var prevDone = grunt.task._options.done;
        grunt.task._options.done = function() {
          // copy lang files after shared files
          copyTemplate(props);
          prevDone && prevDone();
        };
        grunt.task._options.mbt_props = props;
        // run mbt-shared first
        grunt.task.run('init:mbt-shared');
        done();
      });
    }
};