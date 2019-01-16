/// <binding BeforeBuild='copy-node_modules, copy-api-data' />
//var gulp = require('gulp');
//    cache = require('gulp-cached'); //If cached version identical to current file then it doesn't pass it downstream so this file won't be copied 

//var paths = {
//    webroot: "./wwwroot/"
//};

////paths.js = paths.webroot + "js/**/*.js";
////paths.minJs = paths.webroot + "node_modules/**/*.min.js";
//paths.css = paths.webroot + "node_modules/**/*.css";
//paths.minCss = paths.webroot + "node_modules/**/*.min.css";
////paths.concatJsDest = paths.webroot + "js/site.min.js";
////paths.concatCssDest = paths.webroot + "css/site.min.css";

//gulp.task('default', 'copy-node_modules');

//gulp.task('copy-node_modules', function () {

//    try {

//        gulp.src('node_modules/**/*.css')
//            .pipe(gulp.dest('wwwroot/dist/node_modules'));
//    }
//    catch (e) {
//        return -1;
//    }
//    return 0;
//});


/// <binding Clean='clean' />
"use strict";

const gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

const paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "node_modules/**/*.js";
paths.minJs = paths.webroot + "node_modules/**/*.min.js";
paths.css = paths.webroot + "node_modules/**/*.css";
paths.minCss = paths.webroot + "node_modules/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";


//gulp.task("min:js", () => {
//    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
//        .pipe(concat(paths.concatJsDest))
//        .pipe(uglify())
//        .pipe(gulp.dest("."));
//});

gulp.task("min:css", () => {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task('copy-node_modules', function () {

    try {

        gulp.src('node_modules/**/*.css')
            .pipe(gulp.dest('wwwroot/dist/node_modules'));
    }
    catch (e) {
        return -1;
    }
    return 0;
});


gulp.task('copy-api-data', function () {

    try {

        gulp.src('ClientApp/app/components/api/products/*.json')
            .pipe(gulp.dest('wwwroot/api/products'));
    }
    catch (e) {
        return -1;
    }
    return 0;
});

// A 'default' task is required by Gulp v4
//gulp.task("default", gulp.series(["min"]));