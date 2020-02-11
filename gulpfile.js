const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
var browserSync = require('browser-sync');

function reload() {
  browserSync.reload();
}

gulp.task('styles', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('clean', () => {
  return del([
    './public/css/main.css',
  ]);
});

gulp.task('scss', gulp.series(['clean', 'styles']));

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: '/index.html'
    },
    // port:
  });
});

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: '/index.html'
    },
  });
  gulp.watch('./src/scss/**/*.scss', (done) => {
    gulp.series(['clean', 'styles'])(done);
  });
  gulp.watch("./*.html").on('change', reload);
  gulp.watch("./src/scss/**/*.scss").on('change', reload);
  });