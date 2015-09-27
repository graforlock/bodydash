
var gulp =  require('gulp');

var notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');


var files= {};

files.js = {
	dist: 'dist/',
	src: 'src/*.js'

}

files.notify = {
    js: {
        errorHandler: notify.onError('SCRIPTS: BUILD FAILED!\n' +
        'Error:\n<%= error.message %>')
    }

}

gulp.task('js-min', ['js'],function() {
  return gulp.src(files.js.src)
  .pipe(concat('lib.min.js'))
  .pipe(uglify())
  .pipe(plumber(files.notify.js))
  .pipe(gulp.dest(files.js.dist));
});


gulp.task('js', function() {
  return gulp.src(files.js.src)
  .pipe(concat('lib.js'))
  .pipe(plumber(files.notify.js))
  .pipe(gulp.dest(files.js.dist));
});



gulp.task('default',['js']);