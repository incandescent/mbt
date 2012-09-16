module.exports = function(grunt) {

  grunt.initConfig({
    replace: {
      coffee: {
        src: ['tasks/init/project-coffee/root/app/coffee/**/*.coffee'],
        dest: 'tmp/coffee',
        variables: { " js_safe_name %}": '__tmp_app' },
        prefix: "{%="
      },
      js: {
        src: ["tasks/mbt-shared/root/tasks/**/*.js", "tasks/init/project*/**/*.js" ],
        dest: 'tmp/js',
        variables: { " js_safe_name %}": '__tmp_app' },
        prefix: "{%="
      },
      unreplace: {
        src: ["tmp/generated/*.js"],
        dest: 'tmp/compare',
        variables: { "tmp_app": '{% js_safe_name %}' },
        prefix: "__"
      }
    },
    clean: {
      folder: "tmp"
    },
    coffee: {
      app: {
        src: ['tmp/coffee/**/*.coffee'],
        dest: 'tmp/generated',
        options: {
          bare: true,
          preserve_dirs: true,
          base_path: 'tmp/coffee'
        }
      }
    },
    lint: {
      files: [ 'tmp/js/**/*.js' ]
             // coffeescript does not generate code w/ use strict statement
             // so skip linting and assume it all goes to plan
             // 'tmp/generated/**/*.js' ]
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
        es5: true,

        globalstrict: true,
        immed: false // this is just annoying
      },
      globals: {
        __tmp_app: true,
        document: true,
        JST: true,
        $: true,
        $script: true,
        PhoneGap: true
      }
    },
    coffeelint: {
      app: "<config:coffee.app.src>"
    },
    watch: {
      coffee: {
        files: "<config:replace.coffee.src>",
        tasks: "clean build:coffee"
      },
      js: {
        files: "<config:replace.js.src>",
        tasks: "clean build:js"
      }
    },
    exec: {
      diffjs: {
        command: 'diff -ydBb tmp/generated tmp/js',
        stdout: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-clean');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-exec');

  // Default task.
  grunt.registerTask("build:coffee", "replace:coffee coffeelint coffee lint");
  grunt.registerTask("build:js", "replace:js lint");
  grunt.registerTask("diffjs", "exec:diffjs");
  grunt.registerTask("default", "clean replace:coffee replace:js coffeelint coffee lint replace:unreplace");


};
