/* ================================================================
   Plugins
   ================================================================ */

// Base plugins
const gulp = require('gulp'),
      gutil = require('gulp-util');

// Helper plugins
const gsize = require('gulp-size'),
      rename = require('gulp-rename'),
      notify = require("gulp-notify"),
      plumber = require('gulp-plumber'),
      sourcemaps = require('gulp-sourcemaps');

// SASS/CSS plugins
const sass = require('gulp-sass'),
      cssmin = require('gulp-cssmin'),
      autoprefixer = require('gulp-autoprefixer');

// JS plugins
const concat = require('gulp-concat'),
      babel = require('gulp-babel'),
      jshint = require('gulp-jshint'),
      uglify = require('gulp-uglify');

// Imagemin
const imagemin = require('gulp-imagemin');

// Browsersync
const browserSync = require('browser-sync').create(),
      reload = browserSync.reload;

// Nunjucks templating
const nunjucksRender = require('gulp-nunjucks-render');





/* ================================================================
   Configs and Variables
   ================================================================ */

// Error Handling
var onError = function (err) {
    this.emit('end');
};

// Success Message
// Date Variable
var date = new Date(),
    notifyGeneric = {
    title: function () {
          return '<%= file.relative %> - ' + this.s.prettySize;
      },
      onLast: true,
      subtitle: "Successfully Compiled",
      message: "Successfully Compiled @ <%= options.hour %>:<%= options.minute %>:<%= options.second %> ",
      templateOptions: {
          hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()
      }, s: {}
    };

 



/* ================================================================
   Base Tasks
   ================================================================ */

// SASS - Sourcemap and compile
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', notify.onError("Error: <%= error.message %>")))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
});


// Main CSS - Autoprefix, minify, and rename
gulp.task('build-css', function() {
    notifyGeneric.s = gsize();
    return gulp.src('src/css/main.css')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(notifyGeneric.s)
        .pipe(notify(notifyGeneric))
        .pipe(reload({stream: true}));
});


// JS - Concatenate, babel, minify, and rename
gulp.task('scripts', function() {
    notifyGeneric.s = gsize();
    return gulp.src(['src/js/plugins.js', 'src/js/functions.js'])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(concat('all.js'))
        .pipe(babel({ compact:false }))
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notifyGeneric.s)
        .pipe(notify(notifyGeneric))
        .pipe(reload({stream: true}));
});


// Images - minification
gulp.task('images', function() {
    notifyGeneric.s = gsize();
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(notifyGeneric.s)
        .pipe(notify(notifyGeneric))
        .pipe(gulp.dest('dist/images'))
});


// HTML - Templating
gulp.task('nunjucks', function() {
  return gulp.src('src/templates/**/*.html')
    .pipe(nunjucksRender({
        path: ['src/templates']
    }))
    .pipe(gulp.dest('dist/templates'))
    .pipe(reload({stream: true}));
});





/* ================================================================
   Run Tasks
   ================================================================ */


// Base Watch Function
var mainWatch = function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/css/main.css', ['build-css']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch(["src/templates/**/*.html"], ['nunjucks']);
    gulp.watch(["src/templates/pages/*.html"], ['nunjucks']);
};


// Browser Sync and Watch
gulp.task('templates', ['sass', 'build-css', 'scripts', 'images', 'nunjucks'], function() {
    browserSync.init({
        server: {
            baseDir:["./dist","./dist/templates"]
            //directory:true
        },
        files: "dist/css/main.min.css"
    });

    mainWatch();

    gulp.watch("dist/**/*.html").on('change', reload);
}); 


// Compile only Task (No browsersync)
gulp.task('default', ['sass', 'build-css', 'scripts', 'images', 'nunjucks'], function(){
    mainWatch();
});


// Watch only Task (No browsersync or initial build)
gulp.task('watch', function(){
    mainWatch();
});