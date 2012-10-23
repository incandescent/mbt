module.exports = function(grunt) {

  grunt.initConfig({
    replace: {
      coffee: {
        files: {
          'tasks/init/project/root/app/coffee/': 'src/coffee/**/**.coffee'
        },
        options: {
          variables: { "mbt_app_name__": '{%=js_safe_name%}' },
          prefix: "___"
        }
      },
      js: {
        files: {
          'tasks/init/project/root/app/js/': 'tmp/generated/**/**.js'
        },
        options: {
          variables: { "mbt_app_name__": '{%=js_safe_name%}' },
          prefix: "___"
        }
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
        src: ['src/coffee/**/*.coffee'],
        dest: 'tmp/generated',
        options: {
          bare: true,
          preserve_dirs: true,
          base_path: 'src/coffee'
        }
      }
    },
    lint: {
      // src: [ 'tmp/generated/**/*.js' ]
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
      app: "<config:coffee.app.src>",
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
      },
      js_proj_jasmine: {
        command: 'cd tmp/test_project_js && npm install && grunt && grunt test',
        stdout: true
      },
      cs_proj_jasmine: {
        command: 'cd tmp/test_project_cs && npm install && grunt && grunt test',
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
    grunt.tasks(["init:project:coffee"], { name: "test_project_cs", dest: "tmp/test_project_cs", force: true});
  });

  // Default task.
  grunt.registerTask("build", "coffeelint coffee replace:js replace:coffee");
  grunt.registerTask("gen_js_proj", "clean:js_proj generate_js_proj");
  grunt.registerTask("gen_cs_proj", "clean:cs_proj generate_cs_proj");
  grunt.registerTask("test_js_proj", "gen_js_proj exec:js_proj_jasmine");
  grunt.registerTask("test_cs_proj", "gen_cs_proj exec:cs_proj_jasmine");

  grunt.registerTask("default", "clean:tmp build");
};
