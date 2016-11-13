var gulp = require('gulp');
var order = require("gulp-order");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

gulp.task('minify', function() {
    gulp.src('./js/**/*.js')
        .pipe(order([
                'js/libs/jquery.min.js',
                'js/libs/materialize.min.js',
                'js/libs/angular.min.js',
                'js/libs/firebase.js',
                'js/init.js',
                'js/libs/angularfire.min.js',
                'js/app.js'
            ], { base: './' }))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('serve', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch('js/*.js', ['minifyjs']);
});

gulp.task('default', ['minify', 'serve', 'watch']);
