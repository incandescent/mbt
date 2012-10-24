var fs = require('fs'),
    path = require('path'),
    // configs specifying lang-specific paths
    LANGS = {
      coffee: {
        include: [ "app/coffee/**", "app/js/**" ]
      },
      js: {
        include: [ "app/js/**" ]
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
      'spec/lib/**',
      'spec/vendors/**',
      'tasks/**'
    ];

// expand the files included for a specific language
function expand_lang_specific_files(grunt, template_name, config) {
  var _ = grunt.utils._,
      pathPrefix = 'init/' + template_name + '/root/',
      included;

  function prefix(obj) { return pathPrefix + '/' + obj }
  function unprefix(obj) { return obj.rel.slice(pathPrefix.length); }

  included = grunt.task.expandFiles({dot: true}, _.map(config.include, prefix));

  return _.map(included, unprefix);
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
      var files;

      grunt.log.header(("Generating project " + props.name + " (" + props.js_safe_name + ")").green.bold);

      // if there is a dest param, hack the init destpath
      if (typeof dest !== "undefined" && dest !== null) {
        // don't use process.cwd()...use dest
        init.destpath = path.join.bind(path, dest);
      }

      // fix up paths, exclude any other language-specific paths
      files = expand_lang_specific_files(grunt, template_name, LANGS[lang]);
      console.log(files);
      _.each(LANGS, function(lang_config, key) {
        if (key == lang) return;
        var paths = expand_lang_specific_files(grunt, template_name, lang_config);
        _.chain(paths).reject(function(path) {
          return _(files).contains(path);
        }).each(function(path) {
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
