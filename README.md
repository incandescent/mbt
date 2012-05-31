mbt
===

# Mobile Build Tool

The tool is a set of libraries and tasks to help you install, configure, build, and maintain your mobile project based on Backbone.js and jQuery Mobile.
The project is based on wonderful library called Grunt.

TODO: describe it better

##Install:

    npm install -g mbt


##Generate new project:

    mkdir PROJECT_FOLDER
    cd PROJECT_FOLDER
    mbt init:project
    npm install ./


## Application file/folder structure

* app
  * assets - compressed css and JavaScript files
 * css
 * images
 * js
  * collections - backbone collections
  * config - app config, namespace, environments
  * helpers - app helpers
  * models - backbone models
  * routes - backbone routes
  * templates/templates.js - compiled templates from `templates` folder
  * vendor - vendor dependecies
  * views - backbone views
  * app.js - starting point for the app
  * files.js - array of paths to app source files
  * init.js - loads dependecies and initializes JQM, PhoneGap
 * templates - project html templates
 * views - jQuery Mobile pages
 * index.html


##Watch for changes in templates, views and styles:

    grunt watch

Templates will be compiled into one JavaScript file called `templates.js`.
Views will be minified and appended to body element in `index.html`.
CSS files will be minified and compilds into one file called `assets/app.css`.


##Run specs:

    grunt jasmine


##Release for PhoneGap

    grunt release phonegap

Release task lints, minifies and packages all JavaScript files listed in `files.js` file into one file called 
`assets/app.js`.

It also appends `cordova.js` (the PhoneGap source file) to head element of `index.html` and copies all files 
ready for PhoneGap into `iphone` and `android` folders.

