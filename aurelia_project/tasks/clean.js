let gulp = require('gulp');
let rimraf = require('rimraf');
let del = require('del');
import project from '../aurelia.json';

// export default function clean(cb) {
//   rimraf(project.platform.output + '/app-bundle.js', cb);
//   rimraf(project.dist.output,cb);
// }
//
export default function clean(done) {
  console.log("Clean all files in build folder");
  del([project.dist.output +'/**/*', project.platform.output + '/app-bundle.*' ], done());
 // return gulp.src(project.dist.output + "/*", {read: false}).pipe(clean());
}
