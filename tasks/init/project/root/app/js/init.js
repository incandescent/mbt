var jqmReady, pgReady;

jqmReady = $.Deferred();

pgReady = $.Deferred();

/* JQM and PhoneGap are ready
*/


$.when(jqmReady, pgReady).then(function() {
  /* everything is ready here
  */

});

/* resolve phonegap
*/


if (typeof PhoneGap !== "undefined" && PhoneGap !== null) {
  document.addEventListener("deviceready", pgReady.resolve, false);
} else {
  pgReady.resolve();
}

/* jqm ready
*/


$(document).on("mobileinit", function() {
  /* init app after mobile is ready
  */
  {%=js_safe_name%}.init();
  return jqmReady.resolve();
});
