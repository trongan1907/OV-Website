// Load all the modules from package.json
const { watch, series, src, dest } = require('gulp'),
    plumber = require('gulp-plumber'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    purgecss = require('gulp-purgecss'),
    purgecssWordpress = require('purgecss-with-wordpress');


// Default error handler
var onError = function (err) {
    console.log('An error occured:', err.message);
    this.emit('end');
};

// Concatenates all files that it finds in the manifest
// and creates two versions: normal and minified.
function scripts() {
    return src(['src/js/*.js', 'src/js/**/*.js'], {allowEmpty: true})
        .pipe(dest('js/'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('js/'));
}

// As with javascripts this task creates two files, the regular and
// the minified one. It automatically reloads browser as well.
function styles() {

    return src(['src/scss/*.scss', 'src/scss/*.css'], {allowEmpty: true})
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('css/'))
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('css/'));
}

function bootstrap() {
    return src(['css/bootstrap.css'], {allowEmpty: true})
        .pipe(plumber({errorHandler: onError}))
        .pipe(purgecss({
            content: [ '!node_modules', '!node_modules/**', './*.html', '../*.html', '../**/*.html', 'src/js/*.js', 'src/js/**/*.js'],
        }))
        .pipe(rename({suffix: '-prod'}))
        .pipe(dest('css/'))
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('css/'));
}


// Start the livereload server and watch files for change
function watchFiles() {
    // don't listen to whole js folder, it'll create an infinite loop
    watch(['src/js/*.js', 'src/js/**/*.js'], scripts);

    watch(['src/scss/*.scss', 'src/scss/*.css', 'src/scss/**/*.scss'], styles);

    watch(['src/scss/bootstrap.scss',], bootstrap);

}

exports.scripts = scripts;
exports.styles = styles;
exports.bootstrap = bootstrap;
exports.default = series(scripts, styles, bootstrap, watchFiles);