var fs = require('fs'),
    path = require('path'),
    // configs specifying lang-specific paths
    LANGS = {
      coffee: {
        include: "app/coffee/**"
      },
      js: {
        include: "app/js/**",
        // the vendor dir is not "js-specific", so it shouldn't be excluded by other langs
        except: "app/js/vendor/**"
      }
    },
    // static files we don't want to perform variable replacement on
    STATIC = [
      'app/assets/**',
      'app/css/**',
      'app/images/**',
      'app/js/vendor/**',
      'app/templates/**',
      'app/views/**',
      'app/index.html',
      'phonegap/**',
      'specs/**',
      'tasks/**'
    ];

// expand the files included for a specific language
// by first including included files
// and then excluding excluded files
function expand_lang_specific_files(grunt, template_name, config) {
  var _ = grunt.utils._,
      pathPrefix = 'init/' + template_name + '/root/',
      included = grunt.task.expandFiles({dot: true}, pathPrefix + '/' + config.include),
      excepted = [],
      rel_included = [],
      rel_excepted = [];

  if (config.except) {
    excepted = grunt.task.expandFiles({dot: true}, pathPrefix + '/' + config.except);
  }

  function strip(obj) { return obj.rel.slice(pathPrefix.length); }

  rel_included = _.map(included, strip);
  rel_excepted = _.map(excepted, strip);

  return _.reject(rel_included, function(path) {
    return _.any(rel_excepted, function(except) {
      return path.lastIndexOf(except, 0) === 0;
    });
  });
}

// the MBT project template, supports invocation w/ various langs
module.exports = {
  description: "Mobile Build Tool",
  notes: "This tool will help you install, configure, build, and maintain your mobile project.",
  warnOn: '*',
  template: function (grunt, init, done) {

    var _ = grunt.utils._,
        lang = _.first(_.intersection(_.keys(LANGS), this.args)) || 'js',
        name = grunt.option('name'),
        dest = grunt.option('dest'),
        template_name = this.args[0], // should be same name as this file name
        project_options = null;

    // queues shared template task and this template task (again)
    // first the internal mbt-shared template is run, followed by the appropriate project template
    function init_project(err, props) {
      grunt.log.header(("Generating project " + props.name + " (" + props.js_safe_name + ")").green.bold);

      // if there is a dest param, hack the init destpath
      if (typeof dest !== "undefined" && dest !== null) {
        // don't use process.cwd()...use dest
        init.destpath = path.join.bind(path, dest);
      }

      // fix up paths, exclude any other language-specific paths
      _.each(LANGS, function(lang_config, key) {
        if (key == lang) return;
        var paths = expand_lang_specific_files(grunt, template_name, lang_config);
        _.each(paths, function(path) {
          // exclude this path by setting a null rename
          init.renames[path]  = null;
        });
      });

      // Actually copy (and process) files. Don't process static files.
      init.copyAndProcess(init.filesToCopy(props), props, { noProcess: STATIC } );

      done();
    }

    // if name option is supplied to cli, just use it, otherwise prompt for name
    if (typeof name !== "undefined" && name !== null) {
      // use name option value
      project_options = { name: name };
      // invoke the same sanitizer that the prompt uses
      // send no-op done() function
      grunt.helper('prompt_for_obj').name.sanitize(name, project_options, function() {});
      init_project(null, project_options);
    } else {
      // prompt for the project name
      grunt.helper('prompt', {}, [ grunt.helper('prompt_for', 'name') ], init_project);
    }
  }
};