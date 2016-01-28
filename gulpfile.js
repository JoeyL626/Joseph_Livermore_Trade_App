var gulp = require('gulp')
var ngAnnotate = require('gulp-ng-annotate')
var nodemon = require('gulp-nodemon')

gulp.task('server', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['ng*', 'gulp*', 'public*']
  })
})

gulp.task('js:build', function () {
  return gulp.src(['./ng/**/module.js', 'ng/**/*.js'])
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./public/js'))
})

gulp.task('sass:build', function () {
  return gulp.src(['public/bower/foundation/scss','./scss/**/*.scss'])
    .pipe(gulp.dest('./public/css'))
})

gulp.task('html:move', function () {
  return gulp.src(['./templates/**/*.html'])
    .pipe(gulp.dest('./public/views'))
})

gulp.task('default', ['js:build', 'html:move','server'], function () {
  gulp.watch('./ng/**/*.js', ['js:build'])
  gulp.watch('./templates/**/*.html', ['html:move'])
})
