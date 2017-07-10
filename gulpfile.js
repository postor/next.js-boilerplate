const jshint = require('gulp-jshint');
const gulp = require('gulp');

gulp.task('lint-es6', function () {
  return gulp.src([
    './**/*.js',
    '!node_modules/**/*.js',
    '!.next/**/*.js',
    '!server.js',
    '!tools/routes.js',
  ])
    .pipe(jshint({
      "esversion": 6,
      "asi": true,
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-node', function () {
  return gulp.src([
    'server.js',
    'tools/routes.js',
    'tools/api-route/index.js',
  ])
    .pipe(jshint({
      "esversion": 6,
      "asi": true,
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint-es6', 'lint-node'])