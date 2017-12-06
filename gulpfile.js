// require(d) gulp for compatibility with sublime-gulp.
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'web';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, callback);
});

gulp.task('sass', function () {
  return gulp.src('./web/styles/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./web/styles/css'));
});

gulp.task('default', ['sass', 'generate-service-worker']);
