var gulp                    = require('gulp');
var cnf                     = require('../package.json').config;
var plumber                 = require('gulp-plumber');
var notify                  = require('gulp-notify');
var sourcemaps              = require('gulp-sourcemaps');
var sass                    = require('gulp-sass');
var autoprefixer            = require('gulp-autoprefixer');
var cssnano                 = require('gulp-cssnano');
var rename                  = require('gulp-rename');

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss') 
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
}))
    .pipe(cssnano())
    .pipe(rename({
        dirname: "",
        basename: "main",
        prefix: "",
        suffix: ".min",
        extname: ".css"
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cnf.dist.css));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});