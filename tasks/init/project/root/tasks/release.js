module.exports = function(grunt) {

  grunt.registerMultiTask('release', 'Release application', function () {
    grunt.task.run("jst mincss lint concat min");

    var file = grunt.file;
    var scriptRegex = /<script (.|\n)*>(.|\n)*?<\/script>/gi;

    // android
    file.copy("app/assets/app.css", "./phonegap/android/assets/www/assets/app.css");
    file.copy("app/assets/app.js", "./phonegap/android/assets/www/assets/app.js");

    // iphone
    file.copy("app/assets/app.css", "./phonegap/iphone/www/assets/app.css");
    file.copy("app/assets/app.js", "./phonegap/iphone/www/assets/app.js");

    // images
    file.expand('app/images/*.*').forEach(function (img) {
      var name = img.split('/').pop();
      grunt.file.copy(img, "./phonegap/android/assets/www/images/" + name);
      grunt.file.copy(img, "./phonegap/iphone/www/images/" + name);
    });

    var indexContent = grunt.file.read("app/index.html");
    indexContent = indexContent.replace(scriptRegex, '<script src="assets/app.js"></script>');
    file.write("phonegap/iphone/www/index.html", indexContent);
    file.write("phonegap/android/assets/www/index.html", indexContent);
  });
};
