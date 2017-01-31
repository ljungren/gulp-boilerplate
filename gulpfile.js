var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  connect = require('gulp-connect'),
  jshint = require('gulp-jshint'),
  open = require('gulp-open');

// Dev tasks

gulp.task('connect', function () {
  connect.server({
    name: 'gulp-test',
    root: ['public'],
    port: 8000,
    livereload: true
  });
});
 
gulp.task('sass', function () {
  return gulp.src(['./src/style/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/style'))
    .pipe(connect.reload());
});
gulp.task('html', function () {
  gulp.src(['./src/*.html'])
    .pipe(gulp.dest('./public'))
    .pipe(connect.reload());
});
gulp.task('js', function () {
  gulp.src(['./src/js/*.js'])
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());
});
gulp.task('jshint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('images', function () {
  gulp.src(['./src/images/*'])
    .pipe(gulp.dest('./public/images'))
    .pipe(connect.reload());
});
gulp.task('open', function(){
  gulp.src('./index.html')
  .pipe(open());
});
gulp.task('watch', function(){
  gulp.watch('./src/style/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['jshint', 'js']);
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/images/*', ['images']);
});

// Build tasks

gulp.task('js:build', function(){
  gulp.src(['./src/js/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});
gulp.task('style:build', function(){
  gulp.src(['./src/style/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/style'));
});
gulp.task('html:build', function(){
  gulp.src(['./src/*.html'])
    .pipe(gulp.dest('./dist'))
});
gulp.task('img:build', function () {
  gulp.src(['./src/images/*'])
    .pipe(gulp.dest('./dist/images'));
});
  


gulp.task('default', ['jshint', 'sass', 'html', 'js', 'images', 'connect', 'watch']);
gulp.task('build', ['style:build', 'html:build', 'js:build', 'img:build']);