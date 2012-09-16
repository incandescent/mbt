module.exports = function(grunt) {

  grunt.initConfig({
    lint: {
      files: [
        "tasks/init/*.js",
      ]
    },
    watch: {
      files: "<config:lint.files>",
      tasks: "default"
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  // Load local tasks.
  //grunt.loadTasks("local-tasks");

  // Default task.
  grunt.registerTask("default", "lint");
};
