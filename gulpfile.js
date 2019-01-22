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
      rootDir + '/manifest.json',
      rootDir + '/js/*.js',
      rootDir + '/images/icon-192.png',
      rootDir + '/css/*.css',
      rootDir + '/js/geodesy/latlon-spherical.js',
    ],
    stripPrefix: rootDir,
    maximumFileSizeToCacheInBytes: 3145728
  }, callback);
});

gulp.task('sass', function () {
  return gulp.src('./styles/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./web/css'));
});

gulp.task('default', ['sass', 'generate-service-worker']);
