var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

var paths = [
    "bower_components/angular/angular.min.js",
    "bower_components/angular-ui-router/release/angular-ui-router.min.js",
    "bower_components/angularfire/dist/angularfire.min.js",
    'js/**/*'
];

gulp.task('scripts', function () {
    return gulp.src(paths)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('www/js/'));
});

gulp.task('watch', function () {
    gulp.watch('js/**/*', ['scripts']);
});
