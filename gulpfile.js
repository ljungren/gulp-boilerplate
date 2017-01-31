var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  connect = require('gulp-connect'),
  jshint = require('gulp-jshint'),
  open = require('gulp-open'),
  cleanCSS = require('gulp-clean-css');

// Dev tasks

gulp.task('connect', function () {
  connect.server({
    name: 'gulp-test',
    root: ['public'],
    port: 9000,
    livereload: true
  });
});
 
gulp.task('sass', function () {
  return gulp.src(['./src/style/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/style'));
});
gulp.task('html', function () {
  gulp.src(['./src/*.html'])
    .pipe(gulp.dest('./public'));
});
gulp.task('js', function () {
  gulp.src(['./src/js/*.js'])
    .pipe(gulp.dest('./public/js'));
});
gulp.task('jshint', function() {
  gulp.src(['src/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('images', function () {
  gulp.src(['./src/images/*'])
    .pipe(gulp.dest('./public/images'));
});
gulp.task('open', function(){
  var options = {
    uri: 'http://localhost:9000'
  };
  gulp.src('./public/index.html')
  .pipe(open(options));
});
gulp.task('livereload', function() {
  gulp.src(['./src/**/*'])
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch('./src/style/*.scss', ['sass', 'livereload']);
  gulp.watch('./src/js/*.js', ['jshint', 'js', 'livereload']);
  gulp.watch('./src/*.html', ['html', 'livereload']);
  gulp.watch('./src/images/*', ['images', 'livereload']);
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
    .pipe(cleanCSS({compatibility: 'ie8'}))
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
  


gulp.task('default', ['jshint', 'sass', 'html', 'js', 'images', 'connect', 'watch', 'open']);
gulp.task('build', ['style:build', 'html:build', 'js:build', 'img:build']);