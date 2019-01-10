// require(d) gulp for compatibility with sublime-gulp.
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'web';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    staticFileGlobs: [
      rootDir + '/index.html',
      rootDir + '/js/*.js',
      rootDir + '/styles/css/*.css',
      rootDir + '/js/geodesy/latlon-spherical.js',
    ],
    stripPrefix: rootDir,
    maximumFileSizeToCacheInBytes: 3145728
  }, callback);
});

gulp.task('sass', function () {
  return gulp.src('./web/styles/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./web/styles/css'));
});

gulp.task('default', ['sass', 'generate-service-worker']);