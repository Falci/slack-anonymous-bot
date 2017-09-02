const gulp = require('gulp'),
  log = require('easy-log'),
  ts = require('gulp-typescript'),
  nodemon = require('gulp-nodemon'),
  runSequence = require('run-sequence');

gulp.task('default', ['watch']);

gulp.task('watch', () => {
  return runSequence('build', 'nodemon', () => {
    return gulp.watch('./src/**', ['build']);
  });
});

gulp.task('build', ['static'], () => {
  const tsProject = ts.createProject('./tsconfig.json');

  return gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('dist'));
});

gulp.task('static', () => {
  return gulp.src(['src/public/**'])
    .pipe(gulp.dest('dist/public'));
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'bin/www',
    ext: 'js',
    env: {
      PORT: 3000
    }
  })
  .on('restart', () => {
    process.stdout.write('\033c');
    log.off('Restarting...');
  });
});
