var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

gulp.task('minifyjs', function () {
  gulp.src('js/**/*.js')
  .pipe(concat('app.min.js'))
  .pipe(uglify().on('error', function(e){
    console.log(e);
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch('js/*.js', ['minifyjs']);
});

gulp.task('default', ['minifyjs', 'serve', 'watch']);
