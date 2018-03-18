const gulp = require('gulp')
const eslint = require('gulp-eslint')
const { exec, execSync, fork } = require('child_process')

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

gulp.task('test', function () {
  return new Promise((resolve, reject) => {
    exec('npm run build', { maxBuffer: 1024 * 1024 }, (err) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      var env = Object.create(process.env)
      env.NODE_ENV = 'production'
      const server = fork('./server.js', { env, maxBuffer: 1024 * 1024 })
      server.on('message', (m) => {
        if (m === 'http ready') {
          execSync('npm run jest', { maxBuffer: 1024 * 1024, stdio: [0, 1, 2] })
          server.kill()
          resolve()
        }
      })
    })
  })
});