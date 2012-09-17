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
    // XXX: DANGER: multi task config values CANNOT be object literals
    // doing so will nuke CWD: https://github.com/reputation/grunt-clean/commit/ca16fa815c20f5a19f6ea98a23d1159480bf1b33
    // (fix not published yet)
    clean: {
      tmp: "tmp",
      js_proj: "tmp/test_project_js",
      cs_proj: "tmp/test_project_cs"
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
        tasks: "clean:tmp build:coffee"
      },
      js: {
        files: "<config:replace.js.src>",
        tasks: "clean:tmp build:js"
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

  grunt.loadTasks('tasks');

  /* generate us some projects! */
  grunt.registerTask('generate_js_proj', 'Generate an MBT JS project', function() {
    grunt.tasks(["init:project"], { name: "test_project_js", dest: "tmp/test_project_js", force: true });
  });
  grunt.registerTask('generate_cs_proj', 'Generate an MBT JS project', function() {
    grunt.tasks(["init:project-coffee"], { name: "test_project_cs", dest: "tmp/test_project_cs", force: true});
  });

  // Default task.
  grunt.registerTask("build:coffee", "replace:coffee coffeelint coffee lint");
  grunt.registerTask("build:js", "replace:js lint");
  grunt.registerTask("diffjs", "exec:diffjs");
  grunt.registerTask("gen_js_proj", "clean:js_proj generate_js_proj");
  grunt.registerTask("gen_cs_proj", "clean:cs_proj generate_cs_proj");
  grunt.registerTask("default", "clean:tmp replace:coffee replace:js coffeelint coffee lint replace:unreplace");


};
