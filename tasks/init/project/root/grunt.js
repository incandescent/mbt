var fs = require('fs');
var extend = require('node.extend');
var path = require('path');

module.exports = function (grunt) {

  function resolve_js_files() {
    try {
      return require('./app/js/files.js').map(function (file) {
        if (file == "js/config/envs/dev.js") {
          file = "js/config/envs/prod.js";
        }
        return "app/" + file;
      });
    } catch (e) {
      return []
    }
  }

  // load js paths
  var cfgPath = "tasks/cfg";
  var jsFiles = resolve_js_files();

  jsFiles.unshift('phonegap/iphone/www/cordova-1.7.0.js');

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
      files: '<config:js.files>'
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
      specs : [ '**/*_spec.js' ],
      helpers : 'spec/unit/helpers/**/*.js'
    },

    jasmine_node: {
      project_root: "spec/integration",
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
  grunt.registerTask('default', 'coffeelint coffee jst mincss tmplmin');
  grunt.registerTask('test', 'default jasmine-server')
}
