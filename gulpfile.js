// Load plugins
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

// paths
const paths = {
  srcHTML: 'src/**/*.html',
  srcSCSS: 'src/**/*.scss',

  dist: 'dist/',
};

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './' + paths.dist
    },
    port: 3000
  });
}

// HTML task
function html() {
  return gulp
    .src(paths.srcHTML)
    .pipe(gulp.dest(paths.dist))
    .pipe(browsersync.stream());
}

// CSS task
function css() {
  return gulp
    .src(paths.srcSCSS)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.dist))
    .pipe(browsersync.stream());
}

// Clean assets
function clean() {
  return del([paths.dist]);
}

// Watch files
function watchFiles() {
  gulp.watch(paths.srcHTML, html);
  gulp.watch(paths.srcSCSS, css);
}

// define complex tasks
const build = gulp.series(clean, gulp.parallel(css, html));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.build = build;
exports.watch = watch;