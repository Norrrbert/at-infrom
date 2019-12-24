'use strict'
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      pug = require('gulp-pug'),
      browserSync = require('browser-sync').create();

gulp.task('sass', 
  function () {
    return gulp.src('./src/scss/**/style.scss')
          .pipe(sass({ outputStyle: "compressed" }))
          .pipe(gulp.dest('./src/css'))
          .pipe(browserSync.stream())
  }
);

gulp.task('autopref',
 function () {
  return gulp.src('./src/css/style.css')
        .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        }))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('pug',
  function () {
    return gulp.src('./src/pages/*.pug')
          .pipe(pug({
            pretty: true
          }))
          .pipe(gulp.dest('./src'))
          .pipe(browserSync.stream());
  }
)

gulp.task('js',
  function () {
    return gulp.src('./src/js/**/*.js')
          .pipe(browserSync.stream());
  }
);

gulp.task('serve', gulp.series('sass', 
  function () {
    browserSync.init({
      server: {
        baseDir: './src/'
      }
    })
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/pages/**/*.pug').on('change', gulp.series('pug'));
    gulp.watch('./src/*.html').on('change', browserSync.reload);
  }
));

gulp.task('default', gulp.parallel('js', 'serve','pug'));