"use strict";

/* File: gulpfile.js */
// grab our gulp packages
var gulp = require('gulp'),
    // gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    clean = require('gulp-clean'),
    // require the module as normal
    bs = require("browser-sync").create(),
    del = require('del');



// create a gutil task and just log a message
// gulp.task('gutil', function() {
//     return gutil.log('Gulp is running!')
// });

gulp.task('jshint', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('clean', function() {
    return del('dist');
    // return gulp.src('dist', {read: false})
    //  .pipe(clean());
});

//gulp sass
gulp.task('sass', function() {

    return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'));
});

// copy all fonts to dist folder

gulp.task('copyfonts', function() {
    gulp.src('app/bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src('app/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('copyfonts', 'build', 'imagemin', 'watch');
});

//build
gulp.task('build', ['sass', 'jshint'], function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});


// Images
gulp.task('imagemin', function() {
    return del(['dist/images']), gulp.src('app/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'));

});
//watch task
gulp.task('watch', ['serve'], function() {
    gulp.watch('{app/scss/app.scss,app/scripts/**/*.js,app/**/*.html}', ['build']);
    // Watch image files
    gulp.watch('app/images/**/*', ['imagemin']);
});

//browesr-sync task
gulp.task('serve', ['default'], function() {
    var files = [
        'app/**/*.html',
        'app/css/**/*.css',
        'app/images/**/*',
        'app/scripts/**/*.js',
        'dist/**/*'
    ];

    bs.init(files, {
        server: {
            baseDir: "dist",
            index: "index.html"
        }
    });
    // Watch any files in dist/, reload on change
    bs.watch(['dist/**']).on('change', bs.reload);
});
