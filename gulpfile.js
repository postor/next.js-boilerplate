const gulp = require('gulp')
const eslint = require('gulp-eslint')

gulp.task('lint-es6', function () {
  return gulp.src([
    './**/*.js',
    '!node_modules/**/*.js',
    '!.next/**/*.js',
    '!server.js',
    '!tools/routes.js',
    '!gulpfile.js',
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('lint-node', function () {
  return gulp.src([
    'server.js',
    'tools/routes.js',
    'tools/api-route/index.js',
  ])
    .pipe(eslint({
      "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
      },
      "extends": "eslint:recommended"
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('default', [
  'lint-es6', 
  'lint-node'
])