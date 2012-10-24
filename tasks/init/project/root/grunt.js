var fs = require('fs');
var extend = require('node.extend');
var path = require('path');

module.exports = function (grunt) {

  function all_js() {
    try {
      return require('./app/js/files.js')().map(function (file) {
        return "app/" + file;
      });
    } catch (e) {
      console.log(e);
      return []
    }
  }

  function app_js() {
    return grunt.utils._.reject(all_js(), function(path) {
      return path.lastIndexOf("app/js/vendor/", 0) === 0 ||
             path.lastIndexOf("phonegap/", 0) === 0;
    });
  }

  // load js paths
  var cfgPath = "tasks/cfg";
  var jsFiles = all_js();

  //jsFiles.unshift('phonegap/iphone/www/cordova-1.7.0.js');

  var cfg = {
    js: {
      files: jsFiles
    },

    coffee: {
      app: {
        src: ['app/coffee/**/*.coffee'],
        dest: 'app/js',
        options: {
          bare: true,
          preserve_dirs: true,
          base_path: 'app/coffee'
        }
      }
    },
    coffeelint: {
      app: "<config:coffee.app.src>"
    },

    css: {
      files: ["app/css/**/*.css" ]
    },

    views: {
      files: ["app/views/*.html"]
    },

    templates: {
      files: ["app/templates/*.html.tmpl"]
    },

    lint: {
      files: app_js()
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
      src: '<config:js.files>',
      specs : [ 'specs/unit/*_spec.js' ],
      helpers : 'specs/unit/helpers/**/*.js'
    },

    jasmine_node: {
      project_root: "specs/integration",
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
      },
      coffee: {
        files: 'app/coffee/**/*.coffee',
        tasks: 'coffee'
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
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-jasmine-runner');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.renameTask('jasmine', 'jasmine-headless');
  grunt.renameTask('jasmine-server', 'jasmine');
  grunt.registerTask('default', 'coffeelint coffee jst mincss tmplmin concat');
  grunt.registerTask('test', 'default jasmine')
}
