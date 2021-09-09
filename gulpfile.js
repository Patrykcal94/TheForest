const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const kit = require('gulp-kit');
const { reload } = require('browser-sync');
const browserSync = require('browser-sync').create();

const paths = {
    html: './html/**/*.kit',
    sass: './src/sass/**/*.scss',
    js: './src/js/**/*.js',
    minImg: './src/img/*',
    dist: './dist',
    sassDest: './dist/css',
    jsDest: './dist/js',
    imgDest: './dist/images'
}

function sassCompiler(done) {
    src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.sassDest));
    done();
}

function javascript(done) {
    src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.jsDest));
    done();
}

function converImages(done) {
    src(paths.minImg)
        .pipe(imagemin())
        .pipe(dest(paths.imgDest))
    done();
}

function handleKits(done) {
    src(paths.html)
        .pipe(kit())
        .pipe(dest('./'))
    done();
}

function cleanStuff(done) {
    src(paths.dist, {read: false})
        .pipe(clean())
    done();
}

function startBrowserSync(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    done();
}

function watchForChanges(done) {

    watch('./*html').on('change', browserSync.reload);
    watch([paths.html, paths.sass, paths.js], parallel(sassCompiler, handleKits, javascript)).on('change', browserSync.reload);
    watch(paths.minImg, converImages).on('change', browserSync.reload)
    done()
}

const mainFunctions = parallel(handleKits, sassCompiler, javascript, converImages)
exports.cleanStuff = cleanStuff
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)