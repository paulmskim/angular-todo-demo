import gulp from 'gulp';
import del from 'del';
import karma from 'karma';
import runSequence from 'run-sequence';

const SRC_JS_FILES = 'src/js/**/*.js';
const KARMA_CONF_FILE = __dirname + '/karma.conf.js';

gulp.task('default', () => {
  // do nothing
});

gulp.task('coverage:clean', () => {
  del(['coverage']);
});

gulp.task('unit-test', (done) => (
  new karma.Server({
    configFile: KARMA_CONF_FILE,
  }, (exitCode) => {
    done();
    process.exit(exitCode);
  }).start()
));

gulp.task('unit-test:coverage', (done) => {
  runSequence(
    'coverage:clean',
    'unit-test',
    done,
  );
});
