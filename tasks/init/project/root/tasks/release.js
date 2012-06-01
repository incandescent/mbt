module.exports = function(grunt) {

  grunt.registerMultiTask('release', 'Release application', function () {
    grunt.task.run("jst mincss lint concat min");

    var file = grunt.file;

    // android
    file.copy("app/assets/app.css", "./phonegap/android/assets/www/app.css");
    file.copy("app/assets/app.js", "./phonegap/android/assets/www/app.js");

    // iphone
    file.copy("app/assets/app.css", "./phonegap/iphone/www/app.css");
    file.copy("app/assets/app.js", "./phonegap/iphone/www/app.js");

    // images
    file.expand('app/images/*.*').forEach(function (img) {
      var name = img.split('/').pop();
      grunt.file.copy(img, "./phonegap/android/assets/www/images/" + name);
      grunt.file.copy(img, "./phonegap/iphone/www/images/" + name);
    });
  });
};
