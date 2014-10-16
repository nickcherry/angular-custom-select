/********************************************************************/
/* Imports */
/********************************************************************/

var Gulp = require('gulp');

var AutoPrefixer = require('gulp-autoprefixer');
var FS = require('fs-extra');
var Coffee = require('gulp-coffee');
var Concat = require('gulp-concat');
var FileInclude = require('gulp-file-include');
var If = require('gulp-if');
var MinifyCss = require('gulp-minify-css');
var MinifyHTML = require('gulp-minify-html');
var Plumber = require('gulp-plumber');
var SASS = require('gulp-ruby-sass');
var Uglify = require('gulp-uglify');
var Util = require('gulp-util');


/********************************************************************/
/* Paths */
/********************************************************************/

var paths = {};

paths.src = {
  dir: './src'
};

paths.build = {
  dir: './build'
};

paths.dist = {
  dir: './dist'
};

/* AWS Paths */
paths.aws = {
  src: paths.build.dir + '/**/*'
};

/* Dist Script Path */
paths.distScripts = {
  destFile: 'angular-custom-select.min.js'
  , destDir: paths.dist.dir
  , src: [ paths.src.dir + '/coffee/directives/custom-select.coffee' ]
};
paths.distScripts.watch = paths.distScripts.src;

/* Example Script Paths */
paths.exampleScripts = {
  destFile: 'example.js'
  , destDir: paths.build.dir + '/js'
  , src: [
    'bower_components/angular/angular.min.js'
    , 'bower_components/angular-ui-router/release/angular-ui-router.min.js'
    , paths.src.dir + '/coffee/**/*.coffee'
  ]
};
paths.exampleScripts.watch = paths.exampleScripts.src;

/* Style Paths */
paths.styles = {
  destDir: paths.build.dir + '/css'
  , src: paths.src.dir + '/scss/example.scss'
  , watch: paths.src.dir + '/scss/**/*'
};

/* View/Template Paths */
paths.views = {
  src: [
    paths.src.dir + '/example.html'
  ]
  , basepath: paths.src.dir + '/'
  , dest: paths.build.dir
};
paths.views.watch = paths.views.src;


/********************************************************************/
/* Gulp Tasks */
/********************************************************************/

/* Clean Build Directory */
Gulp.task('clean-build', function() {
  if (FS.existsSync(paths.build.dir))
    FS.removeSync(paths.build.dir);
});

/* Clean Dist Directory */
Gulp.task('clean-dist', function() {
  if (FS.existsSync(paths.dist.dir))
    FS.removeSync(paths.dist.dir);
});

/* Compile SCSS */
Gulp.task('sass', function () {
  return Gulp.src(paths.styles.src)
    .pipe(Plumber())
    .pipe(SASS())
    .pipe(AutoPrefixer())
    .pipe(MinifyCss())
    .pipe(Gulp.dest(paths.styles.destDir));
});

/* Compile, Uglify, and Concatenate all Coffeescript/Javascript for Distribution */
Gulp.task('distScripts', function() {
  return Gulp.src(paths.distScripts.src)
    .pipe(Plumber())
    .pipe(If(/[.]coffee$/, Coffee()))
    .pipe(Concat(paths.distScripts.destFile))
    .pipe(Uglify({ mangle: false, ascii_only: true }))
    .pipe(Gulp.dest(paths.distScripts.destDir));
});

/* Compile, Uglify, and Concatenate all Coffeescript/Javascript for Examples */
Gulp.task('exampleScripts', function() {
  return Gulp.src(paths.exampleScripts.src)
    .pipe(Plumber())
    .pipe(If(/[.]coffee$/, Coffee()))
    .pipe(Concat(paths.exampleScripts.destFile))
    // .pipe(Uglify({ mangle: false, ascii_only: true }))
    .pipe(Gulp.dest(paths.exampleScripts.destDir));
});

/* Copy Views/Templates for Examples */
Gulp.task('views', function() {
  return Gulp.src(paths.views.src, { base: './src' })
    .pipe(Plumber())
    .pipe(FileInclude({
      basepath: paths.views.basepath
    }))
    .pipe(MinifyHTML({ empty:true, conditionals: true, comments: true, spare: true }))
    .pipe(Gulp.dest(paths.views.dest))
});

/* Watch for Changes */
Gulp.task('watch', function () {
  Gulp.watch(paths.distScripts.watch, ['distScripts'])
  Gulp.watch(paths.exampleScripts.watch, ['exampleScripts']);
  Gulp.watch(paths.styles.watch, ['sass']);
  Gulp.watch(paths.views.watch, ['views']);
});


Gulp.task('default', ['clean-build', 'build', 'watch']);
Gulp.task('build', ['exampleScripts', 'sass', 'views']);
Gulp.task('dist', ['clean-dist', 'distScripts']);

