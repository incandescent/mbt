mbt
===

# Mobile Build Tool

The tool is a set of libraries and tasks to help you install, configure, build, and maintain your mobile project based on Backbone.js and jQuery Mobile.
The project is based on wonderful library called [grunt](https://github.com/cowboy/grunt).

TODO: describe it better

##Install:

    npm install -g mbt


##Generate new project:

    mkdir PROJECT_FOLDER
    cd PROJECT_FOLDER
    mbt init:project
    npm install ./


## Generated project's folder structure

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
* templates - project templates compiled into `js/templates/templates.js`
* views - jQuery Mobile pages appended into body element in `index.html`
* index.html


##Watch for changes in templates, views and styles:

    grunt watch

Templates will be compiled into one JavaScript file called `templates.js`.

Views will be minified and appended to body element in `index.html`.

CSS files will be minified and compilds into one file called `assets/app.css`.


##Run specs:

    grunt jasmine


##Release for PhoneGap

    grunt release

Release task lints, minifies and packages all JavaScript files listed in `files.js` file into one file:
`assets/app.js`.

It ppends `cordova.js` (the PhoneGap source file) to files list before minifaction. 
In addition to source minification it copies `app.css` and `app.js` from `assets` into `iphone` and `android` folders.

##License:
<pre>
(The MIT License)

Copyright (c) 2012 Incandescent Software

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre>
