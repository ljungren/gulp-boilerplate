var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

// Dev tasks

gulp.task('connect', function () {
  connect.server({
    name: 'gulp-test',
    root: ['dev'],
    port: 9000,
    livereload: true
  });
});
 
gulp.task('sass', function () {
  return gulp.src(['./app/style/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dev/style'))
    .pipe(connect.reload());
});
gulp.task('html', function () {
  gulp.src(['./app/*.html'])
    .pipe(gulp.dest('./dev'))
    .pipe(connect.reload());
});
gulp.task('js', function () {
  gulp.src(['./app/js/*.js'])
    .pipe(gulp.dest('./dev/js'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch('./app/style/*.scss', ['sass']);
  gulp.watch('./app/js/*.js', ['js']);
  gulp.watch('./app/*.html', ['html']);
});

// Build tasks

gulp.task('build', function(){
  gulp.src('./app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
  gulp.src('./app/js/*.')
    .pipe(sass().on('error', sass.logError))
    .pipe(uglify())
    .pipe(gulp.dest('./build/style'));
  gulp.src(['./app/*.html'])
    .pipe(gulp.dest('./build'))
});


gulp.task('default', ['sass', 'html', 'js', 'connect', 'watch']);