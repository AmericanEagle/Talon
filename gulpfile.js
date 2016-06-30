


/*** Plugins ***/

// Base plugins
var gulp = require('gulp'),
	gutil = require('gulp-util');

// Helper plugins
var size = require('gulp-filesize'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber');

// SASS/CSS plugins
var sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer');

// JS plugins
var	concat = require('gulp-concat'),
    babel = require('gulp-babel'),
	uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

// Imagemin
var imagemin = require('gulp-imagemin');

// Browsersync
var browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;

// Nunjucks templating
var nunjucksRender = require('gulp-nunjucks-render');





/*** Configs ***/

// Error Handling
var onError = function (err) {
    this.emit('end');
};





/*** Tasks ***/

// SASS - Sourcemap and compile
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(plumber())
    	.pipe(sourcemaps.init())
        	.pipe(sass().on('error', sass.logError))
    	.pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(size()) 
});


// CSS - Autoprefix, minify, and rename
gulp.task('build-css', function() {
    return gulp.src('src/css/*.css')
        .pipe(plumber({ errorHandler: onError }))
		.pipe(autoprefixer({
			browsers: ['last 6 versions'],
			cascade: false
		}))
		.pipe(size())
        .pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({
      		message: "Successfully Compiled: <%= file.relative %> @ Date: <%= options.date %>",
      		templateOptions: {
        		date: new Date()
      		}
    	}))
        .pipe(reload({stream: true}));
});


// JS - Concatenate, babel, minify, and rename
gulp.task('scripts', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(concat('all.js'))
        .pipe(babel())
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: "Successfully Compiled: <%= file.relative %> @ Date: <%= options.date %>",
            templateOptions: {
                date: new Date()
            }
        }))
        .pipe(reload({stream: true}));
});


// Images - minification
gulp.task('images', function() {
	return gulp.src('src/images/*')
		.pipe(imagemin())
        .pipe(notify({
            message: "Successfully Optimized: <%= file.relative %> @ Date: <%= options.date %>",
            templateOptions: {
                date: new Date()
            }
        }))
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


// Browser Sync and Watch
gulp.task('serve', ['sass', 'build-css', 'scripts', 'images', 'nunjucks'], function() {
    
    browserSync.init({
        server: {
            baseDir:["./dist","./dist/templates"]
            //directory:true
        },
        files: "dist/css/styles.min.css"
    });

    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch("src/scss/globals/*.scss", ['sass']);
    gulp.watch("src/scss/vendor/*.scss", ['sass']);
    gulp.watch('src/css/*.css', ['build-css']);
    
    gulp.watch('src/js/*.js', ['scripts']);
    
    gulp.watch(["src/templates/**/*.html"], ['nunjucks']);
    gulp.watch(["src/templates/pages/*.html"], ['nunjucks']);
    gulp.watch("dist/**/*.html").on('change', reload);
});


// Default Task
gulp.task('default', ['serve']);


// Compile only Task (No browsersync)
gulp.task('compile', ['sass', 'build-css', 'scripts', 'images', 'nunjucks'], function(){
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/css/*.css', ['build-css']);
    gulp.watch('src/templates/*.html', ['nunjucks']);
});