var fs = require('fs'),
    path = require('path'),
    LANGS = [ 'coffee' ],
    MBT_PREFIX = "project";

// the generic MBT template, supports invocation w/ various langs
module.exports = {
    description: "Mobile Build Tool",
    notes: "This tool will help you install, configure, build, and maintain your mobile project.",
    //warnOn: '*',
    template: function (grunt, init, done) {

      var _ = grunt.utils._,
          lang = _.first(_.intersection(LANGS, this.args)),
          name = grunt.option('name'),
          dest = grunt.option('dest'),
          this_task_name = this.nameArgs,
          MBT_PROPS = grunt.option.bind(grunt.option, 'mbt_props'),
          mbt_props = MBT_PROPS(),
          project_options = null;

      // we have been invoked with a language variant
      // if we are not running as the correctly language init template run that task instead
      // we have to do this because the init task closure contains the template path prefix
      // (nothing we can do about it other than running the other template)
      if (lang && this.args[0] != (MBT_PREFIX + '-' + lang)) {
        grunt.task.run('init:' + MBT_PREFIX + '-' + lang + ":" + this.args.slice(1).join(":"));
        done();
        return;
      }

      // shared template has been run, so now run the lang-specific template
      if (grunt.option('mbt-shared-complete')) {
        // copy lang files after shared files
        // Files to copy (and process).
        if (!mbt_props) throw new Error("mbt-shared template could not find project prompt values.");

        // if there is a dest param, hack the init destpath
        if (typeof dest !== "undefined" && dest !== null) {
          // don't use process.cwd()...use dest
          init.destpath = path.join.bind(path, dest);
        }

        // Actually copy (and process) files.
        init.copyAndProcess(init.filesToCopy(mbt_props), mbt_props);

        done();
      } else {
        // queues shared template task and this template task (again)
        // first the internal mbt-shared template is run, followed by the appropriate project template
        function queue_template_tasks(err, props) {
          grunt.log.header(("Generating project " + props.name + " (" + props.js_safe_name + ")").green.bold);

          // stash the prompts in a synthetic option for use downstream in mbt-shared template
          MBT_PROPS(props);

          // run mbt-shared first
          grunt.task.run('init:mbt-shared');
          // call ourselves again
          grunt.task.run(this_task_name);

          done();
        }

        // if name option is supplied to cli, just use it, otherwise prompt for name
        if (typeof name !== "undefined" && name !== null) {
          // use name option value
          project_options = { name: name };
          // invoke the same sanitizer that the prompt uses
          // send no-op done() function
          grunt.helper('prompt_for_obj').name.sanitize(name, project_options, function() {});
          queue_template_tasks(null, project_options);
        } else {
          // prompt for the project name
          grunt.helper('prompt', {}, [ grunt.helper('prompt_for', 'name') ], queue_template_tasks);
        }
      }
    }
};