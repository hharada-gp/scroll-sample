'use strict';
var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('default', function() {
  browserSync({
    notify: false,
    port: 3000,
    files: ["./public/**/*"],
    server: {
      baseDir: ['./public/']
    }
  });
  gulp.watch(['./src/scss/*.scss', './src/scss/**/_*.scss'], ['sass']);
  gulp.watch(['./src/coffee/*.coffee', './src/coffee/**/_*.coffee'], ['coffee']);
  gulp.watch(['./src/jade/*.jade', './src/jade/**/_*.jade'], ['jade']);
});


gulp.task('sass', function() {
  gulp.src(['./src/scss/*.scss', './src/scss/**/_*.scss'])
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.cssmin())
    .pipe(gulp.dest('./public/css/'))
    .on('end', reload);
});

gulp.task('coffee', function() {
  gulp.src(['./src/coffee/*.coffee', './src/coffee/**/_*.coffee'])
    .pipe($.plumber())
    .pipe($.coffee({
      bare: true
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('jade', function(){
  gulp.src(['./src/jade/*.jade', './src/coffee/**/_*.jade'])
  .pipe($.plumber())
  .pipe($.jade())
  .pipe(gulp.dest('./public/'));
});