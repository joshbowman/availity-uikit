// https://gist.github.com/bevacqua/8492639

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var bower = require('../../bower.json');
var gh_pages = require('gulp-gh-pages');

gulp.task('publish', ['publish:npm', 'publish:bower']);

gulp.task('publish:npm', function(done) {
  spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('publish:bower', function(done) {
  spawn('bower', ['register', bower.name, bower.repository], { stdio: 'inherit' }).on('close', done);
});

gulp.task('publish:ghpages', ['build:ghpages'], function () {
  var options = {};
  options.cacheDir = 'tmp/gh-pages'; //Check gulp-gh-pages to see if they have fixed the issue with tmp directory
  return gulp.src('./build/guide/**/*')
         .pipe(gh_pages(options));
});