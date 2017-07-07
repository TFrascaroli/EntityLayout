"use strict";

var gulp = require('gulp');

// Include Our Plugins

var browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tslint      = require("gulp-tslint"),
    ts          = require("gulp-typescript"),
    sourcemaps  = require("gulp-sourcemaps"),
    uglify      = require("gulp-uglify"),
    less        = require('gulp-less'),
    rename      = require('gulp-rename'),
    merge       = require('merge-stream'),
    cssmin      = require('gulp-cssmin'),
    dts 		= require('dts-bundle').bundle,
    util        = require('gulp-util');

var tsProject = ts.createProject("tsconfig.json");
var tsTestProject = ts.createProject("tsconfig.json");

gulp.task("build-app", function() {
    return gulp.src([
            "src/**/**.ts"
        ])
        .pipe(tsProject()).pipe(gulp.dest('./obj/'));
});

gulp.task('definitions', ['build-app'], function(done) {
    dts({
        name: 'entitylayout',
        baseDir: 'obj/',
        main: './obj/entitylayout.d.ts',
        out: '../dist/entitylayout.d.ts',
        externals: true,
        verbose: true
    });
    done();
});

// Lint Task
gulp.task("lint", function() {
    return gulp.src([
        "src/**/**.ts",
        "test/**/**.test.ts"
    ])
    .pipe(tslint({ }))
    .pipe(tslint({
        formatter: "verbose"
    }))
    .pipe(tslint.report())
});

gulp.task("bundle", ["build-app"], function() {

    var libraryName = "entitylayout";
    var mainTsFilePath = "obj/entitylayout.js";
    var outputFolder   = "dist/";
    var outputFileName = "entitylayout.js";
    var outputFileNameMin = "entitylayout.min.js";

    var bundler = browserify({
        debug: false,
        standalone : libraryName
    });
    var b2 = browserify({
        debug: false,
        standalone : libraryName
    });
    var s1 = b2.add(mainTsFilePath)
        .bundle()
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(gulp.dest(outputFolder));
    var s2 = bundler.add(mainTsFilePath)
        .bundle()
        .pipe(source(outputFileNameMin))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(outputFolder));
    return merge(s1, s2);
});


gulp.task('less', function () {
    return gulp.src('src/entitylayout.less')
        .pipe(less({ style: 'compressed' }).on('error', util.log))
        //.pipe(autoprefix('last 10 version'))
        .pipe(gulp.dest("./dist/"))
        .pipe(cssmin().on('error', util.log))
        .pipe(rename('entitylayout.min.css'))
        .pipe(gulp.dest("./dist/"));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch([ "src/**/**.ts"], ["lint", "bundle"]);
    gulp.watch('src/entitylayout.less', ['less']);
});

// Default Task
gulp.task('default', ["lint", "bundle", "definitions", "less"]);