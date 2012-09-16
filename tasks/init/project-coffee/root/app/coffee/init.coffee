jqmReady = $.Deferred()
pgReady = $.Deferred()

# JQM and PhoneGap are ready
$.when(jqmReady, pgReady).then () ->
  # everything is ready here

# resolve phonegap
if PhoneGap?
  document.addEventListener("deviceready", pgReady.resolve, false)
else
  pgReady.resolve()

# jqm ready
$(document).on "mobileinit", () ->
  # init app after mobile is ready
  {%= js_safe_name %}.init()
  jqmReady.resolve()
