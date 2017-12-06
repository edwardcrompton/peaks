// require(d) gulp for compatibility with sublime-gulp.
var gulp = require('gulp');

gulp.task('default', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'web';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, callback);
});
