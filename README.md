Talon - An Americaneagle.com Toolkit
==========

**Currently stable for Node v6.3.0**


##Installation/Setup

To install this package - first ensure you are running Node v6.3.0 on your machine. 

 1) Download the contents of the repository to your local machine
 
 2) Open up the folder from explorer and type 'cmd' to access the command prompt

 3) In the command prompt, type 'npm install' to get all necessary dependencies

Once completed, you can now choose how you want to run Gulp.

 1) Type 'gulp' to run the standard gulp task. This will compile all files on initial run and is a good task to run if you are just starting the project.

 2) Type 'gulp watch' if you do not want the files to compile initially, but want the gulp task to watch your files as you make updates. This is significantly quicker and good if you are picking a project back up.

 3) Type 'gulp templates' if you are going to be cutting HTML templates. This will run browsersync which will allow you to have a local environment with auto refresh of your HTML templates.


##Working with Talon

Setup is fairly simple, once gulp is running it will automatically look at your files in the src folder and push them to dist automatically. For the sass files, a full unminified copy of the css file will be put in src/css, and then minified and sent to dist/css. JS files will be compiled into a all.min.js file and all.js file within the dist/js folder.


##Features

 - CSS autoprefixing: no need for any vendor prefixes (last 6 browser versions)
 - Image optimizing: Any images placed into the images folder in src will be pushed to dist, and automatically optimized for web
 - JS ES6 support: Babel is applied and so you can use ES6 on your JS files 
 - Nunjucks templates: Using partials and includes, creating HTML templates is easier as we don't need to duplicate HTML files and can re-use components
 - Browsersync: Local environment for HTML templates, also allows for us to share a local template within the same network.
 - Notifications: If a file is successfully compiled, you will be alerted and presented the file size of the finished file. If it fails, you will be provided with specific errors with the compiling.
 - Minification and concatination: All files are automatically minified and compacted for your convenience.



##TODO
 - Include more accessibility features
 - Modulize JS
 - Better global styling
 - More Out of Box Flexbox Support
 - Add index to templating system

