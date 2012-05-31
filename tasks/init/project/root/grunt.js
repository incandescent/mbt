module.exports = function (grunt) {

  // load js paths
  var jsFiles = require('./app/js/files.js').map(function (file) {
    return "app/" + file;
  });

  grunt.initConfig({

    js: { files: jsFiles },

    css: {
      files: ["app/css/*.css"]
    },

    views: {
      files: ["app/views/*.html"]
    },

    templates: {
      files: ["app/templates/*.html.tmpl"]
    },

    lint: {
      files: ['app/js/*.js']
    },

    jshint: {
      options: {
        asi: true,
        curly: true,
        eqeqeq: false,
        expr: true,
        forin: false,
        newcap: true,
        laxcomma: true,
        strict: true
      }
    },

    htmlminifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: false,
      removeRedundantAttributes: false,
      removeEmptyAttributes: false,
      removeOptionalTags: true
    },

    mocha: {
      index: ['specs/index.html']
    },

    concat: {
      'app/assets/app.js': '<config:js.files>',
    },

    jasmine: {
      index: ['spec/javascripts/index.html']
    },

    lint: {
      files: [
        'app/js/config/*.js',
        'app/js/helpers/*.js',
        'app/js/models/*.js',
        'app/js/views/*.js',
        'app/js/modules/*.js']
    },

    // tasks configs
    min: {
      "app/assets/app.js": '<config:js.files>'
    },

    jst: {
      "app/js/templates.js": '<config:templates.files>'
    },

    tmplmin: {
      dist: {
        src: '<config:views.files>',
        dest: "app/index.html"
      }
    },

    mincss: {
      "app/assets/app.css": '<config:css.files>'
    },

    watch: {
      templates: {
        files: '<config:views.files>',
        tasks: 'tmplmin'
      },
      jst: {
        files: '<config:templates.files>',
        tasks: "jst"
      },
      mincss: {
        files: '<config:css.files>',
        tasks: "mincss"
      }
    }
  });

  // Load local tasks
  grunt.loadTasks("tasks");
  grunt.loadNpmTasks('grunt-jasmine-task');
  grunt.registerTask('default', 'watch');
}
