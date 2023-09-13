//PATH
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

//GULP & LIVE RELOADING
import gulp from 'gulp';
import livereload from 'gulp-connect';
const { src, dest, parallel, watch } = gulp;

//HTML ================================================================

const htmlInitial = () => {
    return src(`${__dirname}/src/index.html`)
        .pipe(dest(`${__dirname}/app/`))
        .pipe(livereload.reload())
    ;
};

const htmlRemaining = () => {
    return src(`${__dirname}/src/html/*.html`)
        .pipe(dest(`${__dirname}/app/html/`))
        .pipe(livereload.reload())
    ;
};

//SASS ================================================================
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

const scss = () => {
    return src(`${__dirname}/src/sass/*.scss`)
        .pipe(sass())
        .pipe(dest(`${__dirname}/app/css/`))
        .pipe(livereload.reload())
    ;
};

// TYPESCRIPT
import webpackConfig from './webpack.config.js';
import webpack from 'webpack-stream';

const typescript = () => {
    return src(`${__dirname}/src/ts/*.ts`)
        .pipe(webpack(webpackConfig))
        .pipe(dest(`${__dirname}/app/js/`))
        .pipe(livereload.reload())
    ;
};

//SERVER & EXECUTION ==================================================
const startDevServer = () => {
    livereload.server({
        port: 8080,
        base: 'http://localhost',
        root: `${__dirname}/app/`,
        livereload: true
    });
};

const watchFiles = () => {
    //html
    watch(`${__dirname}/src/index.html`, htmlInitial);
    watch(`${__dirname}/src/html/`, htmlRemaining);

    //sass
    watch(`${__dirname}/src/sass/`, scss);

    //typescript
    watch(`${__dirname}/src/ts/`, typescript);
};

const develop = parallel(watchFiles, startDevServer);
const build = null;

export default develop;