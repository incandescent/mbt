// load jquery first
$script(['js/vendor/jquery.min.js', "js/config/config.js"], "jquery");

// jquery loaded
$script.ready("jquery", function () {
  var jqmReady = $.Deferred(),
      pgReady = $.Deferred(),
      filesReady = $.Deferred();

  // JQM, PhoneGap and all dependencies ready
  $.when(jqmReady, pgReady, filesReady).then(function () {
    // initialize APP
    {%= js_safe_name %}.init();
  });

  //jqm ready
  $(document).on("mobileinit", jqmReady.resolve);

  // phonegap ready
  if ("undefined" != typeof PhoneGap) {
    document.addEventListener("deviceready", pgReady.resolve, false);
  }
  else {
    pgReady.resolve();
  }

  // in prod load minified version app.js
  if ({%= js_safe_name %}.config.env == "prod") {
    $script("assets/app.js", filesReady.resolve);
  }
  else {
    // in other envs load all files
    $script("js/files.js", function () {
      files.push("js/config/envs/" + {%= js_safe_name %}.config.env + ".js");
      $script.order(files, filesReady.resolve);
    });
  }
});
