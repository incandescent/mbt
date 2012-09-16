var fs = require('fs'),
    LANGS = [ 'coffee' ],
    MBT_PREFIX = "project";

// the generic MBT template, supports invocation w/ various langs
module.exports = {
    description: "Mobile Build Tool",
    notes: "This tool will help you install, configure, build, and maintain your mobile project.",
    warnOn: '*',
    template: function (grunt, init, done) {

      var _ = grunt.utils._,
          lang = _.first(_.intersection(LANGS, _.keys(this.flags)));

      // we have been invoked with a language variant
      // if we are not running as the correctly language init template run that task instead
      // we have to do this because the init task closure contains the template path prefix
      // (nothing we can do about it other than running the other template)
      if (lang && !(this.flags[MBT_PREFIX + '-' + lang])) {
        grunt.task.run('init:' + MBT_PREFIX + '-' + lang);
        done();
        return;
      }

      // prompt for the project name
      grunt.helper('prompt', {}, [ grunt.helper('prompt_for', 'name') ], function(err, props) {
        // configure done callback such that the mbt-shared template runs before this template
        var prevDone = grunt.task._options.done;

        grunt.task._options.done = function() {
          // copy lang files after shared files
          // Files to copy (and process).
          var files = init.filesToCopy(props);
          // Actually copy (and process) files.
          init.copyAndProcess(files, props);

          prevDone && prevDone();
        };

        grunt.task._options.mbt_props = props;

        // run mbt-shared first
        grunt.task.run('init:mbt-shared');

        done();
      });
    }
};