var fs = require('fs');
var extend = require('node.extend');
var path = require('path');

module.exports = function (grunt) {

  // load js paths
  var cfgPath = "tasks/cfg";
  var jsFiles = require('./app/js/files.js').map(function (file) {
    if (file == "js/config/envs/dev.js") {
      file = "js/config/envs/prod.js";
    }
    return "app/" + file;
  });

  jsFiles.unshift('phonegap/iphone/www/cordova-1.7.0.js');

  var cfg = {
    js: {
      files: jsFiles
    },

    css: {
      files: ["app/css/*.css", "app/css/jquery.mobile/*.css"]
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
        browser: true,
        curly: false,
        eqeqeq: false,
        expr: true,
        forin: false,
        newcap: true,
        laxcomma: true,
        strict: false
      },
      globals: {
        "_": true,
        "$": true,
        "$script": true,
        "Backbone": true,
        "jQuery": true
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
        'app/js/routes/*.js',
        'app/js/modules/*.js',
        'app/files.js',
        'app/router.js',
        'app/init.js',
        'app/app.js']
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
    },

    release: {
      "app/assets/app.js": '<config:js.files>'
    }
  };
 
  // deep-merge user configs
  if (path.existsSync(cfgPath)) {
    grunt.utils._.each(fs.readdirSync(cfgPath), function(cfg_file) {
      if (cfg_file.match(/.*\.json$/)) {
        extend(true, cfg, JSON.parse(fs.readFileSync(cfgPath + '/' + cfg_file))); 
      } 
    });
  }

  grunt.initConfig(cfg);

  // Load local tasks
  grunt.loadTasks("tasks");
  grunt.loadNpmTasks('grunt-jasmine-task');
  grunt.registerTask('default', 'watch');
}
